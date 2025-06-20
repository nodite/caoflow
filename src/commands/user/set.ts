import type {AuthUser} from '@@types/services/flow/login'

import BaseCommand from '@abstracts/base'
import {select} from '@inquirer/prompts'
import {Flags} from '@oclif/core'
import UserService from '@services/flow/user'
import colors from 'ansi-colors'

export default class Set extends BaseCommand {
  static description = 'Set a default account from the list of authenticated accounts.'

  static examples = [
    `$ <%= config.bin %> user set
Only one authenticated account found. Setting email:xxx@ciandt.com as default.
Default account set to email:xxx@ciandt.com.`,
    `$ <%= config.bin %> user set --email xxx@ciandt.com
Setting email:xxx@ciandt.com as default.
Default account set to email:xxx@ciandt.com.`,
  ]

  static flags = {
    email: Flags.string({
      description: 'The email of the account to set as default.',
    }),
  }

  protected userService: UserService = new UserService({jsonEnabled: this.jsonEnabled()})

  async run(): Promise<void> {
    const {flags} = await this.parse(Set)

    this.userService.setDebug(flags.debug ?? false)

    const users = await this.userService.getUsers()

    if (users.length === 0) {
      throw this.error('No authenticated accounts found. Please run `citflow login` first.', {exit: 1})
    }

    let user: AuthUser

    if (flags.email) {
      user = {auth: 'email', user: flags.email}
      this.log(`Setting ${colors.cyan('email:' + flags.email)} as default.`)
    } else if (users.length === 1) {
      user = users[0]
      this.warn(`Only one authenticated account found. Setting ${colors.cyan(user.auth + ':' + user.user)} as default.`)
    } else {
      user = await select({
        choices: users.map((user) => ({name: `${user.auth}:${user.user}`, value: user})),
        message: 'Select an account to set as default:',
      })
    }

    await this.userService.setDefaultUser(user)

    this.log(`Default account set to ${colors.cyan(user.auth + ':' + user.user)}.`)
  }
}
