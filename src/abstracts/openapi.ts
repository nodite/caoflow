import {SERVICES} from '@@types/services/openapi'
import {Flags} from '@oclif/core'
import lodash from 'lodash'

import BaseCommand from './base'

export default abstract class OpenAPICommand extends BaseCommand {
  static baseFlags = lodash.merge({}, BaseCommand.baseFlags, {
    service: Flags.string({
      description: 'The service to preview the OpenAPI schema for.',
      options: [...SERVICES, 'all'],
      required: true,
    }),
  })
}
