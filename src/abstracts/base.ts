import {Command} from '@oclif/core'
import colors from 'ansi-colors'
import lodash from 'lodash'

export default abstract class BaseCommand extends Command {
  static args = {}

  static baseFlags = {}

  warn(input: Error | string): Error | string {
    if (lodash.isString(input)) input = colors.yellow(input)
    return super.warn(input)
  }
}
