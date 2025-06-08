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

/**
 * ResultElementType
 * Represents the types of ingestion indicators.
 */
export enum SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseResultElementTypeResultElementType {
  CONFLUENCE = "CONFLUENCE",
  CONFLUENCE_V1 = "CONFLUENCE_V1",
  AZURE_BLOB_STORAGE = "AZURE_BLOB_STORAGE",
  GOOGLE_DRIVE = "GOOGLE_DRIVE",
  JIRA = "JIRA",
}

/**
 * ResultElementType
 * Represents the types of ingestion indicators.
 */
export enum SrcAdaptersEntrypointsModelFlowTenantConnectionResponseResultElementTypeResultElementType {
  CONFLUENCE = "CONFLUENCE",
  CONFLUENCE_V1 = "CONFLUENCE_V1",
  AZURE_BLOB_STORAGE = "AZURE_BLOB_STORAGE",
  GOOGLE_DRIVE = "GOOGLE_DRIVE",
  JIRA = "JIRA",
  AZURE = "AZURE",
}

/**
 * SourceType
 * Enumeration representing the source types for ingestion requests.
 *
 * Attributes:
 *     REPOSITORY (str): Represents a repository as the source type.
 *     CONFLUENCE (str): Represents Confluence as the source type.
 *     CONFLUENCE_V1 (str): Represents Confluence V1 as the source type.
 *     AZURE_BLOB_STORAGE (str): Represents Azure Blob Storage as the source type.
 *     GOOGLE_DRIVE (str): Represents Google Drive as the source type.
 */
export enum SourceType {
  REPOSITORY = "REPOSITORY",
  CONFLUENCE = "CONFLUENCE",
  CONFLUENCE_V1 = "CONFLUENCE_V1",
  AZURE_BLOB_STORAGE = "AZURE_BLOB_STORAGE",
  GOOGLE_DRIVE = "GOOGLE_DRIVE",
  JIRA = "JIRA",
}

/**
 * Separator
 * Represents the separator for the chunking.
 */
export enum Separator {
  True = "true",
  False = "false",
  Start = "start",
  End = "end",
}

/**
 * Provider
 * Represents the provider for the embedding.
 */
export enum Provider {
  AzureOpenai = "azure-openai",
}

/**
 * Permission
 * Represents the types of permissions available.
 * Attributes:
 *     ORGANIZATION (str): Permission for an organization.
 *     GROUP (str): Permission for a group.
 */
export enum Permission {
  ORGANIZATION = "ORGANIZATION",
  GROUP = "GROUP",
}

/**
 * IngestionTypeEnum
 * Represents the types of ingestion indicators.
 */
export enum IngestionTypeEnum {
  SINGLE_SOURCE = "SINGLE_SOURCE",
  CUSTOM_KEY = "CUSTOM_KEY",
}

/**
 * CronTags
 * Enum representing different cron schedule tags.
 * Attributes:
 *     ONCE (str): Represents a cron job that runs once.
 *     DAILY (str): Represents a cron job that runs daily.
 *     WEEKLY (str): Represents a cron job that runs weekly.
 *     MONTHLY (str): Represents a cron job that runs monthly.
 *     YEARLY (str): Represents a cron job that runs yearly.
 */
export enum CronTags {
  ValueOnce = "@once",
  ValueDaily = "@daily",
  ValueWeekly = "@weekly",
  ValueMonthly = "@monthly",
  ValueYearly = "@yearly",
}

/**
 * ContentType
 * Represents the type of chunking.
 */
export enum ContentType {
  FAQ = "FAQ",
  TROUBLESHOOTING = "TROUBLESHOOTING",
  BUSINESS_DOCUMENT = "BUSINESS_DOCUMENT",
  TECHNICAL_DOCUMENT = "TECHNICAL_DOCUMENT",
  DEFAULT = "DEFAULT",
  CUSTOM = "CUSTOM",
}

/**
 * ConnectionType
 * Enumeration representing the connection types for requests.
 *
 * Attributes:
 *     GOOGLE_DRIVE (str): Represents Google Drive as the source type.
 */
export enum ConnectionType {
  GOOGLE_DRIVE = "GOOGLE_DRIVE",
  CONFLUENCE_V1 = "CONFLUENCE_V1",
  CONFLUENCE = "CONFLUENCE",
  AZURE_BLOB_STORAGE = "AZURE_BLOB_STORAGE",
  JIRA = "JIRA",
  AZURE = "AZURE",
}

/**
 * AzureBlobStorageConnectionDetails
 * The model for the azure blob storage details.
 */
export interface AzureBlobStorageConnectionDetails {
  /**
   * Storagetoken
   * The storage token of the azure blob storage.
   */
  storageToken: string;
}

/**
 * AzureBlobStorageParams
 * Azure Blob Storage params.
 */
export interface AzureBlobStorageParams {
  /**
   * Containername
   * The container name.
   */
  containerName?: string | null;
  /**
   * Fileprefix
   * The file prefix.
   */
  filePrefix?: string | null;
  /**
   * Fileextensions
   * The file extensions.
   */
  fileExtensions?: string[] | null;
}

/**
 * AzureBlobStorageProcessParams
 * The model for the azure blob storage process params.
 */
export interface AzureBlobStorageProcessParams {
  /**
   * Containername
   * The container name of the azure blob storage.
   */
  containerName: string;
  /**
   * Fileprefix
   * The file prefix of the azure blob storage.
   */
  filePrefix?: string | null;
  /**
   * Fileextensions
   * The file extensions of the azure blob storage.
   * @default []
   */
  fileExtensions?: string[] | null;
}

/**
 * AzureConnectionDetails
 * The model for the azure details.
 */
export interface AzureConnectionDetails {
  /**
   * Host
   * The host of the azure.
   */
  host: string;
  /**
   * Token
   * The token of the azure.
   */
  token: string;
  /**
   * Organization
   * The azure organization
   */
  organization: string;
}

/**
 * Chunking
 * Represents chunking for the knowledge API.
 *
 * Attributes:
 *     size (int): Size of the chunk.
 *     interval (int): Interval of the chunk.
 */
