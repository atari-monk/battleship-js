import { LEVEL } from './../../shared_lib_2/constants.js'
import format from './../../shared_lib_2/format.js'
import {
  setEvent,
  selectAndToggle,
  requestFullscreen,
  loadComponents,
} from './../../shared_lib/ui.js'

export class FullScreen {
  constructor(config, guiContainer) {
    this._config = config
    this._guiContainer = guiContainer
    this._init()
  }

  _init() {
    console.debug(format(LEVEL.debug, this._config.message.init))

    setEvent({
      ...this._config.button,
      handler: async (event) => this._requestFullscreen(event),
    })
  }

  async _requestFullscreen() {
    selectAndToggle({ ...this._config.hide })

    requestFullscreen()

    await loadComponents({
      uiContainer: this._guiContainer,
      ...this._config.menu,
    })
  }
}
