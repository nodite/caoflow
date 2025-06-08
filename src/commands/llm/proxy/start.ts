import type {SampleMode} from '@@types/utils/reward'

import {SampleModes} from '@@types/utils/reward'
import BaseCommand from '@abstracts/base'
import {Flags} from '@oclif/core'
import ProxyService from '@services/flow/proxy'

export default class Proxy extends BaseCommand {
  static description = 'Proxy for LLM API.'

  static examples = [
    '$ <%= config.bin %> llm proxy start',
    '$ <%= config.bin %> llm proxy start --traffic balance',
    '$ <%= config.bin %> llm proxy start --traffic encourage',
  ]

  static flags = {
    traffic: Flags.string({
      default: 'balance',
      description: 'Not balance traffic by registered llm auth.',
      options: SampleModes,
    }),
  }

  protected proxyService = new ProxyService({jsonEnabled: this.jsonEnabled()})

  async run(): Promise<void> {
    const {flags} = await this.parse(Proxy)
    await this.proxyService.start(flags.traffic as SampleMode)
  }
}
