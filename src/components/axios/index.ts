import {CookieJar, setupCookieJar} from '@components/axios/plugin/cookie'
import LoginService from '@services/flow/login'
import UserService from '@services/flow/user'
import Logger from '@utils/logger'
import _axios from 'axios'
import {AxiosCacheInstance, buildMemoryStorage, setupCache} from 'axios-cache-interceptor'
import lodash from 'lodash'
import {Cookie} from 'tough-cookie'
import UserAgent from 'user-agents'

const logger = new Logger('axios')

const createAxios = (...axiosConfig: Parameters<typeof _axios.create>) => {
  const axios = _axios.create(...axiosConfig)

  setupCache(axios, {
    interpretHeader: false,
    storage: buildMemoryStorage(),
    ttl: 1000 * 60 * 5, // 5min
  })

  setupCookieJar(axios)

  axios.interceptors.request.use(async (config) => {
    config.headers['User-Agent'] = new UserAgent().toString()

    if (!lodash.has(config, 'secure') || config.secure) {
      const userService = new UserService()
      const loginService = new LoginService()

      const user = await userService.getDefaultUser()
      const token = await loginService.getToken(user)

      config.headers.Authorization = `Bearer ${token?.token}`

      await CookieJar.setCookie(new Cookie({key: 'FlowToken', value: token?.token}), config.baseURL || config.url || '')
    } else {
      await CookieJar.setCookie(new Cookie({key: 'FlowToken', value: ''}), config.baseURL || config.url || '')
    }

    return config
  })

  axios.interceptors.response.use(
    async (response) => response,
    async (error) => {
      throw logger.error(error, {exit: 1})
    },
  )

  return axios
}

const axios = createAxios()

export default axios as AxiosCacheInstance
export {createAxios}

export {default as cookiePlugin} from './plugin/cookie'
