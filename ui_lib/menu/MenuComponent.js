import { format, getByIdObj, EVENT } from './../../shared_lib/index.js'

export class MenuComponent {
  constructor(config, eventHandler) {
    this._config = config
    this._eventHandler = eventHandler
    this._init()
  }

  _init() {
    const {
      button,
      message: { init },
    } = this._config

    console.debug(format(init))

    getByIdObj(button).addEventListener(
      EVENT.CLICK,
      async () => await this._eventHandler.handleLoadGameRequest()
    )
  }
}
