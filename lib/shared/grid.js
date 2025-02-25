import { getByIdObj } from './select.js'
import { toggleObj } from './style.js'

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

export function convert2DArrayToScreenCoords({ gridRect, cellSize, row, col }) {
  return {
    x: gridRect.left + col * cellSize.width + cellSize.width / 2,
    y: gridRect.top + row * cellSize.height + cellSize.height / 2,
  }
}

//todo: move these to file grid_ui.js

export function generateElementsObj({
  parentElement,
  numElements = 100,
  elementType = 'div',
  childCssClassName = '',
}) {
  if (!parentElement) {
    throw new Error('A valid parent element must be provided.')
  }

  for (let i = 1; i <= numElements; i++) {
    const element = document.createElement(elementType)
    if (childCssClassName) {
      element.classList.add(childCssClassName)
    }
    parentElement.appendChild(element)
  }
}

export function toggleGrid(gridId, state, hiddenStyle = 'hidden') {
  toggleObj({
    element: getByIdObj({ id: gridId }),
    cssClass: hiddenStyle,
    forceState: state,
  })
}

export function toggleGrids(currentPlayer, player1Name, gridIds, hiddenStyle) {
  const [id1, id2] = gridIds
  const isPlayer1 = currentPlayer === player1Name

  const activeGrid = isPlayer1 ? id1 : id2
  const inactiveGrid = isPlayer1 ? id2 : id1

  toggleGrid(activeGrid, true, hiddenStyle)
  toggleGrid(inactiveGrid, false, hiddenStyle)
}
