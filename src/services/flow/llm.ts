import type {AuthMeta} from '@@types/services/flow/llm'

import {User} from '@@types/components/openapi/user-api/data-constracts'
import {CacheClient} from '@components/cache'
import AuthEngineApi from '@components/openapi/auth-engine-api/AuthEngineApi'
import UserApi from '@components/openapi/user-api/UserApi'
import {FLOW_BASE_URL} from '@env'
import BaseService from '@services/base'
import UserService from '@services/flow/user'
import {Cacheable, CacheUpdate} from '@type-cacheable/core'
import lodash from 'lodash'

export default class LlmService extends BaseService {
  protected authEngineApi = new AuthEngineApi({baseURL: FLOW_BASE_URL})

  protected userApi = new UserApi({baseURL: FLOW_BASE_URL})

  protected userService = new UserService({jsonEnabled: this.jsonEnabled})

  @Cacheable({cacheKey: (args: any[]) => `auth:meta:${args[0]}`, client: CacheClient.LLM})
  public async getAuthMeta(_clientId: string): Promise<AuthMeta> {
    throw this.logger.error('No auth meta found for the given client id.', {exit: 1})
  }

  public async getAuthToken(clientId: string): Promise<string> {
    const cacheKey = `auth:token:${clientId}`

    const token = await CacheClient.LLM.get<string>(cacheKey)

    if (token) return token

    const authMeta = await this.getAuthMeta(clientId)

    const resp = await this.authEngineApi.generateToken(
      {
        appToAccess: authMeta.appToAccess,
        clientId: authMeta.clientId,
        clientSecret: authMeta.clientSecret,
      },
      {
        headers: {
          FlowTenant: authMeta.tenant,
        },
        secure: false,
      },
    )

    await CacheClient.LLM.set(cacheKey, resp.data.access_token, Number(resp.data.expires_in) * 1000)

    return resp.data.access_token
  }

  public async listAuthMeta(): Promise<(AuthMeta & {user: undefined | User})[]> {
    const keys = await CacheClient.LLM.keys('auth:meta:*')
    const clientIds = lodash.map(keys, (key) => key.split(':').at(-1)!)

    const promises = lodash.map(clientIds, async (clientId) => {
      const authMeta = await this.getAuthMeta(clientId)

      const getUser = await this.userApi.getUserByClientId(authMeta.clientId).catch(() => ({data: undefined}))

      return {...authMeta, user: getUser.data}
    })

    return Promise.all(promises)
  }

  @CacheUpdate({cacheKey: (args: any[]) => `auth:meta:${args[0].clientId}`, client: CacheClient.LLM})
  public async setAuthMeta(meta: AuthMeta): Promise<AuthMeta> {
    return meta
  }
}