export interface ChunkingOutput {
  /**
   * Size
   * Size of the chunk.
   * @default 1124
   */
  size?: number;
  /**
   * Overlap
   * Overlap of the chunk.
   * @default 0
   */
  overlap?: number;
  /**
   * Separators
   * Separators for the chunk.
   */
  separators?: string[] | null;
  /**
   * Isregex
   * Whether the separators is a regex.
   * @default false
   */
  isRegex?: boolean;
  /**
   * Whether to keep the separators.
   * @default "true"
   */
  keepSeparator?: Separator;
}

/**
 * ConfluenceConnectionDetails
 * The model for the confluence details.
 */
export interface ConfluenceConnectionDetails {
  /**
   * Baseurl
   * The base url of the confluence.
   */
  baseUrl: string;
  /**
   * Public
   * If the confluence is public.
   */
  public: boolean;
  /**
   * Username
   * The username of the confluence.
   */
  username?: string | null;
  /**
   * Accesstoken
   * The access token of the confluence.
   */
  accessToken?: string | null;
}

/**
 * ConfluenceFilters
 * Confluence filters.
 */
export interface ConfluenceFilters {
  /**
   * Labelids
   * The label ids.
   */
  labelIds?: string[] | null;
}

/**
 * ConfluenceParams
 * Confluence params.
 */
export interface ConfluenceParams {
  /**
   * Spaceid
   * The space id.
   */
  spaceId?: string | null;
  /** The filters. */
  filters?: ConfluenceFilters | null;
}

/**
 * ConfluenceProcessParams
 * The model for the confluence process params.
 */
export interface ConfluenceProcessParams {
  /**
   * Spaceid
   * The space id of the confluence.
   */
  spaceId: string;
  /** The filters of the confluence. */
  filters?: ConfluenceProcessParamsFilters | null;
}

/**
 * ConfluenceProcessParamsFilters
 * The model for the confluence process params filters.
 */
export interface ConfluenceProcessParamsFilters {
  /**
   * Labelids
   * The label ids of the confluence.
   * @default []
   */
  labelIds?: string[] | null;
}

/**
 * ConfluenceV1Params
 * Confluence params.
 */
export interface ConfluenceV1Params {
  /**
   * Querycql
   * The query cql that will be used in order to some particular attribute from confluence v1, for example the label of a given page and all of its children.
   */
  queryCql?: string | null;
  /**
   * Spacekey
   * The space key of the confluence v1. The name of the space
   */
  spaceKey?: string | null;
  /**
   * Restpath
   * This field will contain the restPath that will appear after the base url from confluence_v1 api, usually is /wiki
   * @default "/wiki"
   */
  restPath?: string | null;
  /**
   * Verifyssl
   * This field will contain a boolean value that will indicate if the ssl certificate will be verified or not because some api's have self signed certificate.
   * @default true
   */
  verifySsl?: boolean | null;
}

/**
 * ConfluenceV1ProcessParams
 * Confluence params.
 */
export interface ConfluenceV1ProcessParams {
  /**
   * Querycql
   * The query cql that will be used in order to some particular attribute from confluence v1, for example the label of a given page and all of its children.
   */
  queryCql?: string | null;
  /**
   * Spacekey
   * The space key of the confluence v1. The name of the space
   */
  spaceKey?: string | null;
  /**
   * Restpath
   * This field will contain the restPath that will appear after the base url from confluence_v1 api, usually is /wiki
   */
  restPath?: string | null;
  /**
   * Verifyssl
   * This field will contain a boolean value that will indicate if the ssl certificate will be verified or not because some api's have self signed certificate.
   */
  verifySsl?: boolean | null;
}

/**
 * Content
 * Content model.
 */
export interface Content {
  /**
   * Value
   * The value.
   */
  value: string;
  /**
   * Contenttypecode
   * The content type code.
   */
  contentTypeCode: string;
  /**
   * Similarity
   * The similarity.
   */
  similarity?: number | null;
  /**
   * Records
   * The records.
   */
  records: Record[];
}

/**
 * CreateConnectionRequest
 * Represents a request to create a Connection.
 */
export interface CreateConnectionRequest {
  /** Type of the connection */
  type: ConnectionType;
  /**
   * Displayname
   * Display name of the source
   */
  displayName: string;
  /** Details of the source */
  details: SrcAdaptersEntrypointsModelCreateConnectionRequestDetailsContentDetailsContent;
}

/**
 * CreateConnectionResponse
 * Represents a response for a single source ingestion.
 */
export interface CreateConnectionResponse {
  /**
   * Connectionid
   * Connection ID
   */
  connectionId: number;
}

/**
 * CustomKeyRequest
 * Modelo para a requisição de criação de um par chave-valor personalizado.
 *
 * Attributes:
 *     orgId (str): O ID da organização associada ao par chave-valor (obrigatório).
 *     groupId (str, optional): O ID do grupo associado ao par chave-valor.
 *     userId (str, optional): O ID do usuário associado ao par chave-valor.
 *     customKey (str): A chave do par chave-valor personalizado (obrigatório).
 *     customValue (str): O valor do par chave-valor personalizado (obrigatório).
 */
export interface CustomKeyRequest {
  /**
   * Orgid
   * O ID da organização associada ao par chave-valor.
   * @maxLength 40
   */
  orgId: string;
  /**
   * Groupid
   * O ID do grupo associado ao par chave-valor, se aplicável.
   */
  groupId?: string | null;
  /**
   * Userid
   * O ID do usuário associado ao par chave-valor, se aplicável.
   */
  userId?: string | null;
  /**
   * Customkey
   * A chave do par chave-valor personalizado.
   * @maxLength 80
   */
  customKey: string;
  /**
   * Customvalue
   * O valor do par chave-valor personalizado.
   */
  customValue: string;
}

/**
 * Details
 * Represents the types of parameters for ingestion.
 *
 * Attributes:
 *     confluence (Optional[DetailsConfluence]): Parameters for a confluence source.
 *     azureBlobStorage (Optional[DetailsAzureBlobStorage]): Parameters for a azureBlobStorage source.
 *     googleDrive (Optional[DetailsGoogleDrive]): Parameters for a googleDrive connection.
 */
