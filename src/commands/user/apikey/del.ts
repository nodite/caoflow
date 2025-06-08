import BaseCommand from '@abstracts/base'
import {confirm, select} from '@inquirer/prompts'
import {Flags} from '@oclif/core'
import UserService from '@services/flow/user'
import colors from 'ansi-colors'
import lodash from 'lodash'

export default class Del extends BaseCommand {
  static description = 'Delete an API key for the authenticated user.'

  static examples = [
    `$ <%= config.bin %> user apikey del
Select an API key to delete: my-api-key (xxx)
Deleting API key my-api-key (xxx)...
? Are you sure you want to delete this API key? Yes
✔ API key deleted.
`,
    `$ <%= config.bin %> user apikey del --search my-api-key
Deleting API key my-api-key (xxx)...
? Are you sure you want to delete this API key? Yes
✔ API key deleted.
`,
  ]

  static flags = {
    force: Flags.boolean({
      char: 'f',
      default: false,
      description: 'Force deletion without confirmation.',
    }),
    search: Flags.string({
      char: 's',
      description: 'Search term to filter API keys by name or client ID.',
    }),
  }

  protected userService = new UserService({jsonEnabled: this.jsonEnabled()})

  async run(): Promise<void> {
    const {flags} = await this.parse(Del)

    const apiKeys = await this.userService.listApiKeys(flags.search)

    if (apiKeys.length === 0) {
      throw this.error('No API keys found matching the criteria.', {exit: 1})
    }

    if (apiKeys.length === 1) {
      flags['client-id'] = apiKeys[0].clientId
    }

    if (!flags['client-id']) {
      flags['client-id'] = await select({
        choices: apiKeys.map((key) => ({name: `${key.name} (${key.clientId})`, value: key.clientId})),
        message: 'Select an API key to delete:',
      })
    }

    const apiKey = lodash.find(apiKeys, {clientId: flags['client-id']})

    if (!apiKey) {
      throw this.error('No API key found matching the criteria.', {exit: 1})
    }

    flags.name = apiKey.name

    this.log(`Deleting API key ${colors.cyan(flags.name || '')} (${colors.cyan(flags['client-id'] || '')})...`)

    if (!flags.force) {
      flags.force = await confirm({
        default: false,
        message: 'Are you sure you want to delete this API key?',
      })
    }

    if (!flags.force) {
      throw this.error('Operation cancelled.', {exit: 1})
    }

    await this.userService.deleteApiKey(apiKey)

    this.log(`${colors.green('✔')} API key deleted.`)
  }
}
