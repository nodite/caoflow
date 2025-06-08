import {AuthMeta} from '@@types/services/flow/llm'
import BaseCommand from '@abstracts/base'
import {confirm, input, password} from '@inquirer/prompts'
import {Flags} from '@oclif/core'
import LlmService from '@services/flow/llm'
import colors from 'ansi-colors'
import lodash from 'lodash'

export default class Set extends BaseCommand {
  static description = 'Set LLM auth metadata.'

  static examples = [
    `$ <%= config.bin %> llm auth set --name <name>
✔ Name: <name>
✔ Client ID: <client-id>
✔ Tenant: <tenant>
✔ Client Secret: <client-secret>

LLM auth metadata <name> has been set successfully.
`,
  ]

  static flags = {
    agent: Flags.string({
      default: 'simple_agent',
      description: 'Agent for the LLM auth metadata.',
    }),
    'client-id': Flags.string({
      description: 'Client ID for the LLM auth metadata.',
    }),
    'client-secret': Flags.string({
      description: 'Client secret for the LLM auth metadata.',
    }),
    force: Flags.boolean({
      char: 'f',
      default: false,
      description: 'Force set without confirmation if no related LLM auth metadata found online.',
    }),
    name: Flags.string({
      description: 'Name of the LLM auth metadata to set.',
      required: true,
    }),
    tenant: Flags.string({
      description: 'Tenant for the LLM auth metadata.',
    }),
  }

  protected llmService = new LlmService({jsonEnabled: this.jsonEnabled()})

  async run(): Promise<void> {
    const {flags} = await this.parse(Set)

    this.log(`${colors.green('✔')} ${colors.bold('Name')}: ${colors.cyan(flags.name)}`)

    if (flags['client-id']) {
      this.log(`${colors.green('✔')} ${colors.bold('Client ID')}: ${colors.cyan(flags['client-id'])}`)
    } else {
      flags['client-id'] = await input({message: 'Client ID:', required: true})
    }

    // check exists.
    const existAuthMeta = await this.llmService.getAuthMeta(flags['client-id']).catch(() => ({}) as AuthMeta)

    if (lodash.isEmpty(existAuthMeta)) {
      flags.force = true
    } else if (!flags.force) {
      this.warn(`LLM auth metadata with client id ${colors.cyan(flags['client-id'])} already exists.`)

      flags.force = await confirm({
        default: false,
        message: 'Do you want to overwrite it? (yes/no)',
      })
    }

    if (!flags.force) {
      throw this.error('Operation cancelled.', {exit: 1})
    }

    if (!lodash.isEmpty(existAuthMeta)) {
      this.warn('Forcing overwrite of existing LLM auth metadata.')
    }

    if (flags.tenant) {
      this.log(`${colors.green('✔')} ${colors.bold('Tenant')}: ${colors.cyan(flags.tenant)}`)
    } else {
      flags.tenant = await input({
        default: existAuthMeta.tenant || undefined,
        message: 'Tenant:',
        required: true,
      })
    }

    if (flags['client-secret']) {
      this.log(`${colors.green('✔')} ${colors.bold('Client Secret')}: ${colors.cyan('******')}`)
    } else {
      flags['client-secret'] = await password({mask: true, message: 'Client Secret:'})
    }

    await this.llmService.setAuthMeta({
      agent: flags.agent,
      appToAccess: 'llm-api',
      clientId: flags['client-id'],
      clientSecret: flags['client-secret'],
      name: flags.name,
      tenant: flags.tenant,
    })

    this.log('')
    this.log(`LLM auth metadata ${colors.cyan(flags.name)} has been set successfully.`)
  }
}
