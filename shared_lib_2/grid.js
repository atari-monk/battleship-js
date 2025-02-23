export function generateGridArray(gridSize) {
  return Array.from({ length: gridSize }, () => Array(gridSize).fill(0))
}

export function convertScreenCoordsTo2DArrayPosition(x, y, cellSize) {
  const col = Math.floor(x / cellSize.width)
  const row = Math.floor(y / cellSize.height)
  return { row, col }
}

export function convert2DArrayPositionTo1DArrayIndex(
  row,
  col,
  numColumns,
  offset = 0
) {
  return row * numColumns + col + offset
}

export function getCellPosition(x, y, cellSize, numColumns, offset = 0) {
  const { row, col } = convertScreenCoordsTo2DArrayPosition(x, y, cellSize)
  const index = convert2DArrayPositionTo1DArrayIndex(
    row,
    col,
    numColumns,
    offset
  )
  return { row, col, index }
}

export function convert1DArrayIndexTo2DArrayPosition(
  index,
  numColumns,
  offset = 0
) {
  const row = Math.floor((index - offset) / numColumns)
  const col = (index - offset) % numColumns
  return { row, col }
}

export function calculateVerticalIndex(startIndex, i, GRID_SIZE) {
  return startIndex + i * GRID_SIZE
}

export function getRowFromIndex(currentIndex, GRID_SIZE) {
  return Math.floor((currentIndex - 1) / GRID_SIZE)
}
