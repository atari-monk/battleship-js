import { EVENT, format, getById } from './../../shared/index.js'

export class ToggleComponent {
  constructor(config, eventHandler) {
    this._config = config
    this._eventHandler = eventHandler
    this._init()
  }

  _init() {
    const {
      message: { init },
      button: { id },
    } = this._config

    console.debug(format(init))

    const element = getById(id)

    this._eventHandler.init(element)

    element.addEventListener(EVENT.CLICK, () =>
      this._eventHandler.handleClick()
    )

    element.addEventListener(
      EVENT.TOUCH_START,
      () => this._eventHandler.handleTouch(),
      { passive: true }
    )
  }
}
