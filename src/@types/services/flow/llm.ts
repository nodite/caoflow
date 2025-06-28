import {FLOW_BASE_URL} from '@env'
import {Data} from 'dataclass'

export const LlmAuths = ['default', 'flow'] as const

export type LlmAuth = (typeof LlmAuths)[number]

export const LlmVendors = ['google-gemini', 'azure-openai', 'azure-foundry', 'amazon-bedrock'] as const

export type LlmVendor = (typeof LlmVendors)[number]

export type LlmAuthMeta = DefaultAuthMeta | FlowAuthMeta

class BaseAuthMeta extends Data {
  clientId!: string

  name!: string

  type!: LlmAuth

  host(): string {
    throw new Error('Not implemented')
  }
}

export class FlowAuthMeta extends BaseAuthMeta {
  agent?: string

  appToAccess?: 'llm-api'

  clientSecret?: string

  tenant?: string

  type: LlmAuth = 'flow'

  host(): string {
    if (!FLOW_BASE_URL) throw new Error('FLOW_BASE_URL is not set')
    return FLOW_BASE_URL
  }
}

export class DefaultAuthMeta extends BaseAuthMeta {
  apiKey?: string

  type: LlmAuth = 'default'

  vendor?: LlmVendor

  host(): string {
    if (this.vendor === 'google-gemini') return 'https://generativelanguage.googleapis.com'
    if (this.vendor === 'azure-openai') return 'https://api.openai.com'
    if (this.vendor === 'azure-foundry') throw new Error('Not implemented yet for Azure Foundry')
    if (this.vendor === 'amazon-bedrock') throw new Error('Not implemented yet for Amazon Bedrock')
    throw new Error('Not implemented yet for ' + this.vendor)
  }
}
