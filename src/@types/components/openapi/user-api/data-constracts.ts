import type {ApiKeyDto as _ApiKeyDto} from '@components/openapi/user-api/data-contracts'

export const APPS = ['llm-api', 'metrics-api', 'agent-runner-api'] as const

export type AppName = (typeof APPS)[number]

export type CreateApiKeyResult = {
  appsToAccess: AppName[]
  clientId: string
  clientSecret: string
  tenantName: string
}

export type User = {
  appid: string
  appsToAccess: AppName[]
  email: string
  idp: string
  infraTenant: string
  name: string
  roles: string
  sub: string
  tenant: string
}

export type ApiKeyDto = _ApiKeyDto & {
  dangling?: boolean
}
