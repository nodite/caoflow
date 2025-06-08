/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UpsertUserTenantsDto {
  /** @example "example@email.com" */
  email: string;
  /** @example {"tenantA":{"isPrincipal":true},"tenantB":{"isPrincipal":false}} */
  tenants: object;
  /** @example "uuid" */
  flowUserId: string;
}

export interface TenantDto {
  isPrincipal: boolean;
  /** @format date-time */
  updatedAt: string;
}

export interface UserTenantsDto {
  tenantName: TenantDto;
}

export interface AddTenantToUsersDto {
  tenantName: string;
  /** @default false */
  isPrincipal: boolean;
  usersEmail: string[];
}

export interface UserTenantsDataDto {
  /** @example "a2bcedf695c2aa2ffc94a1db" */
  id: string;
  /** @example "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" */
  emailHash: string;
  /** @example "c3d74b89-89cd-433d-9dd4-9bde69cd3813" */
  flowUserId: string;
  /** @example {"tenantA":{"isPrincipal":true},"tenantB":{"isPrincipal":false}} */
  tenants: object;
}

export interface UpsertUserSuperAdminDto {
  email: string;
  isSuperAdmin: boolean;
}

export interface UpdateUserEmailDto {
  /** @example "example@email.com" */
  email: string;
  /** @example "example2@email.com" */
  newEmail: string;
}

export interface UpdateUserPrincipalTenantDto {
  email: string;
  tenant: string;
}

export interface B2CUserDto {
  email: string;
}

export interface AcceptTermBody {
  /**
   * A generated state for the login flow, it's used to maintain state between each request in the authentication process.
   * @example "eyJraWQiOiJFT1haTFhPdTE4Y3dnNnhQSzQwU21PeG81b09velBVdHpwU3JVM0xWQ3BRIiwidmVyIjoiMS4wIiwiemlwIjoiRGVmbGF0ZSIsInNlciI6IjEuMCJ9.pThk2ZMr_KXt7zq3BkzLJQ_Z_4JK7Rbc6x0Qt83e9ZZd9wjVsoB2V5RCsfwz6lR6-z"
   */
  state: string;
}

export interface ValidateTokenBody {
  /** JWT to validate */
  token: string;
  /** Refresh token */
  refreshToken: string;
}

export interface ValidateTokenResult {
  /** JWT to validate */
  token: string;
  /** Refresh token */
  refreshToken: string;
  /** Indicates if the token was refreshed */
  refreshed: boolean;
}

export interface ConsumeSingleUseCodeResult {
  /**
   * The UUID of the consumed single use code, confirming the code has been successfully used.
   * @example "123e456-1234-12d3-a456-426614174000"
   */
  code: string;
  /** The payload or content associated with the consumed code, which may vary depending on the use case or application logic. */
  content: object;
}

export interface VerifySignatureBody {
  /** The state signed via signature/create endpoint */
  state: string;
}

export interface VerifySignatureResult {
  /**
   * The tenant unique name
   * @example "cit-dev"
   */
  tenant: string;
  /**
   * The original channel name
   * @example "vscode"
   */
  channel: string;
  /**
   * The abitrary generated code which will be associated with the auth flow
   * @example "aaf4c61d-d82d-4d9d-8c27-3d4d8c3d4d8c"
   */
  code: string;
  /**
   * The redirect uri to be used in the auth flow
   * @example "https://localhost:3000/auth/callback"
   */
  redirectUri: string;
  /**
   * The tenant display name
   * @example "CI&T Dev"
   */
  tenantDisplayName: string;
  /**
   * The policy name
   * @example "B2C_policy"
   */
  policyName: string;
}

export interface CreateTokenBody {
  /** The OAuth grant code */
  code: string;
  /** The state parameter */
  state: string;
}

export interface RestoreTokenBody {
  /** The current JWT */
  token: string;
  /** The current refresh token */
  refreshToken: string;
  /** The state parameter */
  state: string;
}

export interface CreateSignatureBody {
  /**
   * The tenant unique name
   * @example "cit-dev"
   */
  tenant: string;
  /**
   * The original channel name
   * @example "vscode"
   */
  channel: string;
  /**
   * The abitrary generated code which will be associated with the auth flow
   * @example "aaf4c61d-d82d-4d9d-8c27-3d4d8c3d4d8c"
   */
  code: string;
  /**
   * The redirect uri to be used in the auth flow
   * @example "https://localhost:3000/auth/callback"
   */
  redirectUri: string;
}

export interface CreateSignatureResult {
  /**
   * A base64 string holding the content and the signature itself
   * @example "dnNjb2RlOmFhZjRjNjFkLWQ4MmQtNGQ5ZC04YzI3LTNkNGQ4YzNkNGQ4YzpjaXQtZGV2Omh0dHBzJTNBJTJGJTJGbG9jYWxob3N0JTNBMzAwMCUyRmF1dGglMkZjYWxsYmFjazoxNzA4NTA2NDU5Mjc2OjlhZWExN2RkOTkyMjk0ZDdhMmY0NWRiY2QyNzcxZDkxNzI3ZjJmNmNkNzBjYjk5NzIyZGI0YWI5MWI5NzM4MDg="
   */
  content: string;
}

export interface GeneratePolicyUrlForTenantDto {
  /**
   * A generated state for the login flow, it's used to maintain state between each request in the authentication process.
   * @example "eyJraWQiOiJFT1haTFhPdTE4Y3dnNnhQSzQwU21PeG81b09velBVdHpwU3JVM0xWQ3BRIiwidmVyIjoiMS4wIiwiemlwIjoiRGVmbGF0ZSIsInNlciI6IjEuMCJ9.pThk2ZMr_KXt7zq3BkzLJQ_Z_4JK7Rbc6x0Qt83e9ZZd9wjVsoB2V5RCsfwz6lR6-z"
   */
  state: string;
  /**
   * The name of the tenant for which the policy URL is to be generated. This specifies the context in which the user is authenticating.
   * @example "cit-dev"
   */
  tenant: string;
}

export interface GeneratePrincipalPolicyUrlDto {
  /**
   * The email address of the user for whom the policy URL is being generated. Must be a valid email format.
   * @example "erikt@ciandt.com"
   */
  email: string;
  /**
   * An UUID code that will be used to store auth states further in the authentication flow.
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  code: string;
  /**
   * The channel through which the request is made, affecting the resulting URL.
   * @example "vscode"
   */
  channel: string;
  /**
   * The redirect URI to which a user will be redirected after the authentication is completed.
   * @example "https://example.com/callback"
   */
  redirectUri: string;
}
