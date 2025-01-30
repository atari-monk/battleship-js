import { FleetGrid } from './FleetGrid.js'

export default function generate() {
  const fleetGrid = new FleetGrid()
  fleetGrid.init()
  return fleetGrid
}
