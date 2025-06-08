import type {ValidateTokenResult} from '@components/openapi/login-service/data-contracts'

export interface CreateTokenResult {
  isTermAccepted: boolean
  oAuthCode: string
  refreshToken: string
  tenants: Array<{
    displayName: string
    isActive: boolean
    isPrincipal: boolean
    name: string
  }>
  token: string
}

export interface GeneratePolicyUrlForTenantResult {
  url: string
}

export type TokenResult = CreateTokenResult & ValidateTokenResult

export type UserTenantsResult = Record<string, {isPrincipal: boolean; updatedAt: string}>
