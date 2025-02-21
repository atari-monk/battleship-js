import { loadComponentsObj } from './../../shared_lib_2/index.js'

export class ToggleLoader {
  constructor(config, guiContainer) {
    this._config = config
    this._guiContainer = guiContainer
  }

  async load() {
    const {
      component: { name, cssClass, elements },
    } = this._config

    await loadComponentsObj({
      uiContainer: this._guiContainer,
      componentName: name,
      cssClass,
      elements,
    })
  }
}
