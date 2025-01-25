export class GridRenderer {
  constructor(config) {
    this.config = config
    this.gridItems = null
  }

  generateGridItems() {
    const selector = this.config.dot(this.config.cssClass.fleetGridGrid)
    const container = document.querySelector(selector)
    if (!container) {
      throw new Error(`Container with selector ${selector} not found.`)
    }

    for (let i = 1; i <= 100; i++) {
      const gridItem = document.createElement(this.config.html.div)
      gridItem.classList.add(this.config.cssClass.fleetGridCell)
      container.appendChild(gridItem)
    }
    this.gridItems = document.querySelectorAll(
      this.config.dot(this.config.cssClass.fleetGridCell)
    )
  }

  getGridItems() {
    if (!this.gridItems) {
      throw new Error('Grid items have not been generated yet.')
    }
    return this.gridItems
  }

  getCellIndex(x, y) {
    const cellSize = document
      .querySelector(this.config.dot(this.config.cssClass.fleetGridCell))
      .getBoundingClientRect()
    const col = Math.floor(x / cellSize.width)
    const row = Math.floor(y / cellSize.height)
    return row * 10 + col + 1
  }
}
