import type {ServiceName} from '@@types/services/openapi'

import OpenAPICommand from '@abstracts/openapi'
import OpenAPIService from '@services/openapi'

export default class Index extends OpenAPICommand {
  static description = 'OpenAPI schema preview'

  static examples = [
    `$ <%= config.bin %> openapi --service login-service
Preview the OpenAPI schema for the login service`,
  ]

  protected openapiService = new OpenAPIService({jsonEnabled: this.jsonEnabled()})

  async run(): Promise<void> {
    const {flags} = await this.parse(Index)

    if (flags.service === 'all') {
      throw this.error('The "all" option is not supported for this command. Please specify a single service.', {
        exit: 1,
      })
    }

    const swaggerDoc = await this.openapiService.getSchema(flags.service as ServiceName)

    this.logJson(swaggerDoc)
  }
}
