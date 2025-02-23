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
