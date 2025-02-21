import { LEVEL, format } from './../../shared_lib_2/index.js'
import { loadComponents } from './../../shared_lib/ui.js'

export class ToggleLoader {
  constructor(config, guiContainer) {
    this._config = config
    this._guiContainer = guiContainer
  }

  async load() {
    const {
      component: { name, cssClass, elements },
      error: { loadingComponent },
    } = this._config

    try {
      await loadComponents({
        uiContainer: this._guiContainer,
        componentName: name,
        cssClass,
        elements,
      })
    } catch (error) {
      console.error(format(LEVEL.ERROR, loadingComponent, error))
    }
  }
}
