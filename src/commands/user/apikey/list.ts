import BaseCommand from '@abstracts/base'
import {Flags} from '@oclif/core'
import UserService from '@services/flow/user'
import lodash from 'lodash'
import moment from 'moment'
import {table} from 'table'

export default class List extends BaseCommand {
  static description = 'List all API keys for the authenticated user.'

  static examples = [
    '$ <%= config.bin %> user apikey list',
    '$ <%= config.bin %> user apikey list --show-inactive',
    '$ <%= config.bin %> user apikey list --show-secrets',
    '$ <%= config.bin %> user apikey list --inactive --show',
  ]

  static flags = {
    'show-inactive': Flags.boolean({
      aliases: ['inactive'],
      default: false,
      description: 'Show inactive API keys in the output.',
    }),
    'show-secrets': Flags.boolean({
      aliases: ['show'],
      default: false,
      description: 'Show client secrets in the output.',
    }),
  }

  protected userService: UserService = new UserService({jsonEnabled: this.jsonEnabled()})

  async run(): Promise<void> {
    const {flags} = await this.parse(List)

    const apiKeys = await this.userService.listApiKeys(undefined, flags['show-inactive'])

    if (lodash.isEmpty(apiKeys)) {
      throw this.error(`No API keys found for the authenticated user.`, {exit: 1})
    }

    const header = ['Name', 'Apps', 'Client ID', 'Client Secret', 'Created On', 'Expiration Date', 'Active']

    const promises = lodash.map(apiKeys, async (apiKey) => [
      apiKey.name,
      apiKey.appsToAccess.join(','),
      apiKey.clientId,
      flags['show-secrets']
        ? (await this.userService.getClientSecret(apiKey.clientId)) || '(not found)'
        : apiKey.secretHint,
      moment(apiKey.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      moment(apiKey.expiresIn).format('YYYY-MM-DD HH:mm:ss'),
      apiKey.active ? '🟢' : '🔴',
    ])

    const data = await Promise.all(promises)

    this.log(table([header, ...data]))
  }
}
