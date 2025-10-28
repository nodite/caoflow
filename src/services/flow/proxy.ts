import type {LlmAuth, LlmAuthMeta, LlmVendor} from '@@types/services/flow/llm'
import type {SampleMode} from '@@types/utils/reward'
import type {Plugin} from 'http-proxy-middleware'
import type {IncomingMessage, ServerResponse} from 'node:http'

import {DefaultAuthMeta, FlowAuthMeta} from '@@types/services/flow/llm'
import {FLOW_BASE_URL} from '@env'
import BaseService from '@services/base'
import LlmService from '@services/flow/llm'
import express from '@utils/express'
import reward from '@utils/reward'
import colors from 'ansi-colors'
import * as httpContext from 'express-http-context'
import getPort from 'get-port'
import {createProxyMiddleware, fixRequestBody} from 'http-proxy-middleware'
import lodash from 'lodash'
import moment from 'moment'
import {table} from 'table'

export default class ProxyService extends BaseService {
  protected llmService = new LlmService({jsonEnabled: this.jsonEnabled})

  public async start(config?: {trafficMode?: SampleMode}): Promise<void> {
    config = config || {}
    config.trafficMode = config.trafficMode || 'balance'

    const app = express.createApp({bodyParse: true})

    const authMetas = lodash.map(await this.llmService.listAuthMeta(), 'authMeta')

    if (lodash.isEmpty(authMetas)) {
      throw this.logger.error('No LLM auth meta found. Please configure LLM auth meta first.', {exit: 1})
    }

    if (!FLOW_BASE_URL) {
      throw this.logger.error('FLOW_BASE_URL is not set. Please set it in the environment variables.', {exit: 1})
    }

    const flowModels = await this.llmService.flowModels()

    // ===================================================
    // Amazon Bedrock proxy.
    app.use(
      '/v1/amazon-bedrock',
      this.authMiddleware(authMetas, 'amazon-bedrock', config.trafficMode),
      // flow proxy.
      createProxyMiddleware({
        logger: console,
        plugins: [this.genProxyPlugin('flow', {flowModels: flowModels['amazon-bedrock'], llmVendor: 'amazon-bedrock'})],
        target: FLOW_BASE_URL,
      }),
      // default proxy.
      createProxyMiddleware({
        logger: console,
        plugins: [this.genProxyPlugin('default', {llmVendor: 'amazon-bedrock'})],
        target: FLOW_BASE_URL,
      }),
    )

    // ===================================================
    // Azure Foundry proxy.
    app.use(
      '/v1/foundry',
      this.authMiddleware(authMetas, 'azure-foundry', config.trafficMode),
      // flow proxy.
      createProxyMiddleware({
        logger: console,
        plugins: [this.genProxyPlugin('flow', {flowModels: flowModels['azure-foundry'], llmVendor: 'azure-foundry'})],
        target: FLOW_BASE_URL,
      }),
      // default proxy.
      createProxyMiddleware({
        logger: console,
        plugins: [this.genProxyPlugin('default', {llmVendor: 'azure-foundry'})],
        target: FLOW_BASE_URL,
      }),
    )

    // ===================================================
    // OpenAI proxy.
    app.use(
      '/openai',
      this.authMiddleware(authMetas, 'azure-openai', config.trafficMode),
      // flow proxy.
      createProxyMiddleware({
        logger: console,
        plugins: [this.genProxyPlugin('flow', {flowModels: flowModels['azure-openai'], llmVendor: 'azure-openai'})],
        target: FLOW_BASE_URL,
      }),
      // default proxy.
      createProxyMiddleware({
        logger: console,
        plugins: [this.genProxyPlugin('default', {llmVendor: 'azure-openai'})],
        target: FLOW_BASE_URL,
      }),
    )

    // ===================================================
    // Google Gemini proxy.
    app.use(
      '/gemini',
      this.authMiddleware(authMetas, 'google-gemini', config.trafficMode),
      // flow proxy.
      createProxyMiddleware({
        logger: console,
        plugins: [this.genProxyPlugin('flow', {flowModels: flowModels['google-gemini'], llmVendor: 'google-gemini'})],
        target: FLOW_BASE_URL,
      }),
      // default proxy.
      createProxyMiddleware({
        logger: console,
        plugins: [this.genProxyPlugin('default', {llmVendor: 'google-gemini'})],
        target: FLOW_BASE_URL,
      }),
    )

    const port = await getPort({port: 4399})

    app.listen(port, () => {
      this.logger.log('Proxy server is running on port ' + colors.cyan(String(port)))
      this.logger.log('')
      this.logger.log('You can access the LLM proxy at:')
      this.logger.log(
        table([
          ['LLM Vendor', 'API Base URL', 'API Key'],
          ['Anthropic', colors.cyan(`http://127.0.0.1:${port}/anthropic`), 'please-ignore'],
          ['Amazon Bedrock', colors.cyan(`http://127.0.0.1:${port}/v1/amazon-bedrock`), 'please-ignore'],
          ['Azure Foundry', colors.cyan(`http://127.0.0.1:${port}/v1/foundry`), 'please-ignore'],
          ['Gemini', colors.cyan(`http://127.0.0.1:${port}/gemini`), 'please-ignore'],
          ['OpenAI', colors.cyan(`http://127.0.0.1:${port}/openai`), 'please-ignore'],
        ]),
      )
    })
  }

