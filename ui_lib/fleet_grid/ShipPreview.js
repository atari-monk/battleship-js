import { COLOR } from './../../shared_lib_2/index.js'

export class ShipPreview {
  constructor(config) {
    this._config = config
  }

  paintPreview(
    startIndex,
    shipSize,
    isHorizontal,
    placedShips,
    gridItems,
    color
  ) {
    const { GRID_SIZE } = this._config

    const startRow = Math.floor((startIndex - 1) / GRID_SIZE)
    const startCol = (startIndex - 1) % GRID_SIZE

    if (isHorizontal) {
      this.paintHorizontal(
        startIndex,
        shipSize,
        startCol,
        placedShips,
        gridItems,
        color
      )
    } else {
      this.paintVertical(
        startIndex,
        shipSize,
        startRow,
        startCol,
        placedShips,
        gridItems,
        color
      )
    }
  }

  paintHorizontal(
    startIndex,
    shipSize,
    startCol,
    placedShips,
    gridItems,
    color
  ) {
    const { GRID_SIZE, GRID_ITEM_COUNT } = this._config

    for (let offset = 0; offset < shipSize; offset++) {
      const currentIndex = startIndex + offset

      if (startCol + offset >= GRID_SIZE || currentIndex > GRID_ITEM_COUNT)
        break

      if (!placedShips.has(currentIndex)) {
        this.applyColorToGridItem(currentIndex, gridItems, color)
      }
    }
  }

  paintVertical(
    startIndex,
    shipSize,
    startRow,
    startCol,
    placedShips,
    gridItems,
    color
  ) {
    const { GRID_SIZE, GRID_ITEM_COUNT } = this._config

    for (let offset = 0; offset < shipSize; offset++) {
      const currentIndex = startIndex + offset * GRID_SIZE
      const currentRow = Math.floor((currentIndex - 1) / GRID_SIZE)

      if (
        currentRow !== startRow + offset ||
        currentIndex > GRID_ITEM_COUNT ||
        startCol >= GRID_SIZE
      )
        break

      if (!placedShips.has(currentIndex)) {
        this.applyColorToGridItem(currentIndex, gridItems, color)
      }
    }
  }

  applyColorToGridItem(index, gridItems, color) {
    gridItems[index - 1].style.backgroundColor = color
  }

  resetPreview(gridItems) {
    gridItems.forEach((item) => {
      if (
        item.style.backgroundColor !== COLOR.BLUE &&
        item.style.backgroundColor
      ) {
        item.style.backgroundColor = ''
      }
    })
  }
}
