import format from './../../shared_lib_2/format.js'
import { requestFullscreen, loadComponents } from './../../shared_lib/ui.js'
import { getByIdObj, queryObj } from './../../shared_lib_2/select.js'
import { toggleObj } from './../../shared_lib_2/style.js'
import { EVENT } from '../../shared_lib_2/constants.js'

export class FullScreen {
  constructor(config, guiContainer) {
    this._config = config
    this._guiContainer = guiContainer
    this._init()
  }

  _init() {
    const {
      button,
      message: { init },
    } = this._config

    console.debug(format(init))

    getByIdObj(button).addEventListener(EVENT.CLICK, async () =>
      this._requestFullscreen()
    )
  }

  async _requestFullscreen() {
    const { hide, menu } = this._config

    toggleObj({ element: queryObj(hide), ...hide })

    requestFullscreen()

    await loadComponents({
      uiContainer: this._guiContainer,
      ...menu,
    })
  }
}
