export class ShipPreview {
  paintPreview(
    startIndex,
    shipSize,
    isHorizontal,
    placedShips,
    gridItems,
    color
  ) {
    const startRow = Math.floor((startIndex - 1) / 10)
    const startCol = (startIndex - 1) % 10

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
    for (let offset = 0; offset < shipSize; offset++) {
      const currentIndex = startIndex + offset

      if (startCol + offset >= 10 || currentIndex > 100) break

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
    for (let offset = 0; offset < shipSize; offset++) {
      const currentIndex = startIndex + offset * 10
      const currentRow = Math.floor((currentIndex - 1) / 10)

      if (
        currentRow !== startRow + offset ||
        currentIndex > 100 ||
        startCol >= 10
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
        item.style.backgroundColor !== COLOR.blue &&
        item.style.backgroundColor
      ) {
        item.style.backgroundColor = ''
      }
    })
  }
}
