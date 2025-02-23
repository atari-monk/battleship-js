export function getCellPosition(x, y, cellSize) {
  const col = Math.floor(x / cellSize.width)
  const row = Math.floor(y / cellSize.height)
  return { row, col, index: row * 10 + col + 1 }
}
