import format from './../../shared_lib_2/format.js'
import {
  setEvent,
  requestFullscreen,
  loadComponents,
} from './../../shared_lib/ui.js'
import { select } from './../../shared_lib_2/select.js'
import { toggle } from './../../shared_lib_2/style.js'

export class FullScreen {
  constructor(config, guiContainer) {
    this._config = config
    this._guiContainer = guiContainer
    this._init()
  }

  _init() {
    console.debug(format(this._config.message.init))

    setEvent({
      ...this._config.button,
      handler: async (event) => this._requestFullscreen(event),
    })
  }

  async _requestFullscreen() {
    const { hide } = this._config
    const element = select(hide)
    toggle({ element, ...hide })

    requestFullscreen()

    await loadComponents({
      uiContainer: this._guiContainer,
      ...this._config.menu,
    })
  }
}
