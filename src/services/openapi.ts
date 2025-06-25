import path from 'node:path'

import type {GenerateApiConfiguration, ServiceName} from '@@types/services/openapi'
import type {AssignmentProperty, Literal, Property} from 'acorn'

import axios from '@components/axios'
import {FLOW_BASE_URL, OPENAPI_DIR, TMP_DIR} from '@env'
import * as acorn from 'acorn'
import * as acornWalk from 'acorn-walk'
import escodegen from 'escodegen'
import fs from 'fs-extra'
import JSON from 'json5'
import lodash from 'lodash'
import {generateApi} from 'swagger-typescript-api'

import BaseService from './base'

export default class OpenAPIService extends BaseService {
  public async genCode(service: ServiceName): Promise<void> {
    const schema = await this.getSchema(service)

    const tmpFile = path.join(TMP_DIR, `${service}.json`)

    await fs.writeJSON(tmpFile, schema, {spaces: 2})

    await generateApi(
      lodash.merge(
        {
          cleanOutput: true,
          fileName: service,
          httpClientType: 'axios',
          input: tmpFile,
          output: path.join(OPENAPI_DIR, service),
        } as GenerateApiConfiguration,
        {
          modular: true,
          templates: path.join(OPENAPI_DIR, 'templates'),
        } as any,
      ),
    ).finally(async () => {
      await fs.remove(tmpFile)
    })
  }

  public async getSchema(service: ServiceName): Promise<Record<string, any>> {
    let swaggerDoc: Record<string, any> = {}

    const openapi = (await axios.get<any>(`${FLOW_BASE_URL}/${service}/openapi.json`).catch((error) => {
      if (error.status === 404) return false
      throw error
    })) as false | {data: Record<string, any>}

    if (openapi) {
      swaggerDoc = openapi.data
    } else {
      const swgUiInit = await axios.get<string>(`${FLOW_BASE_URL}/${service}/swagger-ui-init.js`)
      acornWalk.simple(acorn.parse(swgUiInit.data, {ecmaVersion: 'latest'}), {
        Property(node: AssignmentProperty | Property, _state) {
          if ((node.key as Literal).value === 'swaggerDoc') {
            swaggerDoc = JSON.parse(escodegen.generate(node.value))
          }
        },
      })
    }

    return swaggerDoc
  }
}
