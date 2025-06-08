import BaseCommand from '@abstracts/base'
import {select} from '@inquirer/prompts'
import {Flags} from '@oclif/core'
import UserService from '@services/flow/user'
import colors from 'ansi-colors'
import lodash from 'lodash'

export default class Get extends BaseCommand {
  static description = 'Get Client Secret for the authenticated user.'

  static examples = [
    `$ <%= config.bin %> user apikey get
Select an API key to retrieve: my-api-key (xxx)
✔ Name: my-api-key
✔ Client ID: xxx
✔ Client Secret: xxx
`,
    `$ <%= config.bin %> user apikey get --search my-api-key
✔ Name: my-api-key
✔ Client ID: xxx
✔ Client Secret: xxx
`,
  ]

  static flags = {
    search: Flags.string({
      char: 's',
      description: 'Search term to filter API keys by name or client ID.',
    }),
  }

  protected userService = new UserService({jsonEnabled: this.jsonEnabled()})

  async run(): Promise<void> {
    const {flags} = await this.parse(Get)

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
        message: 'Select an API key to retrieve:',
      })
    }

    const apiKey = lodash.find(apiKeys, {clientId: flags['client-id']})

    if (!apiKey) {
      throw this.error('No API key found matching the criteria.', {exit: 1})
    }

    flags.name = apiKey.name

    this.log(`${colors.green('✔')} ${colors.bold('Name')}: ${colors.cyan(flags.name || 'N/A')}`)
    this.log(`${colors.green('✔')} ${colors.bold('Client ID')}: ${colors.cyan(flags['client-id'])}`)

    const clientSecret = await this.userService.getClientSecret(flags['client-id'])

    if (!clientSecret) {
      throw this.error(`No secret found at local machine, or it was not created by caoflow.`, {exit: 1})
    }

    this.log(`${colors.green('✔')} ${colors.bold('Client Secret')}: ${colors.cyan(clientSecret)}`)
  }
}
