import { convert1DArrayIndexTo2DArrayPosition } from './../../shared_lib_2/index.js'

export class PlacementValidator {
  constructor(config) {
    this._config = config
  }

  validatePlacement(startIndex, shipSize, isHorizontal, placedShips) {
    const { GRID_SIZE, GRID_ITEM_COUNT } = this._config

    const { row: startRow, col: startCol } =
      convert1DArrayIndexTo2DArrayPosition(startIndex, GRID_SIZE, 1)
    //const startRow = Math.floor((startIndex - 1) / GRID_SIZE)
    //const startCol = (startIndex - 1) % GRID_SIZE

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
