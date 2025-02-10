import { FleetGrid } from './FleetGrid.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  const fleetGrid = new FleetGrid(guiContainer)
  fleetGrid.init()
  return fleetGrid
}
