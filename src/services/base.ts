import Logger from '@utils/logger'

type Config = {
  debug?: boolean
  jsonEnabled?: boolean
}

export default abstract class BaseService {
  protected config?: Config

  protected jsonEnabled = false

  protected logger: Logger

  constructor(config?: Config) {
    this.logger = new Logger(this.constructor.name, {jsonEnabled: config?.jsonEnabled})
    this.config = config
  }

  public setDebug(debug: boolean): this {
    this.config = {...this.config, debug}
    return this
  }
}
