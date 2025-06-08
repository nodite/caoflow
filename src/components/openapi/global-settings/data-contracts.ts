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

export type CreateTenantDto = object;

export type UpdateTenantDto = object;

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

export type TenantDto = object;

export type AssignAgentToTenantDto = object;

export type UnassignAgentFromTenantDto = object;

export type CreateAgentDto = object;

export type UpdateAgentDto = object;

export interface FindValidAgentsDto {
  agentIds: string[];
}

export type AgentDto = object;

export type AssignRoleToAgentDto = object;

export type UnassignRoleFromAgentDto = object;

export type CreateRoleDto = object;

export type UpdateRoleDto = object;

export interface FindValidRolesDto {
  roleIds: string[];
}

export type RoleDto = object;

export type CreateTenantMetadataDto = object;

export type TenantMetadataDto = object;

export type UpdateTenantMetadataDto = object;
