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
  CreateConnectionRequest,
  CreateConnectionResponse,
  CustomKeyRequest,
  HTTPValidationError,
  ListConnectionResponse,
  ListSingleSourceToChatResponse,
  ListSingleSourceWithConnectionResponse,
  PatchFlowTenantConnectionRequest,
  PatchIngestionRequest,
  PostSingleSourceIngestionRequest,
  SearchContextRequest,
  SearchContextResponse,
  SingleSourceResponse,
  SrcAdaptersEntrypointsModelFlowTenantConnectionResponseResultElementResultElement,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export default class V1<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Endpoint to create a custom key.
   *
   * @tags custom-key
   * @name PostCustomKeyV1CustomKeyPost
   * @summary Post Custom Key
   * @request POST:/v1/custom-key
   */
  postCustomKeyV1CustomKeyPost = (
    data: CustomKeyRequest,
    params: RequestParams = {},
  ) =>
    this.request<any, HTTPValidationError>({
      path: `/v1/custom-key`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Endpoint to get a custom key.
   *
   * @tags custom-key
   * @name GetCustomKeyV1CustomKeyGet
   * @summary Get Custom Key
   * @request GET:/v1/custom-key
   */
  getCustomKeyV1CustomKeyGet = (
    query: {
      /** Org-Id */
      "org-id": string;
      /** Group-Id */
      "group-id"?: string | null;
      /** User-Id */
      "user-id"?: string | null;
      /** Custom-Key */
      "custom-key": string;
    },
    params: RequestParams = {},
  ) =>
    this.request<any, HTTPValidationError>({
      path: `/v1/custom-key`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * @description Endpoint to search context.
   *
   * @tags search-context
   * @name PostSearchContextV1SearchContextPost
   * @summary Post Search Context
   * @request POST:/v1/search-context
   */
  postSearchContextV1SearchContextPost = (
    data: SearchContextRequest,
    params: RequestParams = {},
  ) =>
    this.request<SearchContextResponse, HTTPValidationError>({
      path: `/v1/search-context`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create a single source with connection
   *
   * @tags single-source-with-connection
   * @name PostIngestionSingleSourceV1IngestionSingleSourcePost
   * @summary Post Ingestion Single Source
   * @request POST:/v1/ingestion/single-source
   * @secure
   */
  postIngestionSingleSourceV1IngestionSingleSourcePost = (
    data: PostSingleSourceIngestionRequest,
    params: RequestParams = {},
  ) =>
    this.request<SingleSourceResponse, HTTPValidationError>({
      path: `/v1/ingestion/single-source`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get a list of ingestions with connection. Args: filter_active (Optional[str]): The filter active. page_size (Optional[str]): The page size. page_number (Optional[str]): The page number.
   *
   * @tags single-source-with-connection
   * @name ListSingleSourceWithConnectionV1IngestionSingleSourceGet
   * @summary List Single Source With Connection
   * @request GET:/v1/ingestion/single-source
   */
  listSingleSourceWithConnectionV1IngestionSingleSourceGet = (
    query?: {
      /** Filter-Active */
      "filter-active"?: string | null;
      /** Source-Type */
      "source-type"?: string | null;
      /** Page-Size */
      "page-size"?: string | null;
      /** Page-Number */
      "page-number"?: string | null;
    },
    params: RequestParams = {},
  ) =>
    this.request<ListSingleSourceWithConnectionResponse, HTTPValidationError>({
      path: `/v1/ingestion/single-source`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieves a list of sources to chat. Returns: A Response object with a status code of 200.
   *
   * @tags single-source-with-connection
   * @name ListSourcesToChatV1IngestionSingleSourceChatGet
   * @summary List Sources To Chat
   * @request GET:/v1/ingestion/single-source/chat
   */
  listSourcesToChatV1IngestionSingleSourceChatGet = (
    params: RequestParams = {},
  ) =>
    this.request<ListSingleSourceToChatResponse, any>({
      path: `/v1/ingestion/single-source/chat`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Update a single source ingestion. Args: ingestion_id (int): The ingestion id. body (PatchIngestionRequest): The body.
   *
   * @tags single-source-with-connection
   * @name UpdateSingleSourceIngestionV1IngestionSingleSourceIngestionIdPatch
   * @summary Update Single Source Ingestion
   * @request PATCH:/v1/ingestion/single-source/{ingestion_id}
   */
  updateSingleSourceIngestionV1IngestionSingleSourceIngestionIdPatch = (
    ingestionId: number,
    data: PatchIngestionRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, HTTPValidationError>({
      path: `/v1/ingestion/single-source/${ingestionId}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete a single source ingestion. Args: ingestion_id (int): The ingestion id. Returns: Response: HTTP response with status code 204 if successful.
   *
   * @tags single-source-with-connection
   * @name DeleteSingleSourceIngestionV1IngestionSingleSourceIngestionIdDelete
   * @summary Delete Single Source Ingestion
   * @request DELETE:/v1/ingestion/single-source/{ingestion_id}
   */
  deleteSingleSourceIngestionV1IngestionSingleSourceIngestionIdDelete = (
    ingestionId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, HTTPValidationError>({
      path: `/v1/ingestion/single-source/${ingestionId}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description Executes a single source ingestion process. Args: ingestion_id (int): The ID of the ingestion to be executed. execute_single_source_service (ExecuteSingleServiceIngestionService): The service responsible for executing the single source ingestion. Defaults to the dependency provided by the application container. db_session (Depends): The database session dependency. Defaults to the dependency provided by the application container. Returns: Response: The HTTP response indicating the success of the execution.
   *
   * @tags single-source-with-connection
   * @name ExecuteSingleSourceV1IngestionSingleSourceIngestionIdExecutePost
   * @summary Execute Single Source
   * @request POST:/v1/ingestion/single-source/{ingestion_id}/execute
   */
  executeSingleSourceV1IngestionSingleSourceIngestionIdExecutePost = (
    ingestionId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, HTTPValidationError>({
      path: `/v1/ingestion/single-source/${ingestionId}/execute`,
      method: "POST",
      ...params,
    });
  /**
   * @description Get a list of content types for ingestion. Returns: Response: HTTP response with status code 200 and the list of content types.
   *
   * @tags single-source-with-connection
   * @name GetContentTypesV1IngestionSingleSourceContentTypeGet
   * @summary Get Content Types
   * @request GET:/v1/ingestion/single-source/content-type
   */
  getContentTypesV1IngestionSingleSourceContentTypeGet = (
    params: RequestParams = {},
  ) =>
    this.request<any, any>({
      path: `/v1/ingestion/single-source/content-type`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Create a connection
   *
   * @tags flow-tenant-connection-v1
   * @name PostCreateConnectionV1ConnectionPost
   * @summary Post Create Connection
   * @request POST:/v1/connection
   * @secure
   */
  postCreateConnectionV1ConnectionPost = (
    data: CreateConnectionRequest,
    params: RequestParams = {},
  ) =>
    this.request<CreateConnectionResponse, HTTPValidationError>({
      path: `/v1/connection`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description List connections. Args: filter_active (Optional[str]): The filter active. connection_type (Optional[str]): The connection type. page_size (Optional[str]): The page size. page_number (Optional[str]): The page number.
   *
   * @tags flow-tenant-connection-v1
   * @name ListConnectionV1ConnectionGet
   * @summary List Connection
   * @request GET:/v1/connection
   */
  listConnectionV1ConnectionGet = (
    query?: {
      /** Filter-Active */
      "filter-active"?: string | null;
      /** Connection-Type */
      "connection-type"?: string | null;
      /** Page-Size */
      "page-size"?: string | null;
      /** Page-Number */
      "page-number"?: string | null;
    },
    params: RequestParams = {},
  ) =>
    this.request<ListConnectionResponse, HTTPValidationError>({
      path: `/v1/connection`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * @description Creates a connection. Args: flow_tenant_connection (PostFlowTenantConnectionRequest): The connection request. connection_service (CreateConnectionService): The service to create a connection. Returns: Response: The created connection.
   *
   * @tags flow-tenant-connection-v1
   * @name PatchFlowTenantConnectionV1ConnectionConnectionIdPatch
   * @summary Patch Flow Tenant Connection
   * @request PATCH:/v1/connection/{connection_id}
   * @secure
   */
  patchFlowTenantConnectionV1ConnectionConnectionIdPatch = (
    connectionId: number,
    data: PatchFlowTenantConnectionRequest,
    params: RequestParams = {},
  ) =>
    this.request<any, HTTPValidationError>({
      path: `/v1/connection/${connectionId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description List FlowTenantConnectionResponse. Args: filter_active (Optional[str]): The filter active. connection_type (Optional[str]): The connection type. page_size (Optional[str]): The page size. page_number (Optional[str]): The page number.
   *
   * @tags flow-tenant-connection-v1
   * @name GetFlowTenantConnectionByIdV1ConnectionConnectionIdGet
   * @summary Get Flow Tenant Connection By Id
   * @request GET:/v1/connection/{connection_id}
   */
  getFlowTenantConnectionByIdV1ConnectionConnectionIdGet = (
    connectionId: number,
    params: RequestParams = {},
  ) =>
    this.request<
      SrcAdaptersEntrypointsModelFlowTenantConnectionResponseResultElementResultElement,
      HTTPValidationError
    >({
      path: `/v1/connection/${connectionId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Endpoint to delete a flow tenant connection
   *
   * @tags flow-tenant-connection-v1
   * @name DeleteFlowTenantConnectionByIdV1ConnectionConnectionIdDelete
   * @summary Delete Flow Tenant Connection By Id
   * @request DELETE:/v1/connection/{connection_id}
   * @secure
   */
  deleteFlowTenantConnectionByIdV1ConnectionConnectionIdDelete = (
    connectionId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, HTTPValidationError>({
      path: `/v1/connection/${connectionId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
