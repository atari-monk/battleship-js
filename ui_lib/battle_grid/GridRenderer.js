import { logger } from './../../data_lib/LogService.js'

export class GridRenderer {
  set dataService(dataService) {
    this._dataService = dataService
  }

  constructor(config) {
    this.gridItems = null
    this.config = config
    this.isFiring = true
  }

  generateGridItems(id, isAI = false) {
    const { cssClass: css, html, event, dot } = this.config
    const gridId = `#${id} ${dot(css.battleGridGrid)}`
    const grid = document.querySelector(gridId)
    if (!grid) {
      throw new Error(`Container with selector ${gridId} not found.`)
    }

    for (let i = 1; i <= 100; i++) {
      const gridItem = document.createElement(html.div)
      gridItem.classList.add(css.battleGridCell)
      grid.appendChild(gridItem)
    }
    this.gridItems = document.querySelectorAll(
      `#${id} ${dot(css.battleGridCell)}`
    )

    grid.addEventListener(event.click, (event) =>
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
    const { cssClass: css, dot } = this.config
    const cell = document.querySelector(
      `#battle-grid-1 ${dot(css.battleGridCell)}`
    )
    const cellSize = cell.getBoundingClientRect()
    const container = document.getElementById('battle-grid-1')
    const containerRect = container.getBoundingClientRect()

    const x = containerRect.left + col * cellSize.width + cellSize.width / 2
    const y = containerRect.top + row * cellSize.height + cellSize.height / 2

    return { x, y }
  }

  getGridItems() {
    if (!this.gridItems) {
      throw new Error('Grid items have not been generated yet.')
    }
    return this.gridItems
  }

  getCellIndex(x, y, id) {
    const { cssClass: css, dot } = this.config
    const cellSize = document
      .querySelector(`#${id} ${dot(css.battleGridCell)}`)
      .getBoundingClientRect()
    const col = Math.floor(x / cellSize.width)
    const row = Math.floor(y / cellSize.height)
    return row * 10 + col
  }

  handleAtack(cell, cellIndex, fleet, board) {
    const row = Math.floor(cellIndex / 10)
    const col = cellIndex % 10

    const isHit = board.hit(row, col, fleet)

    if (isHit) {
      cell.style.backgroundColor = 'rgba(255, 0, 0, 0.7)'
    } else {
      cell.style.backgroundColor = 'rgba(128, 128, 128, 0.7)'
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
      throw new Error('No cell found!')
    }
  }

  endTurn() {
    this._dataService.turn.incrementTurn()
    this._dataService.turn.printTurnInfo()
    if (
      this._dataService.turn.currentPlayer === this._dataService.player1.name
    ) {
      document
        .getElementById('battle-grid-1')
        .classList.add('battle-grid--hidden')
      document
        .getElementById('battle-grid-2')
        .classList.remove('battle-grid--hidden')
    }

    if (
      this._dataService.turn.currentPlayer === this._dataService.player2.name
    ) {
      document
        .getElementById('battle-grid-1')
        .classList.remove('battle-grid--hidden')
      document
        .getElementById('battle-grid-2')
        .classList.add('battle-grid--hidden')
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
