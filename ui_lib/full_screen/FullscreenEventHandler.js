import {
  queryObj,
  toggleObj,
  requestFullscreen,
  loadComponentsObj,
} from './../../shared_lib/index.js'

export class FullscreenEventHandler {
  constructor(config, guiContainer) {
    this._config = config
    this._guiContainer = guiContainer
  }

  async handleFullscreenRequest() {
    const { hide, menu } = this._config

    toggleObj({ element: queryObj(hide), ...hide })

    requestFullscreen()

    await loadComponentsObj({
      uiContainer: this._guiContainer,
      ...menu,
    })
  }
}
