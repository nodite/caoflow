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

import { HttpClient, RequestParams } from "./http-client";

export default class Health<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Health check endpoint. Returns status "ok" if the service is running.
   *
   * @tags health
   * @name HealthCheckHealthGet
   * @summary Health Check
   * @request GET:/health
   */
  healthCheckHealthGet = (params: RequestParams = {}) =>
    this.request<object, any>({
      path: `/health`,
      method: "GET",
      format: "json",
      ...params,
    });
}
