import { format, EVENT, getByIdObj } from '../../shared_lib_2/index.js'

export class FullScreenComponent {
  constructor(config, guiContainer, eventHandler) {
    this._config = config
    this._guiContainer = guiContainer
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
      async () => await this._eventHandler.handleFullscreenRequest()
    )
  }
}
