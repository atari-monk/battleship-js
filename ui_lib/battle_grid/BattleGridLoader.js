import { LEVEL, format, loadComponentsObj } from './../../shared_lib/index.js'

export class BattleGridLoader {
  constructor(config, guiContainer) {
    this._config = config
    this._guiContainer = guiContainer
  }

  async load(dataService) {
    const {
      name,
      cssClass,
      elements,
      error: { loadingComponent },
    } = this._config

    try {
      const grids = await loadComponentsObj({
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