export interface Details {
  /** Parameters for a confluence source. */
  confluence?: SrcAdaptersEntrypointsModelFlowTenantConnectionRequestPatchFlowTenantConnectionRequestDetailsConfluence | null;
  /** Parameters for a azureBlobStorage source. */
  azureBlobStorage?: SrcAdaptersEntrypointsModelFlowTenantConnectionRequestPatchFlowTenantConnectionRequestDetailsAzureBlobStorage | null;
  /** Parameters for a googleDrive connection. */
  googleDrive?: SrcAdaptersEntrypointsModelFlowTenantConnectionRequestPatchFlowTenantConnectionRequestDetailsGoogleDrive | null;
  /** Parameters for a Jira source. */
  jira?: SrcAdaptersEntrypointsModelFlowTenantConnectionRequestPatchFlowTenantConnectionRequestDetailsJira | null;
  /** Parameters for a Azure connection. */
  azure?: SrcAdaptersEntrypointsModelFlowTenantConnectionRequestPatchFlowTenantConnectionRequestDetailsAzure | null;
}

/**
 * Embedding
 * Represents the embedding for the knowledge API.
 */
export interface Embedding {
  /**
   * Provider for the embedding.
   * @default "azure-openai"
   */
  provider?: Provider;
  /**
   * Model
   * Model name for the embedding.
   */
  model: string;
}

/**
 * EmbeddingSimilarityFilter
 * Represents the embedding similarity filter.
 */
export interface EmbeddingSimilarityFilter {
  /**
   * Rawtext
   * The raw text.
   */
  rawText: string;
  /**
   * Threshold
   * The threshold. Must be between 0 and 1 (inclusive)             where 1 means the same and 0 means the opposite.
   * @min 0
   * @max 1
   * @default 0.75
   */
  threshold?: number;
  /**
   * Limit
   * The limit.
   * @min 1
   * @max 100
   * @default 20
   */
  limit?: number;
}

/**
 * GoogleDriveConnectionDetails
 * The model for the azure blob storage details.
 */
export interface GoogleDriveConnectionDetails {
  /**
   * Serviceaccountinfo
   * The service account info of the google drive.
   */
  serviceAccountInfo: string;
  /**
   * Serviceaccountemail
   * The service account email of the google drive.
   */
  serviceAccountEmail: string;
}

/**
 * GoogleDriveParams
 * Google Drive params.
 */
export interface GoogleDriveParams {
  /**
   * Url
   * The url of the google drive.
   */
  url?: string;
}

/**
 * GoogleDriveProcessParams
 * The model for the google drive process params.
 */
export interface GoogleDriveProcessParams {
  /**
   * Url
   * The url of the google drive.
   */
  url: string;
}

/**
 * Group
 * The model for the group.
 */
