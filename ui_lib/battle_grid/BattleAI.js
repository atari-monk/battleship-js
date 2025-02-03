import { BATTLE_GRID_CONFIG, COLOR } from '../config.js'
import { logger } from './../../data_lib/LogService.js'

export class BattleAI {
  set dataService(dataService) {
    this._dataService = dataService
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

  handleGlobalAtack(event, id, gridItems, isAI) {
    this.atack(id, event, gridItems)

    if (this._dataService.getBoard().isWin()) {
      if (this._dataService.isPlayer1())
        logger.debug(`Player1 ${this._dataService.turn.currentPlayer} WON!`)
      else logger.debug(`Player2 ${this._dataService.turn.currentPlayer} WON!`)
    }

    if (isAI) {
      setTimeout(() => {
        logger.debug('AI wait 3s')
        this.endTurn()
      }, 3000)
    } else {
      setTimeout(() => {
        logger.debug('Player wait 2s')
        this.endTurn()
      }, 2000)
    }
  }

  atack(id, event, gridItems) {
    const container = document.getElementById(id)
    const rect = container.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const cellIndex = this.getCellIndex(x, y, id)
    const cell = gridItems[cellIndex]

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
}
