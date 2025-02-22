export class PlacementValidator {
  constructor(config) {
    this._config = config
  }

  validatePlacement(startIndex, shipSize, isHorizontal, placedShips) {
    const { GRID_SIZE, GRID_ITEM_COUNT } = this._config

    const startRow = Math.floor((startIndex - 1) / GRID_SIZE)
    const startCol = (startIndex - 1) % GRID_SIZE

    if (isHorizontal) {
      for (let i = 0; i < shipSize; i++) {
        const currentIndex = startIndex + i
        const currentCol = startCol + i
        if (
          currentCol >= this.gridSize ||
          currentIndex > GRID_ITEM_COUNT ||
          placedShips.has(currentIndex)
        ) {
          return false
        }
      }
    } else {
      for (let i = 0; i < shipSize; i++) {
        const currentIndex = startIndex + i * GRID_SIZE
        const currentRow = Math.floor((currentIndex - 1) / GRID_SIZE)
        if (
          currentRow !== startRow + i ||
          currentIndex > GRID_ITEM_COUNT ||
          placedShips.has(currentIndex)
        ) {
          return false
        }
      }
    }
    return true
  }
}
