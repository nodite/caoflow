import {type AppName, APPS} from '@@types/components/openapi/user-api/data-constracts'
import BaseCommand from '@abstracts/base'
import {checkbox, input} from '@inquirer/prompts'
import {Flags} from '@oclif/core'
import UserService from '@services/flow/user'
import colors from 'ansi-colors'
import lodash from 'lodash'
import * as uuid from 'uuid'

export default class Gen extends BaseCommand {
  static description = 'Create a new API key for the authenticated user.'

  static examples = [
    `$ <%= config.bin %> user apikey gen
✔ Enter a name for the API key: citflow-ec10ca46
✔ Select apps to access with this API key: llm-api, metrics-api

Creating API key ...
✔ API key created successfully.

✔ Name: citflow-ec10ca46
✔ Apps: llm-api, metrics-api
✔ Client ID: xxx
✔ Client Secret: yyy
✔ Tenant Name: cit

You can safely leave this window now, as the client secret cached on disk automatically.
Or you can run \`citflow user apikey get\` to retrieve it later.
`,
    '$ <%= config.bin %> user apikey gen --name my-api-key --apps llm-api,metrics-api',
  ]

  static flags = {
    apps: Flags.string({
      default: [],
      description: 'Comma-separated list of app names to access with this API key.',
      multiple: true,
      options: APPS,
    }),
    name: Flags.string({
      char: 'n',
      description: 'Name of the API key.',
    }),
  }

  protected userService = new UserService({jsonEnabled: this.jsonEnabled()})

  async run(): Promise<void> {
    const {flags} = await this.parse(Gen)

    if (!flags.name) {
      flags.name = await input({
        default: `citflow-${uuid.v4().slice(0, 8)}`,
        message: 'Enter a name for the API key:',
        required: true,
      })
    }

    if (lodash.isEmpty(flags.apps)) {
      flags.apps = await checkbox({
        choices: APPS.map((app) => ({name: app, value: app})),
        message: 'Select apps to access with this API key:',
        required: true,
      })
    }

    const invalidApps = lodash.without(flags.apps, ...APPS)

    if (invalidApps.length > 0) {
      throw this.error(`Invalid app names: ${invalidApps.join(',')}`, {exit: 1})
    }

    this.log('')
    this.log('Creating API key ...')
    const apiKey = await this.userService.createApiKey(flags.name, flags.apps as AppName[])
    this.log(`${colors.green('✔')} API key created successfully.`)

    this.log('')
    this.log(`${colors.cyan('✔')} ${colors.bold('Name')}: ${colors.cyan(flags.name)}`)
    this.log(`${colors.cyan('✔')} ${colors.bold('Apps')}: ${colors.cyan(apiKey.appsToAccess.join(','))}`)
    this.log(`${colors.cyan('✔')} ${colors.bold('Client ID')}: ${colors.cyan(apiKey.clientId)}`)
    this.log(`${colors.cyan('✔')} ${colors.bold('Client Secret')}: ${colors.cyan(apiKey.clientSecret)}`)
    this.log(`${colors.cyan('✔')} ${colors.bold('Tenant Name')}: ${colors.cyan(apiKey.tenantName)}`)
    this.log('')
    this.log('You can safely leave this window now, as the client secret cached on disk automatically.')
    this.log('Or you can run `citflow user apikey get` to retrieve it later.')
  }
}
