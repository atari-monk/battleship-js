import { LEVEL, format } from './../../shared_lib_2/index.js'
import { loadComponents } from './../../shared_lib/ui.js'

export class BattleGridLoader {
  constructor(config, guiContainer) {
    this._config = config
    this._guiContainer = guiContainer
  }

  async load(dataService) {
    const {
      component: { name, cssClass, elements },
      error: { loadingComponent },
    } = this._config

    try {
      const grids = await loadComponents({
        uiContainer: this._guiContainer,
        componentName: name,
        cssClass,
        elements,
      })

      grids.forEach((grid, index) => {
        grid.init(elements[index].elementId)
        grid.dataService = dataService
      })
    } catch (error) {
      console.error(format(LEVEL.ERROR, loadingComponent, error))
    }
  }
}
