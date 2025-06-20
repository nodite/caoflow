import flow from '@components/cache/plugin/flow'

const CacheClient = {
  LLM: await flow.getClient('llm'),
  LOGIN: await flow.getClient('login'),
  USER: await flow.getClient('user'),
}

export {default as flow} from '@components/cache/plugin/flow'
export {default as memory} from '@components/cache/plugin/memory'
export {CacheClient}
