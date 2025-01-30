import { FLEET_GRID_CONFIG, HTML_CONFIG } from './../config.js'

export class GridRenderer {
  constructor() {
    this.gridItems = null
  }

  generateGridItems() {
    const { fleetGridGrid, fleetGridCell, gridError } = FLEET_GRID_CONFIG
    const container = document.querySelector(fleetGridGrid)
    if (!container) {
      throw new Error(gridError(fleetGridGrid))
    }

    for (let i = 1; i <= 100; i++) {
      const gridItem = document.createElement(HTML_CONFIG.div)
      gridItem.classList.add(fleetGridCell)
      container.appendChild(gridItem)
    }
    this.gridItems = document.querySelectorAll(`.${fleetGridCell}`)
  }

  getGridItems() {
    if (!this.gridItems) {
      throw new Error(FLEET_GRID_CONFIG.itemsError)
    }
    return this.gridItems
  }

  getCellIndex(x, y) {
    const { fleetGridCell } = FLEET_GRID_CONFIG
    const cellSize = document
      .querySelector(`.${fleetGridCell}`)
      .getBoundingClientRect()
    const col = Math.floor(x / cellSize.width)
    const row = Math.floor(y / cellSize.height)
    return row * 10 + col + 1
  }
}
