import {RequestOptions} from 'node:http'

import {AuthMeta} from '@@types/services/flow/llm'
import {SampleMode} from '@@types/utils/reward'
import {FLOW_BASE_URL} from '@env'
import BaseService from '@services/base'
import LlmService from '@services/flow/llm'
import express from '@utils/express'
import reward from '@utils/reward'
import colors from 'ansi-colors'
import {Request} from 'express'
import proxy, {ProxyOptions} from 'express-http-proxy'
import getPort from 'get-port'
import lodash from 'lodash'
import moment from 'moment'
import {table} from 'table'

export default class ProxyService extends BaseService {
  protected llmService = new LlmService({jsonEnabled: this.jsonEnabled})

  public async start(mode: SampleMode = 'balance'): Promise<void> {
    const app = express.createApp()

    const authMetas = await this.llmService.listAuthMeta()

    if (lodash.isEmpty(authMetas)) {
      throw this.logger.error('No LLM auth meta found. Please configure LLM auth meta first.', {exit: 1})
    }

    if (!FLOW_BASE_URL) {
      throw this.logger.error('FLOW_BASE_URL is not set. Please set it in the environment variables.', {exit: 1})
    }

    app.use(
      '/v1/foundry',
      proxy(FLOW_BASE_URL, {
        proxyReqOptDecorator: this.proxyReqOptDecorator(authMetas, 'Azure Foundry', mode),
        proxyReqPathResolver: (req) => {
          const {operation} = this.parseAzureFoundryUrl(req.url)
          const newUrl = `/ai-orchestration-api/v1/foundry/${operation}`
          return newUrl
        },
      }),
    )

    app.use(
      '/v1/openai',
      proxy(FLOW_BASE_URL, {
        proxyReqOptDecorator: this.proxyReqOptDecorator(authMetas, 'OpenAI', mode),
        proxyReqPathResolver: (req) => {
          const {operation} = this.parseOpenaiUrl(req.url)
          const newUrl = `/ai-orchestration-api/v1/openai/${operation}`
          return newUrl
        },
      }),
    )

    // google genai
    app.use(
      '/v1/google',
      proxy(FLOW_BASE_URL, {
        proxyReqBodyDecorator: (reqBody, srcReq) => {
          const {model} = this.parseGoogleapisUrl(srcReq.url)

          reqBody.allowedModels = reqBody.allowedModels || [model]
          reqBody.model = reqBody.model || model

          return reqBody
        },
        proxyReqOptDecorator: this.proxyReqOptDecorator(authMetas, 'Google GenAI', mode),
        proxyReqPathResolver: (req) => {
          const {operation} = this.parseGoogleapisUrl(req.url)
          const newUrl = `/ai-orchestration-api/v1/google/${operation}`
          return newUrl
        },
      }),
    )

    const port = await getPort({port: 4399})

    app.listen(port, () => {
      this.logger.info('Proxy server is running on port ' + colors.cyan(String(port)))
      this.logger.info('')
      this.logger.info('You can access the LLM proxy at:')
      this.logger.info(
        table([
          ['LLM Vendor', 'API Base URL', 'API Key'],
          ['OpenAI', colors.cyan(`http://localhost:${port}/v1/openai`), 'please-ignore'],
          ['Google AI', colors.cyan(`http://localhost:${port}/v1/google`), 'please-ignore'],
          ['Azure Foundry', colors.cyan(`http://localhost:${port}/v1/foundry`), 'please-ignore'],
        ]),
      )
    })
  }

  public async stop(): Promise<void> {
    throw this.logger.error('LLM proxy is not implemented yet.', {exit: 1})
  }

  protected parseAzureFoundryUrl(url: string): {operation: string; version: string} {
    // v1/openai/deployments/{deployment-name}/chat/completions
    // eslint-disable-next-line unicorn/no-unreadable-array-destructuring
    const [version, , , ...operation] = lodash.trim(url, '/').split('/')
    return {operation: operation.join('/') || '', version: version || 'v1'}
  }

  protected parseGoogleapisUrl(url: string): {model: string; operation: string; version: string} {
    // v1beta/models/{model}:streamGenerateContent
    const [version, , ...rest] = lodash.trim(url, '/').split('/')
    const [model, ...operation] = rest.join('/').split(':')
    return {model, operation: operation.join(':') || '', version: version || 'v1beta'}
  }

  protected parseOpenaiUrl(url: string): {operation: string; version: string} {
    // v1/chat/completions
    const [version, ...operation] = lodash.trim(url, '/').split('/')
    return {operation: operation.join('/') || '', version: version || 'v1'}
  }

  protected proxyReqOptDecorator(
    authMetas: AuthMeta[],
    llmVendor: string,
    sampleMode: SampleMode,
  ): ProxyOptions['proxyReqOptDecorator'] {
    return async (proxyReqOpts: RequestOptions, _srcReq: Request) => {
      const clientId = await reward.sample(sampleMode, 'googleapis', lodash.map(authMetas, 'clientId'))
      const authMeta = lodash.find(authMetas, {clientId})!
      const token = await this.llmService.getAuthToken(clientId)

      const profile = [
        '<',
        'name=' + colors.cyan(authMeta.name),
        ', ',
        'tenant=' + colors.cyan(authMeta.tenant),
        ', ',
        'agent=' + colors.cyan(authMeta.agent),
        ', ',
        'clientId=' + colors.cyan(authMeta.clientId.slice(0, 8) + '...'),
        '>',
      ].join('')

      this.logger.info(
        `[${colors.yellow(moment().format('YYYY-MM-DD HH:mm:ss'))}] Using ${llmVendor} with profile:\n${profile}`,
      )

      proxyReqOpts.headers = lodash.merge({}, proxyReqOpts.headers, {
        Authorization: `Bearer ${token}`,
        cookie: 'FlowToken=' + token,
        FlowAgent: authMeta.agent,
        FlowTenant: authMeta.tenant,
      })

      return proxyReqOpts
    }
  }
}
