import {cookiePlugin} from '@components/axios'
import {memory} from '@components/cache'
import {AxiosRequestConfig} from 'axios'
import lodash from 'lodash'
import {Browser, Page} from 'puppeteer'
import {default as puppeteer, VanillaPuppeteer} from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import {Cookie} from 'tough-cookie'
import * as uuid from 'uuid'

puppeteer.use(StealthPlugin())

type PuppeteerOptions = Parameters<VanillaPuppeteer['launch']>[0]

const getBrowser = async (scope: string, options?: PuppeteerOptions) => {
  const cacheKey = `puppeteer:browser:${scope}`

  let browser = await memory.cache.get<Browser>(cacheKey)

  if (browser && browser.connected) {
    return browser
  }

  browser = await puppeteer.launch(lodash.merge({headless: true, protocolTimeout: 10 * 60 * 1000}, options || {}))

  await memory.cache.set(cacheKey, browser)

  return browser
}

const getPage = async (
  scope: string,
  url: string,
  config?: {axios?: AxiosRequestConfig; puppeteer?: PuppeteerOptions},
) => {
  const cacheKey = `puppeteer:page:${uuid.v5(`${scope}:${url}`, uuid.NIL)}`

  let page = await memory.cache.get<Page>(cacheKey)

  if (page && !page.isClosed()) {
    return page
  }

  const browser = await getBrowser(scope, config?.puppeteer || {})

  page = await browser.newPage()

  // user agent.
  await page.setUserAgent(config?.axios?.headers?.['User-Agent'] || (await browser.userAgent()))

  // extra HTTP headers.
  await page.setExtraHTTPHeaders({
    'Accept-Language': config?.axios?.headers?.['Accept-Language'] || 'en-US,en;q=0.9',
  })

  // cookies.
  for (const sck of config?.axios?.headers?.['set-cookie'] || []) {
    const ck = Cookie.parse(sck) as Cookie
    await cookiePlugin.jar.setCookie(ck, `https://${ck.domain}${ck.path}`)
  }

  const cookies = await cookiePlugin.jar.store.getAllCookies()

  await page.browser().setCookie(...cookies.map((ck) => cookiePlugin.toPuppeteer(ck)))

  // params.
  const urlObj = new URL(url)

  for (const [key, value] of Object.entries(config?.axios?.params || {})) {
    urlObj.searchParams.set(key, String(value))
  }

  await page.goto(urlObj.toString(), {timeout: 0, waitUntil: 'load'})

  await memory.cache.set(cacheKey, page)

  return page
}

const close = async () => {
  for (const key of memory.store.keys) {
    if (String(key).startsWith('puppeteer:page')) {
      const page = await memory.cache.get<Page>(key)
      await page?.close()
      await memory.cache.del(key)
    }

    if (String(key).startsWith('puppeteer:browser')) {
      const browser = await memory.cache.get<Browser>(key)
      await browser?.close()
      await memory.cache.del(key)
    }

    if (String(key).startsWith('puppeteer:')) {
      await memory.cache.del(key)
    }
  }
}

export default {browser: getBrowser, close, core: puppeteer, page: getPage}
