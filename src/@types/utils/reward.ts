export const SampleModes = ['balance', 'encourage', 'none'] as const

export type SampleMode = (typeof SampleModes)[number]

export type Sampler<T> = {
  reward: T
  weight: number
}
