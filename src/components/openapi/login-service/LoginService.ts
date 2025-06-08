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
  AcceptTermBody,
  AddTenantToUsersDto,
  B2CUserDto,
  ConsumeSingleUseCodeResult,
  CreateSignatureBody,
  CreateSignatureResult,
  CreateTokenBody,
  GeneratePolicyUrlForTenantDto,
  GeneratePrincipalPolicyUrlDto,
  RestoreTokenBody,
  UpdateUserEmailDto,
  UpdateUserPrincipalTenantDto,
  UpsertUserSuperAdminDto,
  UpsertUserTenantsDto,
  UserTenantsDataDto,
  UserTenantsDto,
  ValidateTokenBody,
  ValidateTokenResult,
  VerifySignatureBody,
  VerifySignatureResult,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export default class LoginService<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Health
   * @name SimpleHealthCheck
   * @summary Health check that return only status OK
   * @request GET:/login-service/v1/health
   */
  simpleHealthCheck = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/login-service/v1/health`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Health
   * @name FullHealthCheck
   * @summary Health check that verify database connectivity and env vars
   * @request GET:/login-service/v1/healthz
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
      path: `/login-service/v1/healthz`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags User's Tenants
   * @name UpsertTenant
   * @summary Create/update user tenants
   * @request PATCH:/login-service/v1/tenant
   */
  upsertTenant = (data: UpsertUserTenantsDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/login-service/v1/tenant`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags User's Tenants
   * @name GetUserTenants
   * @summary Get user tenants by email
   * @request GET:/login-service/v1/tenants
   */
  getUserTenants = (
    query: {
      /** @default false */
      principal?: string;
      email: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<UserTenantsDto, void>({
      path: `/login-service/v1/tenants`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags User's Tenants
   * @name TenantUsers
   * @summary Return users from specific tenant.
   * @request GET:/login-service/v1/tenant/{tenant}/users
   */
  tenantUsers = (tenant: string, params: RequestParams = {}) =>
    this.request<
      {
        data?: string[];
      },
      void
    >({
      path: `/login-service/v1/tenant/${tenant}/users`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags User's Tenants
   * @name AddTenantToUsers
   * @summary Add tenant to users
   * @request POST:/login-service/v1/tenant/users
   */
  addTenantToUsers = (data: AddTenantToUsersDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/login-service/v1/tenant/users`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags User's Tenants
   * @name GetUserTenantsData
   * @summary Get user tenants data by email.
   * @request GET:/login-service/v1/tenants/data
   */
  getUserTenantsData = (
    query: {
      email: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<UserTenantsDataDto, void>({
      path: `/login-service/v1/tenants/data`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UpsertUserSuperAdmin
   * @summary Upsert user super-admin
   * @request PATCH:/login-service/v1/user
   */
  upsertUserSuperAdmin = (
    data: UpsertUserSuperAdminDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/login-service/v1/user`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UpdateUserEmail
   * @summary Update user email
   * @request PATCH:/login-service/v1/user/email
   */
  updateUserEmail = (data: UpdateUserEmailDto, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/login-service/v1/user/email`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags User's Tenants
   * @name UpdateUserPrincipalTenant
   * @summary Update user principal tenant
   * @request PATCH:/login-service/v1/tenant/principal
   */
  updateUserPrincipalTenant = (
    data: UpdateUserPrincipalTenantDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/login-service/v1/tenant/principal`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags B2C User
   * @name B2CUserDelete
   * @summary Delete b2c user by id
   * @request DELETE:/login-service/v1/b2c-user/{b2cId}
   */
  b2CUserDelete = (b2CId: string, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/login-service/v1/b2c-user/${b2CId}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags B2C User
   * @name UpdateB2CUser
   * @summary Update b2c user
   * @request PATCH:/login-service/v1/b2c-user/{b2cId}
   */
  updateB2CUser = (
    b2CId: string,
    data: B2CUserDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/login-service/v1/b2c-user/${b2CId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags B2C User
   * @name B2CUserCreate
   * @summary Create b2c user
   * @request POST:/login-service/v1/b2c-user
   */
  b2CUserCreate = (data: B2CUserDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/login-service/v1/b2c-user`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags B2C User
   * @name GetB2CUser
   * @summary Get b2c user by email
   * @request GET:/login-service/v1/b2c-user/{email}
   */
  getB2CUser = (email: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/login-service/v1/b2c-user/${email}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Onboarding
   * @name RetrieveTermsControllerGetOnboardingTerms
   * @request GET:/login-service/v1/onboarding/terms
   */
  retrieveTermsControllerGetOnboardingTerms = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/login-service/v1/onboarding/terms`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Onboarding
   * @name AcceptTermControllerPostAcceptTerms
   * @request POST:/login-service/v1/onboarding/terms/{term_id}
   */
  acceptTermControllerPostAcceptTerms = (
    termId: string,
    data: AcceptTermBody,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/login-service/v1/onboarding/terms/${termId}`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name TokenValidate
   * @summary Validate the token and refresh it if it is expired.
   * @request POST:/login-service/v1/auth/token/validate
   */
  tokenValidate = (data: ValidateTokenBody, params: RequestParams = {}) =>
    this.request<ValidateTokenResult, void>({
      path: `/login-service/v1/auth/token/validate`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description This endpoint consumes a single use code to authenticate or authorize a transaction, returning the content or data associated with the code. The code can only be used once and is considered invalid after consumption.
   *
   * @tags Auth
   * @name SingleUseCodeConsume
   * @summary Consumes a Single Use Code
   * @request POST:/login-service/v1/auth/single-use-code/consume
   */
  singleUseCodeConsume = (
    query: {
      /**
       * The UUID of the single use code to be consumed. This code is intended for a one-time authentication or authorization process.
       * @example "123e456-1234-12d3-a456-426614174000"
       */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ConsumeSingleUseCodeResult, void>({
      path: `/login-service/v1/auth/single-use-code/consume`,
      method: "POST",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name SignatureVerify
   * @summary Verify a signature
   * @request POST:/login-service/v1/auth/signature/verify
   */
  signatureVerify = (data: VerifySignatureBody, params: RequestParams = {}) =>
    this.request<VerifySignatureResult, void>({
      path: `/login-service/v1/auth/signature/verify`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name TokenCreate
   * @summary Creates a token based on the given grant_code.
   * @request POST:/login-service/v1/auth/token/create
   */
  tokenCreate = (data: CreateTokenBody, params: RequestParams = {}) =>
    this.request<CreateTokenBody, void>({
      path: `/login-service/v1/auth/token/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name TokenRestore
   * @summary Restore the authentication flow so the user can continue from where it left off.
   * @request POST:/login-service/v1/auth/token/restore
   */
  tokenRestore = (data: RestoreTokenBody, params: RequestParams = {}) =>
    this.request<RestoreTokenBody, void>({
      path: `/login-service/v1/auth/token/restore`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name SignatureCreate
   * @summary Create a signature for the given state information
   * @request POST:/login-service/v1/auth/signature/create
   */
  signatureCreate = (data: CreateSignatureBody, params: RequestParams = {}) =>
    this.request<CreateSignatureResult, void>({
      path: `/login-service/v1/auth/signature/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Generates a unique policy URL for authentication within a specified tenant context, based on the authenticated user’s email and the provided tenant information.
   *
   * @tags Auth
   * @name AuthPolicyUrlGenerateForTenant
   * @summary Generates a Policy URL for a Specific Tenant
   * @request POST:/login-service/v1/auth/policy-url/generate-for-tenant
   */
  authPolicyUrlGenerateForTenant = (
    data: GeneratePolicyUrlForTenantDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/login-service/v1/auth/policy-url/generate-for-tenant`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Generates a URL for policy access based on the user’s email. It ensures the email has an associated tenant and identifies the principal tenant to generate the URL.
   *
   * @tags Auth
   * @name TenantPrincipalPolicyUrl
   * @summary Generates the Principal Policy URL for a
   * @request POST:/login-service/v1/auth/policy-url/generate-principal
   */
  tenantPrincipalPolicyUrl = (
    data: GeneratePrincipalPolicyUrlDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/login-service/v1/auth/policy-url/generate-principal`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
