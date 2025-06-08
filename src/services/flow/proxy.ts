import {FlowError} from '@@types/services/flow/proxy'
import {SampleMode} from '@@types/utils/reward'
import {FLOW_BASE_URL} from '@env'
import BaseService from '@services/base'
import LlmService from '@services/flow/llm'
import express from '@utils/express'
import reward from '@utils/reward'
import colors from 'ansi-colors'
import proxy from 'express-http-proxy'
import getPort from 'get-port'
import JSON from 'json5'
import lodash from 'lodash'
import moment from 'moment'
import {table} from 'table'

export default class ProxyService extends BaseService {
  protected llmService = new LlmService({jsonEnabled: this.jsonEnabled})

  public async start(mode: SampleMode = 'balance'): Promise<void> {
    const app = express.createApp()

    const authMetas = await this.llmService.listAuthMeta()

    // google genai
    app.use(
      '/v1/google',
      proxy(FLOW_BASE_URL!, {
        proxyErrorHandler(err, res, next) {
          // reward.demote('google genai', lodash.map(authMetas, 'clientId'))

          if (err instanceof FlowError) {
            const {data, status} = err
            return res.status(status || 500).send(data)
          }

          next(err)
        },
        proxyReqBodyDecorator: (reqBody, srcReq) => {
          const {model} = this.parseGoogleapisUrl(srcReq.url)

          reqBody.allowedModels = reqBody.allowedModels || [model]
          reqBody.model = reqBody.model || model

          return reqBody
        },
        proxyReqOptDecorator: async (proxyReqOpts, _srcReq) => {
          const clientId = await reward.sample(mode, 'googleapis', lodash.map(authMetas, 'clientId'))
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
            `[${colors.yellow(moment().format('YYYY-MM-DD HH:mm:ss'))}] Using Google GenAI with profile:\n${profile}`,
          )

          proxyReqOpts.headers = lodash.merge({}, proxyReqOpts.headers, {
            Authorization: `Bearer ${token}`,
            cookie: 'FlowToken=' + token,
            FlowAgent: authMeta.agent,
            FlowTenant: authMeta.tenant,
          })

          return proxyReqOpts
        },
        proxyReqPathResolver: (req) => {
          const {operation} = this.parseGoogleapisUrl(req.url)
          const newUrl = `/ai-orchestration-api/v1/google/${operation}`
          return newUrl
        },
        userResDecorator: (proxyRes, proxyResData, _userReq, _userRes) => {
          let data = {} as Record<string, any>

          try {
            let resData = proxyResData.toString('utf8')

            if (resData.includes('data: ')) {
              const resDatas = lodash
                .chain(resData)
                .split('data: ')
                .filter()
                .map((item) => {
                  return JSON.parse(item.trim())
                })
                .value()

              resData = JSON.stringify(resDatas)
            }

            data = JSON.parse(resData.trim())
          } catch (error: any) {
            this.logger.warn(error)
          }

          if (lodash.isEmpty(data)) {
            data = {message: proxyRes.statusMessage, status: proxyRes.statusCode}
          }

          if (proxyRes.statusCode !== 200) {
            const err = new FlowError(proxyRes.statusMessage || 'Unknown error')
            err.status = proxyRes.statusCode || 500
            err.data = data
            throw err
          }

          if (data?.error) {
            const err = new FlowError(data.error)

            err.data = data

            if (data?.statusCode) {
              err.status = data.statusCode
            }

            if (!lodash.isEmpty(data?.history)) {
              err.status = data.history.at(-1)?.status || err.status || 500
            } else if (String(data?.err).startsWith('Failed to prompt any model for tenant')) {
              err.status = 429 // too many requests
            }

            throw err
          }

          return proxyResData
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
        ]),
      )
    })
  }

  public async stop(): Promise<void> {
    throw this.logger.error('LLM proxy is not implemented yet.', {exit: 1})
  }

  protected parseGoogleapisUrl(url: string): {model: string; operation: string} {
    const parts = lodash.trim(url, '/').split('/')
    const [model] = parts.at(-1)?.split(':') || []
    let [, operation] = parts.at(-1)?.split(':') || []
    if (!operation) operation = parts.at(-1) || ''
    return {model, operation}
  }
}
