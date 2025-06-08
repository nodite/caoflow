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
  AadTokenResponseDto,
  AccessUserDto,
  AccessUserV2Dto,
  ExchangeCodeDto,
  GenerateTokenDto,
  GetTokenByRefreshDto,
  InfoCodeContentDto,
  InfoCodeDto,
  TokenDto,
  UpsertInfoCodeDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export default class AuthEngineApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags authorization/token
   * @name ExchangeCode
   * @summary Exchange authorization code by access token
   * @request POST:/auth-engine-api/v1/authorization/exchange
   * @secure
   */
  exchangeCode = (data: ExchangeCodeDto, params: RequestParams = {}) =>
    this.request<AadTokenResponseDto, void>({
      path: `/auth-engine-api/v1/authorization/exchange`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags authorization/token
   * @name GetTokenByRefresh
   * @summary Get access token by refresh token
   * @request POST:/auth-engine-api/v1/authorization/refresh
   * @secure
   */
  getTokenByRefresh = (
    data: GetTokenByRefreshDto,
    params: RequestParams = {},
  ) =>
    this.request<AadTokenResponseDto, void>({
      path: `/auth-engine-api/v1/authorization/refresh`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags authorization/info-code
   * @name UpsertInfoCode
   * @summary Update/insert info code
   * @request POST:/auth-engine-api/v1/authorization/code
   * @secure
   */
  upsertInfoCode = (data: UpsertInfoCodeDto, params: RequestParams = {}) =>
    this.request<InfoCodeDto, void>({
      path: `/auth-engine-api/v1/authorization/code`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags authorization/info-code
   * @name GetInfoCodeContent
   * @summary Get info code content
   * @request GET:/auth-engine-api/v1/authorization/code
   * @secure
   */
  getInfoCodeContent = (
    query: {
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<InfoCodeContentDto, void>({
      path: `/auth-engine-api/v1/authorization/code`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags authorization/access
   * @name GetUserAccess
   * @summary Get user access
   * @request GET:/auth-engine-api/v1/authorization/access
   * @secure
   */
  getUserAccess = (params: RequestParams = {}) =>
    this.request<AccessUserDto, void>({
      path: `/auth-engine-api/v1/authorization/access`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags authorization/access
   * @name GetUserAccessV2
   * @summary Get user access v2
   * @request GET:/auth-engine-api/v2/authorization/access
   * @secure
   */
  getUserAccessV2 = (params: RequestParams = {}) =>
    this.request<AccessUserV2Dto, void>({
      path: `/auth-engine-api/v2/authorization/access`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags token
   * @name GenerateToken
   * @summary Generate token
   * @request POST:/auth-engine-api/v1/api-key/token
   * @secure
   */
  generateToken = (data: GenerateTokenDto, params: RequestParams = {}) =>
    this.request<TokenDto, void>({
      path: `/auth-engine-api/v1/api-key/token`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags health
   * @name SimpleHealthCheck
   * @summary Health check that return only status OK
   * @request GET:/auth-engine-api/v1/health
   * @secure
   */
  simpleHealthCheck = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/auth-engine-api/v1/health`,
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
   * @request GET:/auth-engine-api/v1/healthz
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
      path: `/auth-engine-api/v1/healthz`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
