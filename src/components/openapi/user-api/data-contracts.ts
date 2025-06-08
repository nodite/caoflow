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

export interface CreateUserRoleDto {
  roleId: string;
  roleName: string;
}

export interface CreateUserAgentDto {
  agentId: string;
  agentName: string;
  roles: CreateUserRoleDto[];
}

export interface AppUserMetadataOnboardingDto {
  enabled: boolean;
  interests: string[];
}

export interface AppUserMetadataTourDto {
  enabled: boolean;
}

export interface AppUserMetadataExternalDto {
  id: string;
}

export interface AppUserMetadataDto {
  onboarding: AppUserMetadataOnboardingDto;
  tour: AppUserMetadataTourDto;
  external: AppUserMetadataExternalDto;
}

export interface CreateUserDto {
  name?: string;
  lastName?: string;
  email: string;
  externalRefId?: string;
  active?: boolean;
  agents: CreateUserAgentDto[];
  roles: CreateUserRoleDto[];
  metadata: AppUserMetadataDto;
  flowUserId?: string;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedResponseDto {
  meta: PaginationMeta;
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

export interface AppUserDto {
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
}

export interface GetUserRoleResponse {
  roles: string[];
  agents: string[];
}

export interface UpdateUserEmailDto {
  /** @example "example@email.com" */
  email: string;
  /** @example "example2@email.com" */
  newEmail: string;
}

export interface UpdateUserDto {
  name: string;
  lastName: string;
  active?: boolean;
  agents: CreateUserAgentDto[];
  roles: CreateUserRoleDto[];
  metadata: AppUserMetadataDto;
  externalRefId?: string;
}

export interface GetUserGroupsResponse {
  _id: string;
  name: string;
}

export interface AddRoleToUserDto {
  roles: string[];
}

export interface Member {
  email: string;
  name: string;
}

export interface CreateGroupDto {
  name: string;
  members: Member[];
}

export interface UpdateGroupDto {
  name: string;
  members: Member[];
  active: boolean;
}

export interface GroupResponsePaginated {
  _id: string;
  name: string;
  totalMembers: number;
}

export interface GroupResponse {
  _id: string;
  name: string;
  members: Member[];
  active: boolean;
}

export interface CreateApiKeyDto {
  name: string;
  appsToAccess: string[];
}

export interface ApiKeyDto {
  id: string;
  userId: string;
  name: string;
  appsToAccess: string[];
  clientId: string;
  secretHint: string;
  active: boolean;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  expiresIn: string;
}

export interface TermVersionsDto {
  id: string;
  name: string;
  version: string;
  languages: string[];
  tenant: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export type CreateFlowMemoryDto = object;

export interface FlowMemoryDto {
  subDomain: string;
  ownerId: string;
  identifier: string;
}
