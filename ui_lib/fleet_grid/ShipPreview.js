export class ShipPreview {
  constructor(config) {
    this.config = config
  }

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
      for (let i = 0; i < shipSize; i++) {
        const currentIndex = startIndex + i
        if (startCol + i >= 10 || currentIndex > 100) break
        if (!placedShips.has(currentIndex)) {
          gridItems[currentIndex - 1].style.backgroundColor = color
        }
      }
    } else {
      for (let i = 0; i < shipSize; i++) {
        const currentIndex = startIndex + i * 10
        const currentRow = Math.floor((currentIndex - 1) / 10)
        if (currentRow !== startRow + i || currentIndex > 100 || startCol >= 10)
          break
        if (!placedShips.has(currentIndex)) {
          gridItems[currentIndex - 1].style.backgroundColor = color
        }
      }
    }
  }

  resetPreview(gridItems) {
    gridItems.forEach((item) => {
      if (item.style.backgroundColor === this.config.color.blue) {
        return
      }
      if (item.style.backgroundColor) {
        item.style.backgroundColor = ''
      }
    })
  }
}