  public async stop(): Promise<void> {
    throw this.logger.error('LLM proxy is not implemented yet.', {exit: 1})
  }

  protected async _authenticate(authMetas: LlmAuthMeta[], llmVendor: LlmVendor, sampleMode: SampleMode) {
    const clientId = await reward.sample(
      sampleMode,
      llmVendor,
      lodash
        .chain(authMetas)
        .filter((meta) => {
          if (meta instanceof DefaultAuthMeta) {
            return meta.vendor === llmVendor
          }

          if (meta instanceof FlowAuthMeta) {
            return true
          }

          throw this.logger.error('Router not implemented.', {exit: 1})
        })
        .map('clientId')
        .value(),
    )

    const authMeta = lodash.find(authMetas, {clientId})!

    const profile = ['<']

    // print profile.
    if (authMeta instanceof DefaultAuthMeta) {
      profile.push(
        ['name=' + colors.gray(authMeta.name!), 'apiKey=' + colors.gray(authMeta.apiKey!.slice(0, 8) + '...')].join(
          ', ',
        ),
      )
    } else if (authMeta instanceof FlowAuthMeta) {
      profile.push(
        [
          'name=' + colors.gray(authMeta.name!),
          'clientId=' + colors.gray(authMeta.clientId!.slice(0, 8) + '...'),
          'clientSecret=' + colors.gray(authMeta.clientSecret!.slice(0, 8) + '...'),
          'tenant=' + colors.gray(authMeta.tenant!),
          'agent=' + colors.gray(authMeta.agent!),
        ].join(', '),
      )
    } else {
      throw this.logger.error('Print profile not implemented.', {exit: 1})
    }

    profile.push('>')

    this.logger.log(
      [
        `[${colors.yellow(moment().format('YYYY-MM-DD HH:mm:ss'))}]`,
        `Using ${colors.cyan(llmVendor)} with profile:\n`,
        profile.join(''),
      ].join(' '),
    )

    return {authMeta, token: await this.llmService.getAuthToken(clientId)}
  }

  protected _genDefaultPathRewrite(llmVendor: LlmVendor) {
    return (path: string, req: IncomingMessage) => {
      switch (llmVendor) {
        case 'google-gemini': {
          const model = this._getModelFromReq(llmVendor, req)

          const mappedModel: Record<string, string> = {
            // 'gemini-1.5-pro-002': 'gemini-1.5-flash-002',
            // 'gemini-2.0-pro-exp': 'gemini-2.0-flash',
            // 'gemini-2.5-flash': 'gemini-2.5-flash-preview-05-20',
            // 'gemini-2.5-pro': 'gemini-2.5-flash-preview-05-20',
            // 'gemini-2.5-pro-preview-06-05': 'gemini-2.5-flash-preview-05-20',
            // 'gemini-exp-1206': 'gemini-2.5-flash-preview-05-20',
          }

          const finalModel = mappedModel[model] || model

          return path.replace(model, finalModel)
        }

        default: {
          throw this.logger.error(`Path rewrite not implemented for ${llmVendor}`, {exit: 1})
        }
      }
    }
  }

