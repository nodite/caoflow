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

export interface ExchangeCodeDto {
  code: string;
  policy: string;
}

export interface AadTokenResponseDto {
  access_token: string;
  id_token: string;
  token_type: string;
  not_before: number;
  expires_in: number;
  expires_on: number;
  resource: string;
  refresh_token: string;
  scope: string;
  refresh_token_expires_in: number;
  profile_info: string;
  id_token_expires_in: number;
}

export interface GetTokenByRefreshDto {
  refresh: string;
  policy: string;
}

export interface UpsertInfoCodeDto {
  content: object;
  code?: string;
  /** @example "2024-02-09T13:45:50.852Z" */
  expiresIn?: string;
}

export interface InfoCodeDto {
  code: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface InfoCodeContentDto {
  content: object;
}

export interface AppUserRoleDto {
  id: string;
  roleId: string;
  roleName: string;
  /** @format date-time */
  createdAt: string;
}

export interface AppUserAgentDto {
  id: string;
  agentId: string;
  agentName: string;
  /** @format date-time */
  createdAt: string;
  roles: AppUserRoleDto[];
}

export interface AccessUserDto {
  id: string;
  name: string;
  lastName: string;
  email: string;
  /** @format date-time */
  createdAt: string;
  externalRefId: string;
  active?: boolean;
  agents: AppUserAgentDto[];
  roles: AppUserRoleDto[];
  flowUserId: string;
  /** @example "backlogrefiner.user,chatwithdocs.admin" */
  roleNamesAsText: string;
}

export interface AccessUserV2Dto {
  name: string;
  email: string;
  flowUserId: string;
  /** @example "backlogrefiner.user,chatwithdocs.admin" */
  roleNamesAsText: string;
  infraTenant: string;
}

export interface GenerateTokenDto {
  clientId: string;
  clientSecret: string;
  appToAccess: string;
}

export interface TokenDto {
  access_token: string;
  expires_in: number;
}
