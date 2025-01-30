import {
  BATTLE_GRID_CONFIG,
  HTML_CONFIG,
  EVENT_CONFIG,
  COLOR,
} from './config.js'

export class GridRenderer {
  set dataService(dataService) {
    this._dataService = dataService
  }

  constructor() {
    this.gridItems = null
    this.isFiring = true
  }

  generateGridItems(id, isAI = false) {
    const { battleGridGrid, battleGridCell, getSelector, notFoundError } =
      BATTLE_GRID_CONFIG
    const gridId = getSelector(id, battleGridGrid)
    const grid = document.querySelector(gridId)
    if (!grid) {
      throw new Error(notFoundError(gridId))
    }

    for (let i = 1; i <= 100; i++) {
      const gridItem = document.createElement(HTML_CONFIG.div)
      gridItem.classList.add(battleGridCell)
      grid.appendChild(gridItem)
    }
    this.gridItems = document.querySelectorAll(getSelector(id, battleGridCell))

    grid.addEventListener(EVENT_CONFIG.click, (event) =>
      this.handleGlobalAtack(event, id)
    )

    if (!isAI) return
    const board = document.getElementById(id)
    this.onVisibilityChange(board, () => {
      this.handleGlobalAtack(this.aiMove(), id)
    })
  }

  aiMove() {
    const xy = this._dataService.playerAI.attack()
    const screenCoords = this.matrixToScreenCoords(xy[0], xy[1])
    return { clientX: screenCoords.x, clientY: screenCoords.y }
  }

  matrixToScreenCoords(row, col) {
    const { battleGridCell, battleGrid1, getSelector } = BATTLE_GRID_CONFIG
    const cell = document.querySelector(
      getSelector(battleGrid1, battleGridCell)
    )
    const cellSize = cell.getBoundingClientRect()
    const container = document.getElementById(battleGrid1)
    const containerRect = container.getBoundingClientRect()

    const x = containerRect.left + col * cellSize.width + cellSize.width / 2
    const y = containerRect.top + row * cellSize.height + cellSize.height / 2

    return { x, y }
  }

  getGridItems() {
    if (!this.gridItems) {
      throw new Error(BATTLE_GRID_CONFIG.itemsError)
    }
    return this.gridItems
  }

  getCellIndex(x, y, id) {
    const { battleGridCell } = BATTLE_GRID_CONFIG
    const cellSize = document
      .querySelector(`#${id} .${battleGridCell}`)
      .getBoundingClientRect()
    const col = Math.floor(x / cellSize.width)
    const row = Math.floor(y / cellSize.height)
    return row * 10 + col
  }

  handleAtack(cell, cellIndex, fleet, board) {
    const { red, grey } = COLOR
    const row = Math.floor(cellIndex / 10)
    const col = cellIndex % 10

    const isHit = board.hit(row, col, fleet)

    if (isHit) {
      cell.style.backgroundColor = red
    } else {
      cell.style.backgroundColor = grey
    }
  }

  handleGlobalAtack(event, id) {
    if (this.isFiring) {
      this.atack(id, event)
      this.isFiring = false
      return
    } else {
      this.endTurn()
      this.isFiring = true
    }
  }

  atack(id, event) {
    const container = document.getElementById(id)
    const rect = container.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const cellIndex = this.getCellIndex(x, y, id)
    const cell = this.gridItems[cellIndex]

    if (cell) {
      this.handleAtack(
        cell,
        cellIndex,
        this._dataService.getEnemyFleet(),
        this._dataService.getBoard()
      )
    } else {
      throw new Error(BATTLE_GRID_CONFIG.cellError)
    }
  }

  endTurn() {
    const { battleGrid1, battleGrid2, hiddenStyle } = BATTLE_GRID_CONFIG
    this._dataService.turn.incrementTurn()
    this._dataService.turn.printTurnInfo()
    if (
      this._dataService.turn.currentPlayer === this._dataService.player1.name
    ) {
      document.getElementById(battleGrid1).classList.add(hiddenStyle)
      document.getElementById(battleGrid2).classList.remove(hiddenStyle)
    }

    if (
      this._dataService.turn.currentPlayer === this._dataService.player2.name
    ) {
      document.getElementById(battleGrid1).classList.remove(hiddenStyle)
      document.getElementById(battleGrid2).classList.add(hiddenStyle)
    }
  }

  onVisibilityChange(element, callback) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback()
        }
      })
    })

    observer.observe(element)
  }
}