  protected _genFlowPathRewrite(llmVendor: LlmVendor) {
    return async (path: string, req: IncomingMessage) => {
      const authMeta = httpContext.get('auth-meta') as LlmAuthMeta

      switch (llmVendor) {
        case 'amazon-bedrock': {
          const {operation} = this._parseAmazonBedrockUrl(path)
          return `/ai-orchestration-api/v1/bedrock/${operation}`
        }

        case 'azure-foundry': {
          const {operation} = this._parseAzureFoundryUrl(path)
          return `/ai-orchestration-api/v1/foundry/${operation}`
        }

        case 'azure-openai': {
          const {operation} = this._parseOpenaiUrl(path)
          return `/ai-orchestration-api/v1/openai/${operation}`
        }

        case 'google-gemini': {
          // const token = await this.llmService.getAuthToken(authMeta.clientId)

          const urlInfo = new URL(path, authMeta.host())
          // urlInfo.searchParams.set('key', token)
          path = urlInfo.pathname + urlInfo.search

          const {operation} = this._parseGoogleGeminiUrl(path)
          return `/ai-orchestration-api/v1/google/${operation}`
        }

        default: {
          return `/flow-llm-proxy/${lodash.get(req, 'originalUrl')}`
        }
      }
    }
  }

  protected _getModelFromReq(llmVendor: LlmVendor, req: IncomingMessage): string {
    let model: string | undefined

    switch (llmVendor) {
      case 'amazon-bedrock': {
        ;({model} = lodash.get(req, 'body', {}) as Record<string, any>)

        if (model) break

        const originalUrl = lodash.get(req, 'originalUrl', '') as string
        const baseUrl = lodash.get(req, 'baseUrl', '') as string
        const url = originalUrl.startsWith(baseUrl) ? originalUrl.slice(baseUrl.length) : originalUrl
        ;({model} = this._parseAmazonBedrockUrl(url))

        if (model) break

        throw this.logger.error('Model not found in request for amazon-bedrock', {exit: 1})
      }

      case 'azure-foundry':
      case 'azure-openai': {
        ;({model} = lodash.get(req, 'body', {}) as Record<string, any>)
        break
      }

      case 'google-gemini': {
        const originalUrl = lodash.get(req, 'originalUrl', '') as string
        const baseUrl = lodash.get(req, 'baseUrl', '') as string
        const url = originalUrl.startsWith(baseUrl) ? originalUrl.slice(baseUrl.length) : originalUrl
        ;({model} = this._parseGoogleGeminiUrl(url))
        break
      }

      default: {
        throw this.logger.error(`Get model from request not implemented for ${llmVendor}`, {exit: 1})
      }
    }

    if (!model) {
      throw this.logger.error(`Model not found in request for ${llmVendor}`, {exit: 1})
    }

    return model
  }

  protected _parseAmazonBedrockUrl(url: string): {model: string; operation: string} {
    url = lodash.trim(url, '/')
    if (url.startsWith('model/')) return this._parseAnthropicUrl(url)
    throw this.logger.error('Parse Amazon Bedrock URL not implemented.', {exit: 1})
  }

  protected _parseAnthropicUrl(url: string): {model: string; operation: string} {
    url = lodash.trim(url, '/')
    const [, model, operation] = url.split('/')
    return {model, operation: operation || ''}
  }

  protected _parseAzureFoundryUrl(url: string): {operation: string; version: string} {
    url = lodash.trim(url, '/')

    // v1/openai/deployments/{deployment-name}/chat/completions
    if (!url.startsWith('v1')) url = 'v1/' + url

    // eslint-disable-next-line unicorn/no-unreadable-array-destructuring
    const [version, , , , ...operation] = url.split('/')

    return {operation: operation.join('/') || '', version: version || 'v1'}
  }

