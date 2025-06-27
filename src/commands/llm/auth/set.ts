import type {LlmAuth, LlmAuthMeta} from '@@types/services/flow/llm'

import {DefaultAuthMeta, FlowAuthMeta, LlmAuths, LlmVendors} from '@@types/services/flow/llm'
import BaseCommand from '@abstracts/base'
import {confirm, input, password, select} from '@inquirer/prompts'
import {Flags} from '@oclif/core'
import LlmService from '@services/flow/llm'
import colors from 'ansi-colors'
import JSON from 'json5'
import lodash from 'lodash'
import * as uuid from 'uuid'

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
    'auth-type': Flags.string({
      aliases: ['type'],
      description: 'Type of the LLM auth metadata to set.',
      options: LlmAuths,
      required: true,
    }),
    'default-auth-meta': Flags.string({
      description: `Json string of default auth meta, e.g. '${JSON.stringify(DefaultAuthMeta.create({}))}'.`,
      required: false,
    }),
    'flow-auth-meta': Flags.string({
      description: `Json string of flow auth meta, e.g. '${JSON.stringify(FlowAuthMeta.create({}))}'.`,
      required: false,
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
  }

  protected llmService = new LlmService({jsonEnabled: this.jsonEnabled()})

  async run(): Promise<void> {
    const {flags} = await this.parse(Set)

    let authMeta: LlmAuthMeta | undefined

    this.log(`${colors.green('✔')} ${colors.bold('Name')}: ${colors.cyan(flags.name)}`)

    const authType = flags['auth-type'] as LlmAuth

    if (authType === 'default') {
      authMeta = await this.genDefaultAuthMeta(flags)
    } else if (authType === 'flow') {
      authMeta = await this.genFlowAuthMeta(flags)
    } else {
      throw this.error('The --auth-type flag must be provided with a valid value.', {exit: 1})
    }

    authMeta = authMeta.copy({name: flags.name})

    await this.llmService.setAuthMeta(authMeta)

    this.log('')
    this.log(`LLM auth metadata ${colors.cyan(flags.name)} has been set successfully.`)
  }

  protected async genDefaultAuthMeta(flags: any): Promise<DefaultAuthMeta> {
    let parsedMeta = {}

    if (flags['default-auth-meta']) {
      try {
        parsedMeta = JSON.parse(flags['default-auth-meta'])
      } catch (error: any) {
        throw this.error(error, {exit: 1})
      }
    }

    let authMeta = DefaultAuthMeta.create(parsedMeta)

    if (authMeta.vendor) {
      this.log(`${colors.green('✔')} ${colors.bold('Vendor')}: ${colors.cyan(authMeta.vendor)}`)
    } else {
      authMeta = authMeta.copy({
        vendor: await select({
          choices: lodash.map(LlmVendors, (vendor) => ({name: vendor, value: vendor})),
          message: 'LLM Vendor:',
        }),
      })
    }

    if (authMeta.apiKey) {
      this.log(`${colors.green('✔')} ${colors.bold('API Key')}: ${colors.cyan('******')}`)
    } else {
      authMeta = authMeta.copy({
        apiKey: await password({mask: true, message: 'API Key:'}),
      })
    }

    authMeta = authMeta.copy({
      clientId: uuid.v5(authMeta.apiKey!, uuid.NIL),
    })

    this.log(`${colors.green('✔')} ${colors.bold('Client ID')}: ${colors.cyan(authMeta.clientId!)} (Auto)`)

    return authMeta
  }

  protected async genFlowAuthMeta(flags: any): Promise<FlowAuthMeta> {
    let parsedMeta = {}

    if (flags['flow-auth-meta']) {
      try {
        parsedMeta = JSON.parse(flags['flow-auth-meta'])
      } catch (error: any) {
        throw this.error(error, {exit: 1})
      }
    }

    let authMeta = FlowAuthMeta.create(parsedMeta)

    if (authMeta.clientId) {
      this.log(`${colors.green('✔')} ${colors.bold('Client ID')}: ${colors.cyan(authMeta.clientId)}`)
    } else {
      authMeta = authMeta.copy({
        clientId: await input({message: 'Client ID:', required: true}),
      })
    }

    // check exists.
    const existAuthMeta = await this.llmService.getAuthMeta(authMeta.clientId!).catch(() => FlowAuthMeta.create({}))

    if (!lodash.isEmpty(existAuthMeta) && !flags.force) {
      this.warn(`LLM auth metadata with client id ${colors.cyan(authMeta.clientId!)} already exists.`)

      flags.force = await confirm({
        default: false,
        message: 'Do you want to overwrite it? (yes/no)',
      })

      if (!flags.force) {
        throw this.error('Operation cancelled.', {exit: 1})
      }
    }

    if (!lodash.isEmpty(existAuthMeta)) {
      this.warn('Forcing overwrite of existing LLM auth metadata.')
    }

    if (authMeta.clientSecret) {
      this.log(`${colors.green('✔')} ${colors.bold('Client Secret')}: ${colors.cyan('******')}`)
    } else {
      authMeta = authMeta.copy({
        clientSecret: await password({mask: true, message: 'Client Secret:'}),
      })
    }

    if (authMeta.tenant) {
      this.log(`${colors.green('✔')} ${colors.bold('Tenant')}: ${colors.cyan(authMeta.tenant)}`)
    } else {
      authMeta = authMeta.copy({
        tenant: await input({
          default: lodash.get(existAuthMeta, 'tenant'),
          message: 'Tenant:',
          required: true,
        }),
      })
    }

    if (authMeta.agent) {
      this.log(`${colors.green('✔')} ${colors.bold('Agent')}: ${colors.cyan(authMeta.agent)}`)
    } else {
      authMeta = authMeta.copy({
        agent: await input({
          default: lodash.get(existAuthMeta, 'agent', 'simple_agent'),
          message: 'Agent:',
          required: true,
        }),
      })
    }

    return authMeta
  }
}
