import {inspect} from 'node:util'

import {Errors, ux} from '@oclif/core'
import {PrettyPrintableError} from '@oclif/core/interfaces'
import {makeDebug} from '@oclif/core/logger'
import colors from 'ansi-colors'
import lodash from 'lodash'
import validator from 'validator'

export default class Logger {
  public debug: ReturnType<typeof makeDebug>

  private jsonEnabled: boolean

  constructor(namespace: string, options?: {jsonEnabled?: boolean}) {
    this.jsonEnabled = options?.jsonEnabled ?? false
    this.debug = makeDebug(namespace)
  }

  /**
   * @see https://github.com/oclif/core/blob/229037b2dec7d27cb47522ca2116c336c6b218b7/src/command.ts#L203
   */
  public error(
    input: Error | string,
    options: PrettyPrintableError & {code?: string; exit?: false | number} = {},
  ): void {
    if (lodash.isString(input)) input = colors.red(input)
    return Errors.error(input, options as any)
  }

  /**
   * @see https://github.com/oclif/core/blob/229037b2dec7d27cb47522ca2116c336c6b218b7/src/command.ts#L245
   */
  public info(message: string = '', ...args: any[]): void {
    if (this.jsonEnabled && validator.isJSON(message)) {
      this.infoJson(JSON.parse(message))
    } else {
      message = lodash.isString(message) ? message : inspect(message)
      ux.stdout(message, ...args)
    }
  }

  /**
   * @see https://github.com/oclif/core/blob/229037b2dec7d27cb47522ca2116c336c6b218b7/src/command.ts#L252
   */
  public infoJson(json: unknown): void {
    ux.stdout(ux.colorizeJson(json, {pretty: true}))
  }

  /**
   * @see https://github.com/oclif/core/blob/229037b2dec7d27cb47522ca2116c336c6b218b7/src/command.ts#L256
   */
  public infoToStderr(message: string = '', ...args: any[]): void {
    if (this.jsonEnabled && validator.isJSON(message)) {
      this.infoJsonToStderr(JSON.parse(message))
    } else {
      message = lodash.isString(message) ? message : inspect(message)
      ux.stderr(message, ...args)
    }
  }

  /**
   * @param json - The JSON object to print to stderr.
   */
  public infoJsonToStderr(json: unknown): void {
    ux.stderr(ux.colorizeJson(json, {pretty: true}))
  }

  /**
   * @see https://github.com/oclif/core/blob/229037b2dec7d27cb47522ca2116c336c6b218b7/src/command.ts#L303
   */
  public warn(input: Error | string): Error | string {
    if (lodash.isString(input)) input = colors.yellow(input)
    if (!this.jsonEnabled) Errors.warn(input)
    return input
  }
}
