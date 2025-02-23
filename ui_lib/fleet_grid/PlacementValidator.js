import { convert1DArrayIndexTo2DArrayPosition } from './../../shared_lib_2/index.js'

export class PlacementValidator {
  constructor(config) {
    this._config = config
  }

  validatePlacement(startIndex, shipSize, isHorizontal, placedShips) {
    const { row: startRow, col: startCol } =
      convert1DArrayIndexTo2DArrayPosition(
        startIndex,
        this._config.GRID_SIZE,
        1
      )

    if (isHorizontal)
      return this._validateHorizontalPlacement(
        startIndex,
        startCol,
        shipSize,
        placedShips
      )
    else
      return this._validateVerticalPlacement(
        startIndex,
        startRow,
        shipSize,
        placedShips
      )
  }

  _validateHorizontalPlacement(startIndex, startCol, shipSize, placedShips) {
    const { GRID_SIZE, GRID_ITEM_COUNT } = this._config

    for (let i = 0; i < shipSize; i++) {
      const currentIndex = startIndex + i
      const currentCol = startCol + i
      const exceedsRightBoundary = currentCol >= GRID_SIZE
      if (
        exceedsRightBoundary ||
        currentIndex > GRID_ITEM_COUNT ||
        placedShips.has(currentIndex)
      ) {
        return false
      }
    }
    return true
  }

  _validateVerticalPlacement(startIndex, startRow, shipSize, placedShips) {
    const { GRID_SIZE, GRID_ITEM_COUNT } = this._config

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
    return true
  }
}
