export class PlacementValidator {
  constructor(gridSize = 10) {
    this.gridSize = gridSize
  }

  validatePlacement(startIndex, shipSize, isHorizontal, placedShips) {
    const startRow = Math.floor((startIndex - 1) / 10)
    const startCol = (startIndex - 1) % 10

    if (isHorizontal) {
      for (let i = 0; i < shipSize; i++) {
        const currentIndex = startIndex + i
        const currentCol = startCol + i
        if (
          currentCol >= this.gridSize ||
          currentIndex > 100 ||
          placedShips.has(currentIndex)
        ) {
          return false
        }
      }
    } else {
      for (let i = 0; i < shipSize; i++) {
        const currentIndex = startIndex + i * 10
        const currentRow = Math.floor((currentIndex - 1) / 10)
        if (
          currentRow !== startRow + i ||
          currentIndex > 100 ||
          placedShips.has(currentIndex)
        ) {
          return false
        }
      }
    }
    return true
  }
}
