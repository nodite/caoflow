import {FlowAuthMeta} from '@@types/services/flow/llm'
import BaseCommand from '@abstracts/base'
import {Flags} from '@oclif/core'
import LlmService from '@services/flow/llm'
import UserService from '@services/flow/user'
import colors from 'ansi-colors'

export default class Sync extends BaseCommand {
  static description = 'Sync LLM auth metadata from user apikey.'

  static examples = ['$ <%= config.bin %> llm auth sync']

  static flags = {
    force: Flags.boolean({
      char: 'f',
      default: false,
      description: 'Force sync without confirmation.',
    }),
  }

  protected llmService = new LlmService({jsonEnabled: this.jsonEnabled()})

  protected userService = new UserService({jsonEnabled: this.jsonEnabled()})

  async run(): Promise<void> {
    const {flags} = await this.parse(Sync)

    const apiKeys = await this.userService.listApiKeys()

    for (const apiKey of apiKeys) {
      this.log('')
      this.log('-----------------------------------')
      this.log(`Syncing API key ${colors.cyan(apiKey.name)} (${colors.cyan(apiKey.clientId.slice(0, 8) + '...')})...`)
      this.log('')

      if (apiKey.dangling) {
        this.warn(`API key is dangling. Skipping...`)
        continue
      }

      if (!apiKey.appsToAccess.includes('llm-api')) {
        this.warn(`API key does not have access to llm-api. Skipping...`)
        continue
      }

      const clientSecret = await this.userService.getClientSecret(apiKey.clientId)

      if (!clientSecret) {
        this.warn(`Client secret not found for API key ${colors.cyan(apiKey.name)}. Skipping...`)
        continue
      }

      const authMeta = FlowAuthMeta.create({
        agent: 'simple_agent',
        appToAccess: 'llm-api',
        clientId: apiKey.clientId,
        clientSecret,
        name: apiKey.name,
        tenant: await this.userService.getPrincipalTenant(),
      })

      if (!authMeta.clientSecret) {
        this.log(`Client secret not found. Skipping...`)
        continue
      }

      await this.config.runCommand('llm:auth:set', [
        '--name',
        apiKey.name,
        '--flow',
        '--flow-auth-meta',
        JSON.stringify(authMeta),
        ...(flags.force ? ['--force'] : []),
      ])

      this.log('')
      this.log(
        `Sync completed for API key ${colors.cyan(apiKey.name)} (${colors.cyan(apiKey.clientId.slice(0, 8) + '...')})`,
      )
    }
  }
}
