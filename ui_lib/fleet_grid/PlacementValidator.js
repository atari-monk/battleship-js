import {
  convert1DArrayIndexTo2DArrayPosition,
  calculateVerticalIndex,
  getRowFromIndex,
} from './../../shared_lib/index.js'

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
    const { GRID_SIZE } = this._config

    for (let i = 0; i < shipSize; i++) {
      const currentIndex = startIndex + i
      const currentCol = startCol + i

      const exceedsRightBoundary = currentCol >= GRID_SIZE
      const { exceedsGridBounds, shipAlreadyPlaced } =
        this._checkPlacementConditions(currentIndex, placedShips)

      if (exceedsRightBoundary || exceedsGridBounds || shipAlreadyPlaced) {
        return false
      }
    }
    return true
  }

  _validateVerticalPlacement(startIndex, startRow, shipSize, placedShips) {
    const { GRID_SIZE } = this._config

    for (let i = 0; i < shipSize; i++) {
      const currentIndex = calculateVerticalIndex(startIndex, i, GRID_SIZE)
      const currentRow = getRowFromIndex(currentIndex, GRID_SIZE)

      const isVerticalAlignmentCorrect = currentRow !== startRow + i
      const { exceedsGridBounds, shipAlreadyPlaced } =
        this._checkPlacementConditions(currentIndex, placedShips)

      if (
        isVerticalAlignmentCorrect ||
        exceedsGridBounds ||
        shipAlreadyPlaced
      ) {
        return false
      }
    }
    return true
  }

  _checkPlacementConditions(currentIndex, placedShips) {
    const { GRID_ITEM_COUNT } = this._config
    const exceedsGridBounds = currentIndex > GRID_ITEM_COUNT
    const shipAlreadyPlaced = placedShips.has(currentIndex)

    return { exceedsGridBounds, shipAlreadyPlaced }
  }
}
