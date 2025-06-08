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
  AddRoleToUserDto,
  ApiKeyDto,
  AppUserDto,
  CreateApiKeyDto,
  CreateFlowMemoryDto,
  CreateGroupDto,
  CreateUserDto,
  FlowMemoryDto,
  GetUserGroupsResponse,
  GetUserRoleResponse,
  GroupResponse,
  GroupResponsePaginated,
  PaginatedResponseDto,
  TermVersionsDto,
  UpdateGroupDto,
  UpdateUserDto,
  UpdateUserEmailDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export default class UserApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags user
   * @name CreateUser
   * @summary Create user
   * @request POST:/user-api/v1/user
   * @secure
   */
  createUser = (data: CreateUserDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/user-api/v1/user`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name FindAllUsers
   * @summary Find all users
   * @request GET:/user-api/v1/user
   * @secure
   */
  findAllUsers = (
    query?: {
      /** @example 1 */
      page?: any;
      /** @example 10 */
      limit?: any;
      /** Search like name, lastName, email, externalRefId or flowUserId */
      search?: any;
      /**
       * Fields to project
       * @example "name lastName email"
       */
      project?: any;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PaginatedResponseDto & {
        items?: AppUserDto[];
      },
      any
    >({
      path: `/user-api/v1/user`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name FindUserByEmail
   * @summary Find user by email
   * @request GET:/user-api/v1/user/email
   * @secure
   */
  findUserByEmail = (
    query: {
      address: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<any, void>({
      path: `/user-api/v1/user/email`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name UpdateUserEmail
   * @summary Update user email
   * @request PATCH:/user-api/v1/user/email
   * @secure
   */
  updateUserEmail = (data: UpdateUserEmailDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user-api/v1/user/email`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name FindUserById
   * @summary Find user by id or flowUserId
   * @request GET:/user-api/v1/user/{id}
   * @secure
   */
  findUserById = (id: string, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/user-api/v1/user/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name RemoveUser
   * @summary Remove user by id or flowUserId
   * @request DELETE:/user-api/v1/user/{id}
   * @secure
   */
  removeUser = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/user-api/v1/user/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name UpdateUser
   * @summary Update user by id or flowUserId
   * @request PATCH:/user-api/v1/user/{id}
   * @secure
   */
  updateUser = (id: string, data: UpdateUserDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user-api/v1/user/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name RemoveRole
   * @summary Remove role by id or flowUserId
   * @request DELETE:/user-api/v1/user/{id}/role/{roleId}
   * @secure
   */
  removeRole = (id: string, roleId: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/user-api/v1/user/${id}/role/${roleId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name FindUserRoleById
   * @summary Find user role by id or flowUserId
   * @request GET:/user-api/v1/user/{id}/role
   * @secure
   */
  findUserRoleById = (id: string, params: RequestParams = {}) =>
    this.request<GetUserRoleResponse, void>({
      path: `/user-api/v1/user/${id}/role`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name AddRoleToUser
   * @summary Add role to user by id or flowUserId
   * @request POST:/user-api/v1/user/{id}/role
   * @secure
   */
  addRoleToUser = (
    id: string,
    data: AddRoleToUserDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/user-api/v1/user/${id}/role`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name FindAllUserGroups
   * @summary Find all user groups by id or flowUserId
   * @request GET:/user-api/v1/user/{id}/groups
   * @secure
   */
  findAllUserGroups = (id: string, params: RequestParams = {}) =>
    this.request<GetUserGroupsResponse[], any>({
      path: `/user-api/v1/user/${id}/groups`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags role
   * @name FindMembersOfRole
   * @summary Find members of role
   * @request GET:/user-api/v1/role/{id}/memberOf
   * @secure
   */
  findMembersOfRole = (
    id: string,
    query?: {
      /** @example 1 */
      page?: any;
      /** @example 10 */
      limit?: any;
      /** Search like name, lastName, email, externalRefId or flowUserId */
      search?: any;
      /**
       * Fields to project
       * @example "name lastName email"
       */
      project?: any;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PaginatedResponseDto & {
        items?: AppUserDto[];
      },
      void
    >({
      path: `/user-api/v1/role/${id}/memberOf`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name ValidateUserGroup
   * @summary Validate user group by id or flowUserId
   * @request GET:/user-api/v1/user/{id}/group/{groupId}/validate
   * @secure
   */
  validateUserGroup = (
    id: string,
    groupId: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/user-api/v1/user/${id}/group/${groupId}/validate`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags agent
   * @name RemoveMembersOfAgent
   * @summary Remove members of agent
   * @request DELETE:/user-api/v1/agent/{id}/memberOf
   * @secure
   */
  removeMembersOfAgent = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/user-api/v1/agent/${id}/memberOf`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags group
   * @name CreateGroup
   * @summary Create group
   * @request POST:/user-api/v1/group
   * @secure
   */
  createGroup = (data: CreateGroupDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/user-api/v1/group`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags group
   * @name FindAllGroups
   * @summary Find all groups
   * @request GET:/user-api/v1/group
   * @secure
   */
  findAllGroups = (
    query?: {
      /** @example "true" */
      active?: any;
      /** Array of ids (comma separated) */
      ids?: any;
      /** Search by name */
      search?: any;
      /** @example 10 */
      limit?: any;
      /** @example 1 */
      page?: any;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PaginatedResponseDto & {
        items?: GroupResponsePaginated[];
      },
      any
    >({
      path: `/user-api/v1/group`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags group
   * @name UpdateGroup
   * @summary Update group
   * @request PATCH:/user-api/v1/group/{id}
   * @secure
   */
  updateGroup = (
    id: string,
    data: UpdateGroupDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/user-api/v1/group/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags group
   * @name FindAGroup
   * @summary Find a group
   * @request GET:/user-api/v1/group/{id}
   * @secure
   */
  findAGroup = (id: string, params: RequestParams = {}) =>
    this.request<GroupResponse, any>({
      path: `/user-api/v1/group/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags group
   * @name DeleteGroup
   * @summary Delete group
   * @request DELETE:/user-api/v1/group/{id}
   * @secure
   */
  deleteGroup = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user-api/v1/group/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags api-key
   * @name CreateApiKey
   * @summary Create api-key
   * @request POST:/user-api/v1/api-key
   * @secure
   */
  createApiKey = (data: CreateApiKeyDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user-api/v1/api-key`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags api-key
   * @name GetApiKeys
   * @summary Get user's api keys
   * @request GET:/user-api/v1/api-key
   * @secure
   */
  getApiKeys = (
    query?: {
      active?: string;
      /** @example 1 */
      page?: any;
      /** @example 10 */
      limit?: any;
      /** Search like name or client id */
      search?: any;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PaginatedResponseDto & {
        items?: ApiKeyDto[];
      },
      void
    >({
      path: `/user-api/v1/api-key`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags api-key
   * @name GetUserByClientId
   * @summary Get user data by client id
   * @request GET:/user-api/v1/api-key/{clientId}
   * @secure
   */
  getUserByClientId = (clientId: string, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/user-api/v1/api-key/${clientId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags api-key
   * @name DeleteApiKey
   * @summary Delete api-key
   * @request DELETE:/user-api/v1/api-key/{id}
   * @secure
   */
  deleteApiKey = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user-api/v1/api-key/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags terms
   * @name GetUserTerms
   * @summary Get terms not accepted for user
   * @request GET:/user-api/v1/user/term/available
   * @secure
   */
  getUserTerms = (params: RequestParams = {}) =>
    this.request<TermVersionsDto[], void>({
      path: `/user-api/v1/user/term/available`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags terms
   * @name AcceptTerm
   * @summary Accept term
   * @request POST:/user-api/v1/user/term/{termId}/accept
   * @secure
   */
  acceptTerm = (termId: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/user-api/v1/user/term/${termId}/accept`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags health
   * @name SimpleHealthCheck
   * @summary Health check that return only status OK
   * @request GET:/user-api/v1/health
   * @secure
   */
  simpleHealthCheck = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user-api/v1/health`,
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
   * @request GET:/user-api/v1/healthz
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
      path: `/user-api/v1/healthz`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags agents-management
   * @name GetAgentsManagement
   * @summary Get agents management
   * @request GET:/user-api/v1/agents-management
   * @secure
   */
  getAgentsManagement = (
    query?: {
      search?: "prompt" | "dashboard" | "plugin";
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/user-api/v1/agents-management`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags memory
   * @name CreateMemory
   * @summary Create a memory for an user
   * @request POST:/user-api/v1/memory
   * @secure
   */
  createMemory = (data: CreateFlowMemoryDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user-api/v1/memory`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags memory
   * @name GetMemory
   * @summary Retrieve a user's memory
   * @request GET:/user-api/v1/memory
   * @secure
   */
  getMemory = (
    query: {
      subDomain: string;
      ownerId: string;
      identifier: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/user-api/v1/memory`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags memory
   * @name DisableMemory
   * @summary Disable a user's memory
   * @request PATCH:/user-api/v1/memory
   * @secure
   */
  disableMemory = (data: FlowMemoryDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/user-api/v1/memory`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags memory
   * @name SearchMemories
   * @summary Search for user memories
   * @request GET:/user-api/v1/memory/search
   * @secure
   */
  searchMemories = (
    query: {
      subDomain: string;
      ownerId: string;
      identifier?: string;
      /** @default "1" */
      pageNumber?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/user-api/v1/memory/search`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ACU
   * @name SyncAcuEvents
   * @summary Sync ACU events with databricks
   * @request POST:/user-api/v1/acu-events/sync
   * @secure
   */
  syncAcuEvents = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user-api/v1/acu-events/sync`,
      method: "POST",
      secure: true,
      ...params,
    });
}
