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

import {
  AssignAgentToTenantDto,
  AssignRoleToAgentDto,
  CreateAgentDto,
  CreateRoleDto,
  CreateTenantDto,
  CreateTenantMetadataDto,
  FindValidAgentsDto,
  FindValidRolesDto,
  UnassignAgentFromTenantDto,
  UnassignRoleFromAgentDto,
  UpdateAgentDto,
  UpdateRoleDto,
  UpdateTenantDto,
  UpdateTenantMetadataDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export default class GlobalSettings<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags tenant
   * @name CreateTenantControllerCreate
   * @request POST:/global-settings/v1/tenant
   * @secure
   */
  createTenantControllerCreate = (
    data: CreateTenantDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/tenant`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tenant
   * @name UpdateTenantControllerUpdate
   * @request PATCH:/global-settings/v1/tenant
   * @secure
   */
  updateTenantControllerUpdate = (
    data: UpdateTenantDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/tenant`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tenant
   * @name FindTenants
   * @summary Find tenants
   * @request GET:/global-settings/v1/tenant
   * @secure
   */
  findTenants = (
    query?: {
      /** @example 1 */
      page?: any;
      /** @example 10 */
      limit?: any;
      /** Search like name or displayName */
      search?: any;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/tenant`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags tenant
   * @name RemoveTenantControllerRemove
   * @request DELETE:/global-settings/v1/tenant/{id}
   * @secure
   */
  removeTenantControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/global-settings/v1/tenant/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags tenant
   * @name FindTenantById
   * @summary Find tenant by id
   * @request GET:/global-settings/v1/tenant/{id}
   * @secure
   */
  findTenantById = (
    id: string,
    query?: {
      /** Projects separated by spaces (e.g., "agents agents.roles metadata") */
      project?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/global-settings/v1/tenant/${id}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags tenant
   * @name FindTenantByName
   * @summary Find tenant by name
   * @request GET:/global-settings/v1/tenant/name/{name}
   * @secure
   */
  findTenantByName = (
    name: string,
    query?: {
      /** Projects separated by spaces (e.g., "agents agents.roles metadata") */
      project?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/global-settings/v1/tenant/name/${name}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags tenant
   * @name AssignAgentToTenantControllerAssign
   * @request POST:/global-settings/v1/tenant/agent/assign
   * @secure
   */
  assignAgentToTenantControllerAssign = (
    data: AssignAgentToTenantDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/tenant/agent/assign`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tenant
   * @name UnassignAgentFromTenantControllerUnassign
   * @request DELETE:/global-settings/v1/tenant/agent/unassign
   * @secure
   */
  unassignAgentFromTenantControllerUnassign = (
    data: UnassignAgentFromTenantDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/tenant/agent/unassign`,
      method: "DELETE",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags agent
   * @name CreateAgentControllerCreate
   * @request POST:/global-settings/v1/agent
   * @secure
   */
  createAgentControllerCreate = (
    data: CreateAgentDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/agent`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags agent
   * @name FindAgents
   * @summary Find agents
   * @request GET:/global-settings/v1/agent
   * @secure
   */
  findAgents = (
    query?: {
      /** @example 1 */
      page?: any;
      /** @example 10 */
      limit?: any;
      /** Search like name, displayName or description */
      search?: any;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/agent`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags agent
   * @name RemoveAgentControllerRemove
   * @request DELETE:/global-settings/v1/agent/{id}
   * @secure
   */
  removeAgentControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/global-settings/v1/agent/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags agent
   * @name UpdateAgentControllerUpdate
   * @request PATCH:/global-settings/v1/agent/{id}
   * @secure
   */
  updateAgentControllerUpdate = (
    id: string,
    data: UpdateAgentDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/agent/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags agent
   * @name FindAgentById
   * @summary Find agent by id
   * @request GET:/global-settings/v1/agent/{id}
   * @secure
   */
  findAgentById = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/global-settings/v1/agent/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags agent
   * @name FindAgentByName
   * @summary Find agent by name
   * @request GET:/global-settings/v1/agent/name/{name}
   * @secure
   */
  findAgentByName = (name: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/global-settings/v1/agent/name/${name}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags agent
   * @name FindValidAgents
   * @summary Find valid agents
   * @request POST:/global-settings/v1/agent/validate
   * @secure
   */
  findValidAgents = (data: FindValidAgentsDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/global-settings/v1/agent/validate`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags agent
   * @name AssignRoleToAgentControllerAssign
   * @request POST:/global-settings/v1/agent/role/assign
   * @secure
   */
  assignRoleToAgentControllerAssign = (
    data: AssignRoleToAgentDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/agent/role/assign`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags agent
   * @name UnassignRoleFromAgentControllerUnassign
   * @request DELETE:/global-settings/v1/agent/role/unassign
   * @secure
   */
  unassignRoleFromAgentControllerUnassign = (
    data: UnassignRoleFromAgentDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/agent/role/unassign`,
      method: "DELETE",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags role
   * @name CreateRoleControllerCreate
   * @request POST:/global-settings/v1/role
   * @secure
   */
  createRoleControllerCreate = (
    data: CreateRoleDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/role`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags role
   * @name FindRoles
   * @summary Find roles
   * @request GET:/global-settings/v1/role
   * @secure
   */
  findRoles = (
    query?: {
      system?: boolean;
      /** @example 1 */
      page?: any;
      /** @example 10 */
      limit?: any;
      /** Search like name or displayName */
      search?: any;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/role`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags role
   * @name RemoveRoleControllerRemove
   * @request DELETE:/global-settings/v1/role/{id}
   * @secure
   */
  removeRoleControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/global-settings/v1/role/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags role
   * @name UpdateRoleControllerUpdate
   * @request PATCH:/global-settings/v1/role/{id}
   * @secure
   */
  updateRoleControllerUpdate = (
    id: string,
    data: UpdateRoleDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/role/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags role
   * @name FindRoleById
   * @summary Find role by id
   * @request GET:/global-settings/v1/role/{id}
   * @secure
   */
  findRoleById = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/global-settings/v1/role/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags role
   * @name FindRoleByName
   * @summary Find role by name
   * @request GET:/global-settings/v1/role/name/{name}
   * @secure
   */
  findRoleByName = (name: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/global-settings/v1/role/name/${name}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags role
   * @name FindValidRoles
   * @summary Find valid roles
   * @request POST:/global-settings/v1/role/validate
   * @secure
   */
  findValidRoles = (data: FindValidRolesDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/global-settings/v1/role/validate`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tenant-metadata
   * @name CreateTenantMetadataControllerCreate
   * @request POST:/global-settings/v1/tenant-metadata
   * @secure
   */
  createTenantMetadataControllerCreate = (
    data: CreateTenantMetadataDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/tenant-metadata`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tenant-metadata
   * @name FindTenantMetadata
   * @summary Find tenant-metadata
   * @request GET:/global-settings/v1/tenant-metadata
   * @secure
   */
  findTenantMetadata = (
    query?: {
      /** @example 1 */
      page?: number;
      /** @example 10 */
      limit?: number;
      autoOnboardingEnabled?: string;
      autoOnboardingAllowedDomains?: string[];
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/tenant-metadata`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags tenant-metadata
   * @name UpdateTenantMetadataControllerUpdate
   * @request PATCH:/global-settings/v1/tenant-metadata
   * @secure
   */
  updateTenantMetadataControllerUpdate = (
    data: UpdateTenantMetadataDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/tenant-metadata`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags tenant-metadata
   * @name RemoveTenantMetadataControllerRemove
   * @request DELETE:/global-settings/v1/tenant-metadata/{id}
   * @secure
   */
  removeTenantMetadataControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/tenant-metadata/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags tenant-metadata
   * @name FindTenantMetadataById
   * @summary Find tenant-metadata by id
   * @request GET:/global-settings/v1/tenant-metadata/{id}
   * @secure
   */
  findTenantMetadataById = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/global-settings/v1/tenant-metadata/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags term
   * @name FindTermVersionsByTenant
   * @summary Find term versions by tenant
   * @request GET:/global-settings/v1/term/versions
   * @secure
   */
  findTermVersionsByTenant = (
    query: {
      tenant: string;
      lastVersion?: boolean;
      onlyTenantTerm?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/global-settings/v1/term/versions`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags term
   * @name FindTermById
   * @summary Find term by id
   * @request GET:/global-settings/v1/term/{id}
   * @secure
   */
  findTermById = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/global-settings/v1/term/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags term
   * @name FindTermContentById
   * @summary Find term content by id
   * @request GET:/global-settings/v1/term/{id}/content
   * @secure
   */
  findTermContentById = (
    id: string,
    query?: {
      lang?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/global-settings/v1/term/${id}/content`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags term
   * @name FindTerms
   * @summary Find terms
   * @request GET:/global-settings/v1/term
   * @secure
   */
  findTerms = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/global-settings/v1/term`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags health
   * @name SimpleHealthCheck
   * @summary Health check that return only status OK
   * @request GET:/global-settings/v1/health
   * @secure
   */
  simpleHealthCheck = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/global-settings/v1/health`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags health
   * @name FullHealthCheck
   * @summary Health check that verify database connectivity and env vars
   * @request GET:/global-settings/v1/healthz
   * @secure
   */
  fullHealthCheck = (params: RequestParams = {}) =>
    this.request<
      {
        /** @example "ok" */
        status?: string;
        /** @example {"database":{"status":"up"}} */
        info?: Record<
          string,
          {
            status: string;
            [key: string]: any;
          }
        >;
        /** @example {} */
        error?: Record<
          string,
          {
            status: string;
            [key: string]: any;
          }
        >;
        /** @example {"database":{"status":"up"}} */
        details?: Record<
          string,
          {
            status: string;
            [key: string]: any;
          }
        >;
      },
      {
        /** @example "error" */
        status?: string;
        /** @example {"database":{"status":"up"}} */
        info?: Record<
          string,
          {
            status: string;
            [key: string]: any;
          }
        >;
        /** @example {"redis":{"status":"down","message":"Could not connect"}} */
        error?: Record<
          string,
          {
            status: string;
            [key: string]: any;
          }
        >;
        /** @example {"database":{"status":"up"},"redis":{"status":"down","message":"Could not connect"}} */
        details?: Record<
          string,
          {
            status: string;
            [key: string]: any;
          }
        >;
      }
    >({
      path: `/global-settings/v1/healthz`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
