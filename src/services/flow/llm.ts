import type {User} from '@@types/components/openapi/user-api/data-constracts'
import type {LlmAuthMeta, LlmVendor} from '@@types/services/flow/llm'

import {DefaultAuthMeta, FlowAuthMeta} from '@@types/services/flow/llm'
import axios from '@components/axios'
import {CacheClient, memory} from '@components/cache'
import AuthEngineApi from '@components/openapi/auth-engine-api/AuthEngineApi'
import UserApi from '@components/openapi/user-api/UserApi'
import {FLOW_BASE_URL} from '@env'
import BaseService from '@services/base'
import UserService from '@services/flow/user'
import {CacheUpdate} from '@type-cacheable/core'
import lodash from 'lodash'

export default class LlmService extends BaseService {
  protected authEngineApi = new AuthEngineApi({baseURL: FLOW_BASE_URL})

  protected userApi = new UserApi({baseURL: FLOW_BASE_URL})

  protected userService = new UserService({jsonEnabled: this.jsonEnabled})

  public async flowModels(): Promise<Record<LlmVendor, string[]>> {
    let allowedModels = await memory.cache.get<Record<LlmVendor, string[]>>('flow:allowedModels')

    if (!lodash.isEmpty(allowedModels)) return allowedModels

    const resp = await axios.get('/ai-orchestration-api/v1/models', {baseURL: FLOW_BASE_URL})

    allowedModels = lodash
      .chain(resp.data)
      .groupBy('provider')
      .mapValues((models) => lodash.chain(models).map('name').uniq().value())
      .value() as Record<LlmVendor, string[]>

    await memory.cache.set('flow:allowedModels', allowedModels, 24 * 3600 * 1000) // 1 day

    return allowedModels
  }

  public async getAuthMeta(clientId: string): Promise<LlmAuthMeta> {
    const authMeta = await CacheClient.LLM.get<object>(`auth:meta:${clientId}`)

    const classes = [DefaultAuthMeta, FlowAuthMeta]

    for (const cls of classes) {
      try {
        return cls.create(authMeta)
      } catch {}
    }

    throw this.logger.error('No valid auth meta found for the given client id.', {exit: 1})
  }

  public async getAuthToken(clientId: string): Promise<string> {
    const cacheKey = `auth:token:${clientId}`

    let token = await CacheClient.LLM.get<string>(cacheKey)

    if (token) return token

    let expiresIn = 24 * 3600 // 24 hours

    const authMeta = await this.getAuthMeta(clientId)

    if (authMeta instanceof DefaultAuthMeta) {
      token = authMeta.apiKey!
    } else if (authMeta instanceof FlowAuthMeta) {
      const resp = await this.authEngineApi.generateToken(
        {
          appToAccess: authMeta.appToAccess!,
          clientId: authMeta.clientId!,
          clientSecret: authMeta.clientSecret!,
        },
        {
          headers: {
            FlowTenant: authMeta.tenant,
          },
          secure: false,
        },
      )

      token = resp.data.access_token
      expiresIn = Number(resp.data.expires_in) * 1000
    } else {
      throw this.logger.error('Not implemented for this auth meta type', {exit: 1})
    }

    await CacheClient.LLM.set(cacheKey, token, expiresIn)

    return token
  }

  public async listAuthMeta(): Promise<{authMeta: LlmAuthMeta; user: undefined | User}[]> {
    const keys = await CacheClient.LLM.keys('auth:meta:*')
    const clientIds = lodash.map(keys, (key) => key.split(':').at(-1)!)

    const promises = lodash.map(clientIds, async (clientId) => {
      const authMeta = await this.getAuthMeta(clientId)

      let user: undefined | User

      if (authMeta instanceof DefaultAuthMeta) {
        user = undefined
      } else if (authMeta instanceof FlowAuthMeta) {
        const getUser = await this.userApi.getUserByClientId(authMeta.clientId!).catch(() => ({data: undefined}))
        user = getUser.data
      } else {
        throw this.logger.error('Not implemented for this auth meta type', {exit: 1})
      }

      return {authMeta, user}
    })

    return Promise.all(promises)
  }

  @CacheUpdate({cacheKey: (args: any[]) => `auth:meta:${args[0].clientId}`, client: CacheClient.LLM})
  public async setAuthMeta(meta: LlmAuthMeta): Promise<LlmAuthMeta> {
    return meta
  }
}
