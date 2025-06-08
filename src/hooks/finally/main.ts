import {flow as flowCache} from '@components/cache/index'
import {Hook} from '@oclif/core'
import puppeteer from '@utils/puppeteer'

const hook: Hook.Finally = async function () {
  // Close all open pages
  await puppeteer.close()

  // Close flow cache store
  await flowCache.close()

  if (global.gc) global.gc()
}

export default hook
