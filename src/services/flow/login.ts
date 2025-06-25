import type {TokenResult} from '@@types/components/openapi/login-service/data-constracts'
import type {AuthUser} from '@@types/services/flow/login'
import type {CreateTokenBody, GeneratePrincipalPolicyUrlDto} from '@components/openapi/login-service/data-contracts'

import {CacheClient} from '@components/cache'
import LoginApi from '@components/openapi/login-service/LoginService'
import {FLOW_BASE_URL} from '@env'
import BaseService from '@services/base'
import UserService from '@services/flow/user'
import {Cacheable, CacheClear, CacheUpdate} from '@type-cacheable/core'
import express from '@utils/express'
import Logger from '@utils/logger'
import puppeteer from '@utils/puppeteer'
import colors from 'ansi-colors'
import {awaitUntil} from 'await-until'
import getPort from 'get-port'
import lodash from 'lodash'
import {HTTPRequest} from 'puppeteer'
import validator from 'validator'

export default class LoginService extends BaseService {
  protected loginApi = new LoginApi({baseURL: FLOW_BASE_URL})

  protected userService = new UserService({jsonEnabled: this.jsonEnabled})

  static CACHE_KEY_AUTH_USER = (refresh: boolean) => {
    const logger = new Logger('CACHE_KEY_AUTH_USER')

    return (args: any[]) => {
      const user = lodash.find(args, (arg) => lodash.has(arg, 'auth') && lodash.has(arg, 'user')) as
        | AuthUser
        | undefined

      if (!user) throw logger.error('AuthUser is required to build the cache key.', {exit: 1})

      if (user.auth === 'email' && !validator.isEmail(user.user)) {
        throw logger.error('Invalid email address.', {exit: 1})
      }

      return refresh ? `${user.auth}:${user.user}:refresh` : `${user.auth}:${user.user}`
    }
  }

  public async authPortal(): Promise<void> {
    const port = await getPort({port: 3000})

    const generatePrincipalPolicyUrlDto = {
      channel: 'portal',
      redirectUri: `http://localhost:${port}/auth/callback`,
    } as GeneratePrincipalPolicyUrlDto

    const createTokenBody = {} as CreateTokenBody

    // Express listener.
    let cbAppIsListened = false

    const cbApp = express.createApp()

    cbApp.use('/auth/callback', async (req, res) => {
      const {code, flow_code, flow_state} = req.query

      generatePrincipalPolicyUrlDto.code = (flow_code || generatePrincipalPolicyUrlDto.code) as string
      createTokenBody.code = code as string
      createTokenBody.state = flow_state as string

      const tenantUrl = new URL('https://flow.ciandt.com/login/tenants')
      tenantUrl.searchParams.set('redirect_uri', generatePrincipalPolicyUrlDto.redirectUri)
      tenantUrl.searchParams.set('change_tenant', '1')

      this.logger.info(
        `You have successfully logged in with the email: ${colors.cyan(generatePrincipalPolicyUrlDto.email)}`,
      )

      res.type('text/html')
      res.send(
        [
          'You have logged into CI&T Flow!',
          `If you want to change organization/tenant, please click <a href="${tenantUrl.toString()}">here</a>.`,
          'Otherwise, you can close this window to finish authentication.',
        ].join('<br>'),
      )
    })

    const cbServer = cbApp.listen(port, async () => {
      cbAppIsListened = true
    })

    await awaitUntil({predicate: () => cbAppIsListened})

    // Login flow
    const loginBrowser = await puppeteer.core.launch({
      args: [
        `--app=https://flow.ciandt.com/login?redirect_uri=${generatePrincipalPolicyUrlDto.redirectUri}`,
        '--window-size=600,800',
        '--enable-features=NetworkService,NetworkServiceInProcess',
        '--no-sandbox',
      ],
      // executablePath: util.getBrowserPath(),
      headless: false,
      // ignoreDefaultArgs: ['--enable-automation', '--disable-blink-features=AutomationControlled'],
    })

    const loginPage = await loginBrowser.pages().then((pages) => pages[0])

    loginPage.on('request', async (request: HTTPRequest) => {
      if (request.method().toUpperCase() !== 'POST') {
        return
      }

      const url = new URL(request.url())

      if (url.pathname === '/login-service/v1/auth/policy-url/generate-principal') {
        lodash.merge(generatePrincipalPolicyUrlDto, JSON.parse(request.postData() || '{}'))
      }

      if (url.pathname === '/login-service/v1/auth/token/create') {
        lodash.merge(createTokenBody, JSON.parse(request.postData() || '{}'))
      }
    })

    this.logger.info(
      `A browser window has been opened at ${colors.cyan('https://flow.ciandt.com/login')}. ` +
        'Please continue the login in the web browser.',
    )

    await awaitUntil({predicate: async () => loginPage.isClosed(), timeout: 3600 * 1000})

    this.logger.info('Browser window has been closed, processing the login result...')

    await loginBrowser.close()
    await cbServer.close()

    if (lodash.isEmpty(createTokenBody)) {
      throw this.logger.error('Login failed, may be due to network issues.', {exit: 1})
    }

    await this.clearToken({auth: 'email', user: generatePrincipalPolicyUrlDto.email})

    const createTokenResult = await this.getToken(
      {auth: 'email', user: generatePrincipalPolicyUrlDto.email},
      createTokenBody,
    )

    const principalTenant = lodash.find(createTokenResult?.tenants, {isPrincipal: true})
    const activeTenant = lodash.find(createTokenResult?.tenants, {isActive: true})

    this.logger.info('')
    this.logger.info(
      `${colors.green('✔')} ${colors.bold('Email')}: ${colors.cyan(generatePrincipalPolicyUrlDto.email)}`,
    )
    this.logger.info(
      `${colors.green('✔')} ${colors.bold('Principal Tenant')}: ${colors.cyan(principalTenant?.displayName || 'N/A')}`,
    )
    this.logger.info(
      `${colors.green('✔')} ${colors.bold('Active Tenant')}: ${colors.cyan(activeTenant?.displayName || 'N/A')}`,
    )
    this.logger.info('')

    // Set the default user
    this.logger.info('Setting the authenticated account as default...')
    await this.userService.setDefaultUser({auth: 'email', user: generatePrincipalPolicyUrlDto.email})
    this.logger.info(`The account ${colors.cyan(generatePrincipalPolicyUrlDto.email)} has been set as default account.`)
    this.logger.info('You can change the default account by running `citflow user set` command.')
    this.logger.info('')
  }

