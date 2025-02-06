import { format } from './../../shared_lib/LogFormatter.js'
import { FLEET_GRID_CONFIG } from '../config.js'

export class FleetGridLoader {
  constructor(guiContainer) {
    this.guiContainer = guiContainer
  }

  async load(dataService) {
    const { name, cssClass, id, scripts, loadFleetGridError } =
      FLEET_GRID_CONFIG
    try {
      await this.guiContainer.loadComponentResources(name, scripts)
      const fleetGrid = this.guiContainer.createInstance(name, cssClass, id)

      if (dataService && fleetGrid) {
        fleetGrid.jsInstance.dataService = dataService
      }
    } catch (error) {
      console.error(...format.error(loadFleetGridError, error))
    }
  }
}
