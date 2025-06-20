import BaseCommand from '@abstracts/base'
import {Flags} from '@oclif/core'
import LlmService from '@services/flow/llm'
import {table} from 'table'

export default class List extends BaseCommand {
  static description = 'List all LLM auths.'

  static examples = ['$ <%= config.bin %> llm auth list']

  static flags = {
    'show-secrets': Flags.boolean({
      aliases: ['show'],
      default: false,
      description: 'Show client secrets in the output.',
    }),
  }

  protected llmService = new LlmService({jsonEnabled: this.jsonEnabled()})

  async run(): Promise<void> {
    const {flags} = await this.parse(List)

    const auths = await this.llmService.listAuthMeta()

    const header = ['Name', 'Agent', 'Apps', 'Client ID', 'Client Secret', 'Tenant', 'Email']

    const data = auths.map((meta) => [
      meta.name,
      meta.agent,
      meta.appToAccess,
      meta.clientId,
      flags['show-secrets'] ? meta.clientSecret : meta.clientSecret.slice(0, 4) + '...' + meta.clientSecret.slice(-4),
      meta.tenant,
      meta.user?.email || '(no perms)',
    ])

    this.log(table([header, ...data]))
  }
}
