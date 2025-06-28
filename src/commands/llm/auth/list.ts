import {DefaultAuthMeta, FlowAuthMeta} from '@@types/services/flow/llm'
import BaseCommand from '@abstracts/base'
import {Flags} from '@oclif/core'
import LlmService from '@services/flow/llm'
import lodash from 'lodash'
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

    const data = lodash.map(auths, (meta) => {
      const {authMeta} = meta

      if (authMeta instanceof DefaultAuthMeta) {
        const clientSecret = flags['show-secrets']
          ? authMeta.apiKey
          : authMeta.apiKey!.slice(0, 4) + '...' + authMeta.apiKey!.slice(-4)

        return [authMeta.name, authMeta.vendor, '(none)', authMeta.clientId, clientSecret, '(none)', '(none)']
      }

      if (authMeta instanceof FlowAuthMeta) {
        const clientSecret = flags['show-secrets']
          ? authMeta.clientSecret
          : authMeta.clientSecret!.slice(0, 4) + '...' + authMeta.clientSecret!.slice(-4)

        return [
          authMeta.name,
          authMeta.agent,
          authMeta.appToAccess,
          authMeta.clientId,
          clientSecret,
          authMeta.tenant,
          meta.user?.email || '(no perms)',
        ]
      }

      throw this.error('Not implemented for this auth meta type', {exit: 1})
    })

    this.log(table([header, ...data]))
  }
}
