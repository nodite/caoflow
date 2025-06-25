import type {SampleMode, Sampler} from '@@types/utils/reward'

import {memory} from '@components/cache'
import {createWeightedSampler} from 'efficient-random-weighted'
import lodash from 'lodash'

const genWeightId = (sampleId: string): string => {
  return `sample:${sampleId}:weight`
}

const genDemoteId = <T = string>(sampleId: string, reward: T): string => {
  return `sample:${sampleId}:${reward}:demote`
}

const demote = async <T = string>(sampleId: string, reward: T): Promise<void> => {
  const demoteId = genDemoteId(sampleId, reward)
  await memory.cache.set(demoteId, true, 3600 * 1000)
}

const sample = async <T = string>(mode: SampleMode, sampleId: string, arr: T[]): Promise<T> => {
  let sampler = await memory.cache.get<Sampler<T>[]>(genWeightId(sampleId))

  sampler = lodash.isArray(sampler) ? sampler : []

  if (sampler.length !== arr.length) {
    sampler = lodash.map(arr, (item) => ({reward: item, weight: 100}))
  }

  // demote weight
  sampler = await Promise.all(
    lodash.map(sampler, async (item) => {
      const demote = await memory.cache.get<boolean>(genDemoteId(sampleId, item.reward))
      item.weight = demote ? item.weight * 0.2 : item.weight
      await memory.cache.del(genDemoteId(sampleId, item.reward))
      return item
    }),
  )

  const reward = createWeightedSampler(sampler)()

  // balance
  sampler = lodash.map(sampler, (item) => {
    switch (mode) {
      case 'balance': {
        item.weight = lodash.isEqual(item.reward, reward) ? item.weight * 0.9 : item.weight * 1.1

        break
      }

      case 'encourage': {
        item.weight = lodash.isEqual(item.reward, reward) ? item.weight * 1.1 : item.weight * 0.9

        break
      }

      default: {
        item.weight *= 1

        break
      }
    }

    return item
  })

  await memory.cache.set(genWeightId(sampleId), sampler)

  return reward
}

export default {demote, genDemoteId, genWeightId, sample}
