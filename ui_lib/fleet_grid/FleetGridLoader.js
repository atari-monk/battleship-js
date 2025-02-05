import { guiContener } from '../../client/script.js'
import { format } from './../../shared_lib/LogFormatter.js'
import { FLEET_GRID_CONFIG } from '../config.js'

export class FleetGridLoader {
  async load(dataService) {
    const { name, cssClass, id, scripts, loadFleetGridError } =
      FLEET_GRID_CONFIG
    try {
      await guiContener.loadComponentResources(name, scripts)
      const fleetGrid = guiContener.createInstance(name, cssClass, id)

      if (dataService && fleetGrid) {
        fleetGrid.jsInstance.dataService = dataService
      }
    } catch (error) {
      console.error(...format.error(loadFleetGridError, error))
    }
  }
}
