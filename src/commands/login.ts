import BaseCommand from '@abstracts/base'
import {Flags} from '@oclif/core'
import LoginService from '@services/flow/login'

export default class Login extends BaseCommand {
  static description = 'Login to Flow'

  static examples = [
    `$ <%= config.bin %> login
Logging in to Flow...
A browser window has been opened. Please continue the login in the web browser.
Browser window has been closed, processing the login result...
✔ Email: xxx@gmail.com
✔ Principal Tenant: yyy
✔ Active Tenant: zzz
You have successfully logged in to Flow!`,
    '$ <%= config.bin %> login --channel portal',
  ]

  static flags = {
    channel: Flags.string({
      default: 'portal',
      description: 'The channel through which the request is made, affecting the resulting URL.',
      options: ['portal'],
    }),
  }

  protected loginService = new LoginService({jsonEnabled: this.jsonEnabled()})

  async run(): Promise<void> {
    const {flags} = await this.parse(Login)

    this.loginService.setDebug(flags.debug ?? false)

    // Implement the login logic here
    this.log('Logging in to Flow...')

    switch (flags.channel) {
      case 'portal': {
        await this.loginService.authPortal()
        break
      }

      default: {
        throw new Error(`Channel '${flags.channel}' is not supported.`)
      }
    }

    this.log('You have successfully logged in to Flow!')
  }
}
