import { LEVEL, format } from './../../shared_lib/index.js'

export class FleetGridLoader {
  constructor(config, guiContainer) {
    this._config = config
    this._guiContainer = guiContainer
  }

  async load(dataService) {
    const {
      name,
      cssClass,
      elements: [{ elementId }],
      scripts,
      error: { loader },
    } = this._config

    try {
      await this._guiContainer.loadComponentResources(name, scripts)
      const fleetGrid = this._guiContainer.createInstance(
        name,
        cssClass,
        elementId
      )

      if (dataService && fleetGrid) {
        fleetGrid.jsInstance.dataService = dataService
      }
    } catch (error) {
      console.error(format(LEVEL.ERROR, loader, error))
    }
  }
}
