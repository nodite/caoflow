import os from 'node:os'

import {KeyvSqlite} from '@keyv/sqlite'
import {useAdapter} from '@nodite/cache-manager-adapter'
import {default as _CacheManager, CacheManagerOptions} from '@type-cacheable/core'
import {createCache} from 'cache-manager'
import fs from 'fs-extra'
import {Keyv} from 'keyv'
import lodash from 'lodash'

import memory from './memory'

const CacheManager = lodash.get(_CacheManager, 'default', _CacheManager)

CacheManager.setOptions(<CacheManagerOptions>{
  debug: true,
  excludeContext: false,
  ttlSeconds: 0,
})

type StoreReturn = {cache: ReturnType<typeof createCache>; keyv: Keyv; store: KeyvSqlite}

const KEY_PREFIX = 'cache:flow:store'

const initStore = async (scope: string): Promise<StoreReturn> => {
  const existStore = await memory.cache.get<StoreReturn>(`${KEY_PREFIX}:${scope}`)

  if (existStore) {
    return existStore
  }

  await fs.ensureDir(`${os.homedir()}/.caoflow`)

  const store = new KeyvSqlite({
    iterationLimit: 5000,
    table: scope.replaceAll(/[^a-zA-Z0-9_]/g, '_').trim(),
    uri: `sqlite://${os.homedir()}/.caoflow/cache.db`,
  })

  const keyv = new Keyv({
    namespace: scope,
    store,
    ttl: CacheManager.options.ttlSeconds,
    useKeyPrefix: true,
  })

  const cache = createCache({stores: [keyv]})

  const storeReturn: StoreReturn = {cache, keyv, store}

  await memory.cache.set<StoreReturn>(`cache:flow:${scope}`, storeReturn)

  return storeReturn
}

const getClient = async (scope: string): Promise<ReturnType<typeof useAdapter>> => {
  const {cache, keyv} = await initStore(scope)

  return useAdapter(cache as never, [keyv as never])
}

const switchClient = async (scope: string): Promise<void> => {
  const client = await getClient(scope)
  CacheManager.setClient(client)
  CacheManager.setFallbackClient(client)
}

const close = async (): Promise<void> => {
  const keys = lodash.filter(memory.store.keys, (key) => String(key).startsWith(KEY_PREFIX))

  const disconnections = lodash.map(keys, async (key: string) => {
    const {store} = (await memory.cache.get<StoreReturn>(key)) as StoreReturn
    await store.disconnect()
    await memory.cache.del(key)
  })

  await Promise.all(disconnections)
}

export default {CacheManager, close, getClient, initStore, switchClient} as const
