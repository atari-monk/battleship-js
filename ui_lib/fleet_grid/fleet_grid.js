import { FleetGridConfig } from './FleetGridConfig.js'
import { FleetGrid } from './FleetGrid.js'

export default function generate() {
  const fleetGrid = new FleetGrid(new FleetGridConfig())
  fleetGrid.init()
  return fleetGrid
}