  protected _parseGoogleGeminiUrl(url: string): {model: string; operation: string; version: string} {
    // v1beta/models/{model}:streamGenerateContent
    const [version, , ...rest] = lodash.trim(url, '/').split('/')
    const [model, ...operation] = rest.join('/').split(':')
    return {model, operation: operation.join(':') || '', version: version || 'v1beta'}
  }

  protected _parseOpenaiUrl(url: string): {model?: string; operation: string; version: string} {
    url = lodash.trim(url, '/')

    if (url.includes('/deployments/')) {
      return this._parseAzureFoundryUrl(url)
    }

    // v1/chat/completions
    if (!url.startsWith('v1')) url = 'v1/' + url

    const [version, ...operation] = url.split('/')

    return {operation: operation.join('/') || '', version: version || 'v1'}
  }

  protected authMiddleware(authMetas: LlmAuthMeta[], llmVendor: LlmVendor, sampleMode: SampleMode) {
    return (req: IncomingMessage, res: ServerResponse, next: any) => {
      this._authenticate(authMetas, llmVendor, sampleMode)
        .then(({authMeta, token}) => {
          httpContext.set('auth-meta', authMeta)

          if (authMeta instanceof DefaultAuthMeta) {
            if (authMeta.vendor === 'azure-openai') {
              req.headers.authorization = `Bearer ${authMeta.apiKey}`
            } else if (authMeta.vendor === 'google-gemini') {
              const urlInfo = new URL(req.url!, authMeta.host())
              urlInfo.searchParams.set('key', authMeta.apiKey!)
              req.url = urlInfo.pathname + urlInfo.search
            } else {
              throw this.logger.error(`Set auth not implemented for ${authMeta.vendor}`, {exit: 1})
            }
          } else if (authMeta instanceof FlowAuthMeta) {
            req.headers.authorization = `Bearer ${authMeta.jwt()}`
            req.headers.cookie = 'FlowToken=' + token
            req.headers.FlowAgent = authMeta.agent!
            req.headers.FlowTenant = authMeta.tenant!
          } else {
            throw this.logger.error('Set auth not implemented.', {exit: 1})
          }

          next()
        })
        .catch((error) => next(error))
    }
  }

  protected genProxyPlugin(authType: LlmAuth, config: {flowModels?: string[]; llmVendor: LlmVendor}): Plugin {
    return (proxyServer, options) => {
      options.changeOrigin = true
      options.followRedirects = true

      options.router = (_req) => {
        const authMeta = httpContext.get('auth-meta') as LlmAuthMeta
        return authMeta.host()
      }

      options.pathFilter = (_path, _req) => {
        if (httpContext.get('http-proxy-middleware')) return false

        const authMeta = httpContext.get('auth-meta') as LlmAuthMeta

        if (authMeta.type !== authType) return false

        const model = this._getModelFromReq(config.llmVendor, _req)

        if (authMeta instanceof FlowAuthMeta && !config.flowModels?.includes(model)) return false

        httpContext.set('http-proxy-middleware', true)

        return true
      }

      if (authType === 'default') {
        options.pathRewrite = this._genDefaultPathRewrite(config.llmVendor)
      } else if (authType === 'flow') {
        options.pathRewrite = this._genFlowPathRewrite(config.llmVendor)
      } else {
        throw this.logger.error(`Path rewrite not implemented for ${authType}`, {exit: 1})
      }

      proxyServer.on('proxyReq', (proxyReq, req) => {
        const model = this._getModelFromReq(config.llmVendor, req)

        const authMeta = httpContext.get('auth-meta') as LlmAuthMeta

        if (authMeta instanceof FlowAuthMeta) {
          const requestBody = lodash.get(req, 'body') as unknown as Record<string, any>
          requestBody.model = model
          requestBody.allowedModels = config.flowModels || [model]
        }

        this.logger.log(` <model=${colors.gray(model || '')}>`)

        fixRequestBody(proxyReq, req)
      })

      proxyServer.on('error', async (err, _req) => {
        this.logger.error(err, {exit: false})
        await reward.demote(config.llmVendor, httpContext.get('auth-meta')?.clientId)
      })

      proxyServer.on('end', async (_req, _res) => {
        httpContext.set('http-proxy-middleware', false)
      })
    }
  }
}