  @CacheClear({cacheKey: LoginService.CACHE_KEY_AUTH_USER(false), client: CacheClient.LOGIN})
  @CacheClear({cacheKey: LoginService.CACHE_KEY_AUTH_USER(true), client: CacheClient.LOGIN})
  public async clearToken(_user: AuthUser): Promise<void> {}

  @Cacheable({cacheKey: LoginService.CACHE_KEY_AUTH_USER(false), client: CacheClient.LOGIN, ttlSeconds: 60 * 60 * 24})
  public async getToken(user: AuthUser, createTokenBody?: CreateTokenBody): Promise<TokenResult> {
    let tokenResult: TokenResult | undefined

    if (lodash.isEmpty(createTokenBody)) {
      tokenResult = await this.refreshToken(user)
    } else {
      const createTokenResult = await this.loginApi.tokenCreate(createTokenBody, {secure: false})
      tokenResult = createTokenResult.data as unknown as TokenResult

      // persist the token
      await this.refreshToken(user, tokenResult)
    }

    if (!tokenResult) {
      throw this.logger.error('You should login first before getting a token.', {exit: 1})
    }

    return tokenResult
  }

  @Cacheable({cacheKey: LoginService.CACHE_KEY_AUTH_USER(true), client: CacheClient.LOGIN})
  protected async getRefreshToken(_user: AuthUser): Promise<TokenResult | undefined> {
    return undefined
  }

  @CacheUpdate({cacheKey: LoginService.CACHE_KEY_AUTH_USER(true), client: CacheClient.LOGIN})
  protected async refreshToken(user: AuthUser, token?: TokenResult): Promise<TokenResult | undefined> {
    if (!lodash.isEmpty(token)) return token

    const tokenResult = await this.getRefreshToken(user)

    if (!tokenResult) return undefined

    const newToken = await this.loginApi.tokenValidate(
      {refreshToken: tokenResult.refreshToken, token: tokenResult.token},
      {headers: {Authorization: `Bearer ${tokenResult.token}`}, secure: false},
    )

    return lodash.merge(tokenResult, newToken.data)
  }
}