export interface Group {
  /**
   * Id
   * The id of the group.
   */
  id: string;
  /**
   * Name
   * The name of the group.
   */
  name: string;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/**
 * Ingestion
 * The model for the ingestion.
 */
export interface Ingestion {
  /** The type of the ingestion. */
  type: IngestionTypeEnum;
  /**
   * Key
   * The key of the ingestion.
   * @maxLength 255
   */
  key: string;
}

/**
 * JiraParams
 * Jira params.
 */
export interface JiraParams {
  /** Projectkey */
  projectKey: string;
  /**
   * Issuetypeids
   * List of issue types to pull data from.
   */
  issueTypeIds?: string[] | null;
  /**
   * Statusids
   * List of statuses to pull data from.
   */
  statusIds?: string[] | null;
  /**
   * Daysago
   * Number of days ago to pull data from.
   */
  daysAgo?: number | null;
}

/**
 * JiraProcessParams
 * The model for the jira process params.
 */
export interface JiraProcessParams {
  /**
   * Projectkey
   * The project key of the jira.
   */
  projectKey: string;
  /**
   * Issuetypeids
   * List of issue types to pull data from.
   */
  issueTypeIds?: string[] | null;
  /**
   * Status Ids
   * List of statuses to pull data from.
   */
  status_ids?: string[] | null;
  /**
   * Daysago
   * Number of days ago to pull data from.
   */
  daysAgo?: number | null;
}

/**
 * ListConnectionResponse
 * The model for the connection.
 */
export interface ListConnectionResponse {
  /** The pagination. */
  pagination: Pagination;
  /**
   * Results
   * The results.
   */
  results: SrcAdaptersEntrypointsModelFlowTenantConnectionResponseResultElementResultElement[];
}

/**
 * ListSingleSourceToChatResponse
 * Represents the response for listing a single source to chat.
 */
export interface ListSingleSourceToChatResponse {
  /**
   * Results
   * The list of results.
   */
  results: Result[];
}

/**
 * ListSingleSourceWithConnectionResponse
 * The model for the ingestion.
 */
export interface ListSingleSourceWithConnectionResponse {
  /** The pagination. */
  pagination: Pagination;
  /**
   * Results
   * The results.
   */
  results: SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseResultElementResultElement[];
}

/**
 * Pagination
 * The model for the pagination.
 */
export interface Pagination {
  /**
   * Pagesize
   * The size of the page.
   */
  pageSize: number;
  /**
   * Pagenumber
   * The number of the page.
   */
  pageNumber: number;
  /**
   * Totalpages
   * The total number of pages.
   */
  totalPages: number;
  /**
   * Totalitems
   * The total number of items.
   */
  totalItems: number;
}

/**
 * ParamsAzureBlobStorage
 * Represents the parameters for Azure Blob Storage.
 *
 * Attributes:
 *     model_config (ConfigDict): The model configuration.
 *     container_name (str): The name of the container.
 *     file_prefix (Optional[str]): The prefix of the file.
 *     file_extensions (Optional[List[str]]): The extensions of the file.
 */
export interface ParamsAzureBlobStorage {
  /**
   * Containername
   * The name of the container
   */
  containerName: string;
  /**
   * Fileprefix
   * The prefix of the file
   */
  filePrefix?: string | null;
  /**
   * Fileextensions
   * The extensions of the file
   */
  fileExtensions?: string[] | null;
}

/**
 * ParamsConfluence
 * Represents the parameters for Confluence data ingestion.
 *
 * Attributes:
 *     spaceId (str): Space to pull data from.
 *     filters (ParamsConfluenceFilters): Filters to apply to the data source.
 */
export interface ParamsConfluence {
  /**
   * Spaceid
   * Space to pull data from.
   */
  spaceId: string;
  /** Filters to apply to the data source. */
  filters?: ParamsConfluenceFilters | null;
}

/**
 * ParamsConfluenceFilters
 * Represents the parameters for filtering Confluence data source.
 *
 * Attributes:
 *     labelIds (list[str]): Labels to apply to the data source.
 */
export interface ParamsConfluenceFilters {
  /**
   * Labelids
   * Labels to apply to the data source.
   */
  labelIds?: string[] | null;
}

/**
 * ParamsConfluenceV1
 * Represents the parameters for Confluence V1 data ingestion.
 *
 * Attributes:
 *     query_cql (str): CQL (Confluence Query Language) to pull data from.
 *         eg: "label=example"
 *     space_key (str): Space key to pull data from.
 *     rest_path (str): REST path to pull data from.
 *     verify_ssl (bool): Verify SSL certificate.
 */
export interface ParamsConfluenceV1 {
  /**
   * Querycql
   * CQL (Confluence Query Language) to pull data from.
   */
  queryCql?: string | null;
  /**
   * Spacekey
   * Space key to pull data from.
   */
  spaceKey?: string | null;
  /**
   * Restpath
   * REST path to pull data from.
   * @default "/wiki"
   */
  restPath?: string | null;
  /**
   * Verifyssl
   * Verify SSL certificate.
   * @default true
   */
  verifySsl?: boolean | null;
}

/**
 * ParamsGoogleDrive
 * Represents the parameters for Google Drive data ingestion.
 *
 * Attributes:
 *     url (str): URL to pull data from.
 */
export interface ParamsGoogleDrive {
  /**
   * Url
   * URL to pull data from.
   */
  url: string;
}

/**
 * ParamsJira
 * Represents the parameters for Jira data ingestion.
 *
 * Attributes:
 */
export interface ParamsJira {
  /** Projectkey */
  projectKey: string;
  /**
   * Issuetypeids
   * List of issue types to pull data from.
   */
  issueTypeIds?: string[] | null;
  /**
   * Statusids
   * List of statuses to pull data from.
   */
  statusIds?: string[] | null;
  /**
   * Daysago
   * Number of days ago to pull data from.
   */
  daysAgo?: number | null;
}

/**
 * PatchConnection
 * Represents a patch request for a connection.
 *
 * Attributes:
 *     display_name (str): Display name of the connection.
 *     active (bool): Whether the connection is active.
 *     details (Details): Details of the connection.
 */
export interface PatchConnection {
  /**
   * Displayname
   * Display name of connection.
   */
  displayName?: string | null;
  /**
   * Active
   * Whether the connection is active.
   */
  active?: boolean | null;
  /** Details of connection. */
  details?: Details | null;
}

/**
 * PatchFlowTenantConnectionRequest
 * Represents a request to patch a Flow Tenant Connection.
 */
export interface PatchFlowTenantConnectionRequest {
  /** Connection details to update. */
  connection: PatchConnection;
}

/**
 * PatchIngestionRequest
 * Patch ingestion request.
 */
export interface PatchIngestionRequest {
  /** Connection to be updated. */
  connection?: SrcAdaptersEntrypointsModelPatchSingleSourceIngestionRequestConnectionConnection;
  /** Process to be updated. */
  process?: SrcAdaptersEntrypointsModelPatchSingleSourceIngestionRequestProcessProcess;
}

/**
 * PostSingleSourceIngestionRequest
 * Represents a request for ingesting a single source.
 *
 * Attributes:
 *     model_config (ConfigDict): Configuration for the model.
 *     type (SourceType): Type of the source.
 *     display_name (str): Display name of the source.
 *     connection (Connection): Connection parameters.
 *     process (Process): Process parameters.
 */
export interface PostSingleSourceIngestionRequest {
  /** Type of the source */
  type: SourceType;
  /**
   * Displayname
   * Display name of the source
   */
  displayName: string;
  /** Connection parameters */
  connection: SrcAdaptersEntrypointsModelIngestionV0RequestConnectionConnection;
  /** Process parameters */
  process: SrcAdaptersEntrypointsModelIngestionV0RequestProcessProcess;
}

/**
 * ProcessExecution
 * The model for the process execution.
 */
export interface ProcessExecution {
  /**
   * Id
   * The id of the process execution.
   */
  id?: number | null;
  /**
   * Status
   * The status of the process execution.
   */
  status: string;
  /**
   * Createdat
   * The creation date of the process execution.
   */
  createdAt: string;
  /**
   * Startedat
   * The start date of the process execution.
   */
  startedAt?: string | null;
  /**
   * Finalizedat
   * The final date of the process execution.
   */
  finalizedAt?: string | null;
  /**
   * Errormessage
   * The error message of the process execution.
   */
  errorMessage?: string | string[] | null;
  /**
   * Dataversionid
   * The data version id of the process execution.
   */
  dataVersionId?: number | null;
}

/**
 * ProcessParams
 * The model for the process params.
 */
export interface ProcessParams {
  /** The confluence v1 params. */
  confluence_v1?: ConfluenceV1ProcessParams | null;
  /** The confluence params. */
  confluence?: ConfluenceProcessParams | null;
  /** The azure blob storage params. */
  azureBlobStorage?: AzureBlobStorageProcessParams | null;
  /** The google drive params. */
  googleDrive?: GoogleDriveProcessParams | null;
  /** The jira params. */
  jira?: JiraProcessParams | null;
}

/**
 * Record
 * Record model.
 */
export interface Record {
  /**
   * Key
   * The key.
   */
  key: string;
  /**
   * Recordtypecode
   * The record type code.
   */
  recordTypeCode: string;
  /** The source. */
  source?: Source | null;
  /**
   * Externallink
   * The external link.
   */
  externalLink?: string | null;
}

/**
 * Result
 * Represents the result of a single source with connection listing.
 *
 * Attributes:
 *     type (ResultElementType): The type of the source.
 *     process (Process): The process details.
 */
export interface Result {
  /** The type of the source. */
  type: SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseResultElementTypeResultElementType;
  /** The process details. */
  process: SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseListSingleSourceToChatProcess;
}

/**
 * SearchContextRequest
 * The model for the search context request.
 */
export interface SearchContextRequest {
  /**
   * Ingestions
   * The ingestions to be performed.
   */
  ingestions: Ingestion[];
  /** The embedding similarity filter. */
  embeddingSimilarityFilter?: EmbeddingSimilarityFilter | null;
}

/**
 * SearchContextResponse
 * Search context response model.
 */
export interface SearchContextResponse {
  /**
   * Contents
   * The contents.
   */
  contents: Content[];
}

/**
 * SingleSourceResponse
 * Represents a response for a single source ingestion.
 */
export interface SingleSourceResponse {
  /**
   * Connectionid
   * Connection ID
   */
  connectionId: number;
  /**
   * Ingestionid
   * Ingestion ID
   */
  ingestionId: number;
}

/**
 * Source
 * Source model.
 */
export interface Source {
  /**
   * Displayname
   * The display name.
   */
  displayName: string;
  /**
   * Type
   * The type.
   */
  type: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/**
 * DetailsAzure
 * DetailsAzure is a Pydantic model representing the details required to connect to a Azure instance.
 * Attributes:
 *     host (str): The Azure host.
 *     organization (str): The Azure organization.
 *     token (SecretStr): The Azure access token.
 * Methods:
 *     _dump_secret_str(value: SecretStr) -> str:
 *         Serializes the SecretStr token to its string representation.
 */
export interface SrcAdaptersEntrypointsModelCreateConnectionRequestDetailsAzureDetailsAzure {
  /**
   * Host
   * Azure host.
   */
  host: string;
  /**
   * Organization
   * Azure organization.
   */
  organization: string;
  /**
   * Token
   * Azure access token.
   * @format password
   */
  token: string;
}

/**
 * DetailsAzureBlobStorage
 * Represents the parameters for Azure Blob Storage connection.
 *
 * Attributes:
 *     storageToken (SecretStr): Name of the Azure Blob Storage account
 */
export interface SrcAdaptersEntrypointsModelCreateConnectionRequestDetailsAzureBlobStorageDetailsAzureBlobStorage {
  /**
   * Storagetoken
   * Name of the Azure Blob Storage account.
   * @format password
   */
  storageToken: string;
}

/**
 * DetailsConfluence
 * DetailsConfluence is a Pydantic model representing the details required to create a Confluence connection.
 * Attributes:
 *     base_url (str): Confluence URL.
 *     public (bool): Indicates if the Confluence connection is public. Defaults to True.
 *     username (Optional[str]): Confluence username. Required if the connection is not public.
 *     access_token (Optional[SecretStr]): Confluence access token. Required if the connection is not public.
 * Methods:
 *     _dump_secret_str(value: SecretStr) -> Optional[str]:
 *         Serializer method to dump the secret value of the access token.
 *     _check_public_match() -> Self:
 *         Validator method to ensure that if the connection is not public, both username
 *         and access token are provided.
 */
export interface SrcAdaptersEntrypointsModelCreateConnectionRequestDetailsConfluenceDetailsConfluence {
  /**
   * Baseurl
   * Confluence URL.
   */
  baseUrl: string;
  /**
   * Public
   * If public for the Confluence connection.
   * @default true
   */
  public?: boolean;
  /**
   * Username
   * Confluence username.
   */
  username?: string | null;
  /**
   * Accesstoken
   * Confluence access token.
   */
  accessToken?: string | null;
}

/**
 * DetailsContent
 * Represents the details content for connection.
 *
 * Attributes:
 *     google_drive (DetailsGoogleDrive): Parameters for a Google Drive connection.
 */
export interface SrcAdaptersEntrypointsModelCreateConnectionRequestDetailsContentDetailsContent {
  /** Parameters for a googleDrive connection. */
  googleDrive?: SrcAdaptersEntrypointsModelCreateConnectionRequestDetailsGoogleDriveDetailsGoogleDrive | null;
  /** Parameters for a confluence connection. */
  confluence?: SrcAdaptersEntrypointsModelCreateConnectionRequestDetailsConfluenceDetailsConfluence | null;
  /** Parameters for a azureBlobStorage connection. */
  azureBlobStorage?: SrcAdaptersEntrypointsModelCreateConnectionRequestDetailsAzureBlobStorageDetailsAzureBlobStorage | null;
  /** Parameters for a Jira connection. */
  jira?: SrcAdaptersEntrypointsModelCreateConnectionRequestDetailsJiraDetailsJira | null;
  /** Parameters for a Azure connection. */
  azure?: SrcAdaptersEntrypointsModelCreateConnectionRequestDetailsAzureDetailsAzure | null;
}

/**
 * DetailsGoogleDrive
 * Represents the details for Google Drive connection.
 *
 * Attributes:
 *     serviceAccountInfo (str): Service account info for the Google Drive connection.
 */
export interface SrcAdaptersEntrypointsModelCreateConnectionRequestDetailsGoogleDriveDetailsGoogleDrive {
  /**
   * Serviceaccountinfo
   * Service account info for the Google Drive connection.
   * @format password
   */
  serviceAccountInfo: string;
}

/**
 * DetailsJira
 * DetailsJira is a Pydantic model representing the details required to connect to a Jira instance.
 * Attributes:
 *     host (str): The Jira host.
 *     username (str, optional): The Jira username.
 *     token (SecretStr): The Jira access token.
 * Methods:
 *     _dump_secret_str(value: SecretStr) -> str:
 *         Serializes the SecretStr token to its string representation.
 */
export interface SrcAdaptersEntrypointsModelCreateConnectionRequestDetailsJiraDetailsJira {
  /**
   * Host
   * Jira host.
   */
  host: string;
  /**
   * Username
   * Jira username.
   */
  username?: string;
  /**
   * Token
   * Jira access token.
   * @format password
   */
  token: string;
}

/**
 * Connection
 * The model for the connection.
 */
export interface SrcAdaptersEntrypointsModelFlowTenantConnectionConnectionConnection {
  /**
   * Id
   * The id of the connection.
   */
  id: number;
  /**
   * Displayname
   * The display name of the connection.
   */
  displayName: string;
  /**
   * Createdat
   * The creation date of the connection.
   */
  createdAt: string;
  /**
   * Updatedat
   * The update date of the connection.
   */
  updatedAt: string;
  /**
   * Active
   * The status of the connection.
   */
  active: boolean;
  /** The details of the connection. */
  details?: SrcAdaptersEntrypointsModelFlowTenantConnectionConnectionDetailsConnectionDetails | null;
}

/**
 * ConnectionDetails
 * The model for the connection details.
 */
export interface SrcAdaptersEntrypointsModelFlowTenantConnectionConnectionDetailsConnectionDetails {
  /** The confluence details. */
  confluence?: ConfluenceConnectionDetails | null;
  /** The azure blob storage details. */
  azureBlobStorage?: AzureBlobStorageConnectionDetails | null;
  /** The google drive details. */
  googleDrive?: GoogleDriveConnectionDetails | null;
  /** The jira details. */
  jira?: SrcAdaptersEntrypointsModelFlowTenantConnectionJiraConnectionDetailsJiraConnectionDetails | null;
  /** The azure details. */
  azure?: AzureConnectionDetails | null;
}

/**
 * DetailsAzureBlobStorage
 * Represents the parameters for Azure Blob Storage connection.
 *
 * Attributes:
 *     storageToken (SecretStr): Name of the Azure Blob Storage account
 */
export interface SrcAdaptersEntrypointsModelFlowTenantConnectionDetailsAzureBlobStorageDetailsAzureBlobStorage {
  /**
   * Storagetoken
   * Name of the Azure Blob Storage account.
   * @format password
   */
  storageToken: string;
}

/**
 * DetailsConfluence
 * Represents the details for Confluence connection.
 *
 * Attributes:
 *     baseUrl (str): URL of the Confluence connection.
 *     public (bool): If public for the Confluence connection.
 *     username (str): Username for the Confluence connection.
 *     accessToken (SecretStr): AccessToken for the Confluence connection.
 */
export interface SrcAdaptersEntrypointsModelFlowTenantConnectionDetailsConfluenceDetailsConfluence {
  /**
   * Baseurl
   * URL of the Confluence connection.
   */
  baseUrl: string;
  /**
   * Public
   * If public for the Confluence connection.
   * @default true
   */
  public?: boolean;
  /**
   * Username
   * Username for the Confluence connection.
   */
  username?: string | null;
  /**
   * Accesstoken
   * AccessToken for the Confluence connection.
   */
  accessToken?: string | null;
}

/**
 * DetailsGoogleDrive
 * Represents the details for Google Drive connection.
 *
 * Attributes:
 *     serviceAccountInfo (SecretStr): Service account info for the Google Drive connection.
 *     serviceAccountEmail (str): Service account email for the Google Drive connection
 */
export interface SrcAdaptersEntrypointsModelFlowTenantConnectionDetailsGoogleDriveDetailsGoogleDrive {
  /**
   * Serviceaccountinfo
   * Service account info for the Google Drive connection.
   * @format password
   */
  serviceAccountInfo: string;
  /**
   * Serviceaccountemail
   * Service account email for the Google Drive connection, this field will be populated by serviceAccountInfo
   */
  serviceAccountEmail?: string;
}

/**
 * DetailsJira
 * DetailsJira is a Pydantic model representing the details required to connect to a Jira instance.
 * Attributes:
 *     host (str): The Jira host.
 *     username (str, optional): The Jira username.
 *     token (SecretStr): The Jira access token.
 * Methods:
 *     _dump_secret_str(value: SecretStr) -> str:
 *         Serializes the SecretStr token to its string representation.
 */
export interface SrcAdaptersEntrypointsModelFlowTenantConnectionDetailsJiraDetailsJira {
  /**
   * Host
   * Jira host.
   */
  host: string;
  /**
   * Username
   * Jira username.
   */
  username?: string;
  /**
   * Token
   * Jira access token.
   * @format password
   */
  token: string;
}

/**
 * JiraConnectionDetails
 * The model for the jira details.
 */
export interface SrcAdaptersEntrypointsModelFlowTenantConnectionJiraConnectionDetailsJiraConnectionDetails {
  /**
   * Host
   * The host of the jira.
   */
  host: string;
  /**
   * Username
   * The username of the jira.
   */
  username: string;
  /**
   * Token
   * The token of the jira.
   */
  token: string;
  /**
   * Type
   * The type of the jira. (e.g. JIRA_CLOUD or JIRA_SERVER)
   */
  type: string;
}

/**
 * DetailsAzure
 * DetailsAzure is a model representing the connection details required to access a Jira instance.
 * Attributes:
 *     host (str): The Azure host URL.
 *     organization (str): The azure organization
 *     token (SecretStr): The Azure access token.
 */
export interface SrcAdaptersEntrypointsModelFlowTenantConnectionRequestPatchFlowTenantConnectionRequestDetailsAzure {
  /**
   * Host
   * Azure host.
   */
  host?: string | null;
  /**
   * Organization
   * Azure organization.
   */
  organization?: string | null;
  /**
   * Token
   * Azure access token.
   */
  token?: string | null;
}

/**
 * DetailsAzureBlobStorage
 * Represents the parameters for Azure Blob Storage connection.
 *
 * Attributes:
 *     storageToken (str): Name of the Azure Blob Storage account
 */
export interface SrcAdaptersEntrypointsModelFlowTenantConnectionRequestPatchFlowTenantConnectionRequestDetailsAzureBlobStorage {
  /**
   * Storagetoken
   * Name of the Azure Blob Storage account.
   * @format password
   */
  storageToken: string;
}

/**
 * DetailsConfluence
 * Represents the details for Confluence connection.
 *
 * Attributes:
 *     baseUrl (str): URL of the Confluence connection.
 *     public (bool): If public for the Confluence connection.
 *     accessToken (str): AccessToken for the Confluence connection.
 */
export interface SrcAdaptersEntrypointsModelFlowTenantConnectionRequestPatchFlowTenantConnectionRequestDetailsConfluence {
  /**
   * Baseurl
   * URL of the Confluence connection.
   */
  baseUrl?: string | null;
  /**
   * Public
   * If public for the Confluence connection.
   */
  public?: boolean | null;
  /**
   * Username
   * Username for the Confluence connection.
   */
  username?: string | null;
  /**
   * Accesstoken
   * AccessToken for the Confluence connection.
   */
  accessToken?: string | null;
}

/**
 * DetailsGoogleDrive
 * Represents the details for Google Drive connection.
 *
 * Attributes:
 *     accessToken (str): AccessToken for the Google Drive connection.
 */
export interface SrcAdaptersEntrypointsModelFlowTenantConnectionRequestPatchFlowTenantConnectionRequestDetailsGoogleDrive {
  /**
   * Serviceaccountinfo
   * Service account info for the Google Drive connection.
   * @format password
   */
  serviceAccountInfo: string;
}

/**
 * DetailsJira
 * DetailsJira is a model representing the connection details required to access a Jira instance.
 * Attributes:
 *     host (str): The Jira host URL.
 *     username (str): The Jira username.
 *     token (SecretStr): The Jira access token.
 */
export interface SrcAdaptersEntrypointsModelFlowTenantConnectionRequestPatchFlowTenantConnectionRequestDetailsJira {
  /**
   * Host
   * Jira host.
   */
  host?: string | null;
  /**
   * Username
   * Jira username.
   */
  username?: string | null;
  /**
   * Token
   * Jira access token.
   */
  token?: string | null;
}

/**
 * ResultElement
 * The model for the result element.
 */
export interface SrcAdaptersEntrypointsModelFlowTenantConnectionResponseResultElementResultElement {
  /** The type of the item result. */
  type: SrcAdaptersEntrypointsModelFlowTenantConnectionResponseResultElementTypeResultElementType;
  /** The connection of the item result. */
  connection: SrcAdaptersEntrypointsModelFlowTenantConnectionConnectionConnection;
}

/**
 * Chunking
 * Represents chunking for the knowledge API.
 *
 * Attributes:
 *     size (int): Size of the chunk.
 *     interval (int): Interval of the chunk.
 */
export interface SrcAdaptersEntrypointsModelIngestionV0RequestChunkingChunking {
  /**
   * Size
   * Size of the chunk.
   * @default 1124
   */
  size?: number;
  /**
   * Overlap
   * Overlap of the chunk.
   * @default 0
   */
  overlap?: number;
  /**
   * Separators
   * Separators for the chunk.
   */
  separators?: string[] | null;
  /**
   * Isregex
   * Whether the separators is a regex.
   * @default false
   */
  isRegex?: boolean;
  /**
   * Whether to keep the separators.
   * @default "true"
   */
  keepSeparator?: Separator;
}

/**
 * Connection
 * Represents a connection in the knowledge API.
 *
 * Attributes:
 *     model_config (ConfigDict): The model configuration.
 *     details (DetailsContent): Details of the source.
 *
 * Methods:
 *     _validate_model_properties: Validates the model properties.
 */
export interface SrcAdaptersEntrypointsModelIngestionV0RequestConnectionConnection {
  /** Details of the source */
  details?: SrcAdaptersEntrypointsModelIngestionV0RequestDetailsContentDetailsContent;
  /**
   * Id
   * ID of the connection
   */
  id?: number | null;
}

/**
 * DetailsContent
 * Represents the details content for ingestion.
 *
 * Attributes:
 *     model_config (ConfigDict): The model configuration.
 *     azure_blob_storage (DetailsAzureBlobStorage): Azure Blob Storage parameters.
 *     confluence (DetailsConfluence): Confluence parameters.
 */
export interface SrcAdaptersEntrypointsModelIngestionV0RequestDetailsContentDetailsContent {
  /** Azure Blob Storage parameters */
  azureBlobStorage?: SrcAdaptersEntrypointsModelFlowTenantConnectionDetailsAzureBlobStorageDetailsAzureBlobStorage | null;
  /** Confluence parameters */
  confluence?: SrcAdaptersEntrypointsModelFlowTenantConnectionDetailsConfluenceDetailsConfluence | null;
  /** Parameters for a googleDrive source. */
  googleDrive?: SrcAdaptersEntrypointsModelFlowTenantConnectionDetailsGoogleDriveDetailsGoogleDrive | null;
  /** Parameters for a jira source. */
  jira?: SrcAdaptersEntrypointsModelFlowTenantConnectionDetailsJiraDetailsJira | null;
}

/**
 * Params
 * Represents the parameters for the ingestion process.
 *
 * Attributes:
 *     model_config (ConfigDict): The model configuration.
 *     confluence (Optional[ParamsConfluence]): Confluence parameters.
 *     azure_blob_storage (Optional[ParamsAzureBlobStorage]):
 *     Azure Blob Storage parameters.
 */
export interface SrcAdaptersEntrypointsModelIngestionV0RequestParamsParams {
  /** Confluence parameters */
  confluence?: ParamsConfluence | null;
  /** Confluence V1 parameters */
  confluenceV1?: ParamsConfluenceV1 | null;
  /** Azure Blob Storage parameters */
  azureBlobStorage?: ParamsAzureBlobStorage | null;
  /** Google Drive parameters */
  googleDrive?: ParamsGoogleDrive | null;
  /** Jira parameters */
  jira?: ParamsJira | null;
}

/**
 * Process
 * Represents a process for the knowledge API.
 *
 * Attributes:
 *     model_config (ConfigDict): Configuration for the model.
 *     schedule_interval (Optional[str]): Scheduling interval for the process. Uses cron format.
 *     params (Params): Parameters for the source.
 */
export interface SrcAdaptersEntrypointsModelIngestionV0RequestProcessProcess {
  /**
   * Scheduling interval for the process. Uses cron format.
   * @default "@once"
   */
  scheduleInterval?: CronTags | null;
  /** Parameters for the source. */
  params: SrcAdaptersEntrypointsModelIngestionV0RequestParamsParams;
  /**
   * Permission for the process.
   * @default "ORGANIZATION"
   */
  permission?: Permission | null;
  /**
   * Groupids
   * Group IDs for the process.
   */
  groupIds?: string[] | null;
  /** Chunking for the process. */
  chunking?: SrcAdaptersEntrypointsModelIngestionV0RequestChunkingChunking | null;
  /** Embedding for the process. */
  embedding?: Embedding | null;
  /** Content type for the process. */
  contentType?: ContentType | null;
}

/**
 * Connection
 * The model for the connection.
 */
export interface SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseConnectionConnection {
  /**
   * Id
   * The id of the connection.
   */
  id: number;
  /**
   * Displayname
   * The display name of the connection.
   */
  displayName: string;
  /**
   * Createdat
   * The creation date of the connection.
   */
  createdAt: string;
  /**
   * Updatedat
   * The update date of the connection.
   */
  updatedAt: string;
  /**
   * Active
   * The status of the connection.
   */
  active: boolean;
  /** The details of the connection. */
  details?: SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseConnectionDetailsConnectionDetails | null;
}

/**
 * ConnectionDetails
 * The model for the connection details.
 */
export interface SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseConnectionDetailsConnectionDetails {
  /** The confluence details. */
  confluence?: ConfluenceConnectionDetails | null;
  /** The azure blob storage details. */
  azureBlobStorage?: AzureBlobStorageConnectionDetails | null;
  /** The google drive details. */
  googleDrive?: GoogleDriveConnectionDetails | null;
  /** The jira details. */
  jira?: SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseJiraConnectionDetailsJiraConnectionDetails | null;
}

/**
 * JiraConnectionDetails
 * The model for the Jira details.
 */
export interface SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseJiraConnectionDetailsJiraConnectionDetails {
  /**
   * Host
   * The host of the jira.
   */
  host: string;
  /**
   * Username
   * The username of the jira.
   */
  username?: string | null;
  /**
   * Token
   * The access token of the jira.
   */
  token: string | null;
  /**
   * Type
   * The type of the jira. (e.g. JIRA_CLOUD or JIRA_SERVER)
   */
  type: string;
}

/**
 * Process
 * Represents a process.
 *
 * Attributes:
 *     id (int): The id of the process.
 *     display_name (str): The display name of the process.
 */
export interface SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseListSingleSourceToChatProcess {
  /**
   * Id
   * The id of the process.
   */
  id: number;
  /**
   * Displayname
   * The display name of the process.
   */
  displayName: string;
}

/**
 * Process
 * The model for the process.
 */
export interface SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseProcessProcess {
  /**
   * Id
   * The id of the process.
   */
  id: number;
  /**
   * Displayname
   * The display name of the process.
   */
  displayName: string;
  /**
   * Scheduleinterval
   * The schedule interval of the process.
   */
  scheduleInterval?: string | null;
  /**
   * Createdat
   * The creation date of the process.
   */
  createdAt: string;
  /**
   * Ready
   * If the process is ready to be executed.
   */
  ready: boolean;
  /**
   * Currentdataversionid
   * The current data version id of the process.
   */
  currentDataVersionId?: number | null;
  /**
   * Active
   * The status of the process.
   */
  active: boolean;
  /** The params of the process. */
  params?: ProcessParams | null;
  /** The last execution of the process. */
  lastExecution?: ProcessExecution | null;
  /**
   * Permission
   * The permission of the process.
   */
  permission?: string | null;
  /**
   * Groups
   * The groups of the process.
   */
  groups?: Group[] | null;
  /** Chunking for the process. */
  chunking?: ChunkingOutput | null;
  /** Embedding for the process. */
  embedding?: Embedding | null;
  /** Content type for the process. */
  contentType?: ContentType | null;
}

/**
 * ResultElement
 * The model for the result element.
 */
export interface SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseResultElementResultElement {
  /** The type of the item result. */
  type: SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseResultElementTypeResultElementType;
  /**
   * Displayname
   * The display name of the item result.
   */
  displayName: string;
  /** The connection of the item result. */
  connection: SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseConnectionConnection;
  /** The process of the item result. */
  process: SrcAdaptersEntrypointsModelListSingleSourceWithConnectionResponseProcessProcess;
}

/**
 * Chunking
 * Represents chunking for the knowledge API.
 *
 * Attributes:
 *     size (int): Size of the chunk.
 *     interval (int): Interval of the chunk.
 */
export interface SrcAdaptersEntrypointsModelPatchSingleSourceIngestionRequestChunkingChunking {
  /**
   * Size
   * Size of the chunk.
   */
  size?: number | null;
  /**
   * Overlap
   * Overlap of the chunk.
   */
  overlap?: number | null;
  /**
   * Separators
   * Separator for the chunk.
   */
  separators?: string[] | null;
  /**
   * Isregex
   * Whether the separators is a regex.
   */
  isRegex?: boolean | null;
  /** Whether to keep the separators. */
  keepSeparator?: Separator | null;
}

/**
 * Connection
 * Connection to be updated.
 */
export interface SrcAdaptersEntrypointsModelPatchSingleSourceIngestionRequestConnectionConnection {
  /**
   * Id
   * Connection ID.
   */
  id?: number | null;
}

/**
 * Params
 * The parameters of the process.
 */
export interface SrcAdaptersEntrypointsModelPatchSingleSourceIngestionRequestParamsParams {
  /** The confluence v1 params */
  confluence_v1?: ConfluenceV1Params | null;
  /** The confluence params. */
  confluence?: ConfluenceParams | null;
  /** The azure blob storage params. */
  azureBlobStorage?: AzureBlobStorageParams | null;
  /** The google drive params. */
  googleDrive?: GoogleDriveParams | null;
  /** The jira params. */
  jira?: JiraParams | null;
}

/**
 * Process
 * Process to be updated.
 */
export interface SrcAdaptersEntrypointsModelPatchSingleSourceIngestionRequestProcessProcess {
  /**
   * Displayname
   * The display name of the process.
   */
  displayName?: string | null;
  /** The schedule interval of the process in cron format. */
  scheduleInterval?: CronTags | null;
  /**
   * Active
   * Whether the process is active.
   */
  active?: boolean | null;
  /** The parameters of the process. */
  params?: SrcAdaptersEntrypointsModelPatchSingleSourceIngestionRequestParamsParams | null;
  /** Permission for the process. */
  permission?: Permission | null;
  /**
   * Groupids
   * Group IDs for the process.
   */
  groupIds?: string[] | null;
  /** Chunking for the process. */
  chunking?: SrcAdaptersEntrypointsModelPatchSingleSourceIngestionRequestChunkingChunking | null;
  /** Embedding for the process. */
  embedding?: Embedding | null;
  /** Content type. */
  contentType?: ContentType | null;
}
