import type {generateApi} from 'swagger-typescript-api'

export const SERVICES = ['global-settings', 'user-api', 'login-service', 'knowledge-api', 'auth-engine-api'] as const

export type ServiceName = (typeof SERVICES)[number]

export type GenerateApiConfiguration = Awaited<ReturnType<typeof generateApi>>['configuration']['config']
