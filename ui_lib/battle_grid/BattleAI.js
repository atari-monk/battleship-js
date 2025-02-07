import { BATTLE_GRID_CONFIG, COLOR } from '../config.js'
import { format } from './../../shared_lib/LogFormatter.js'

class ScreenCoordinates {
  static matrixToScreenCoords(row, col) {
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
}

class AttackHandler {
  constructor(dataService) {
    this.dataService = dataService
  }

  executeAttack(id, event, gridItems) {
    const container = document.getElementById(id)
    const rect = container.getBoundingClientRect()

    const x = event.x - rect.left
    const y = event.y - rect.top

    const cellIndex = this._getCellIndex(x, y, id)
    const cell = gridItems[cellIndex]

    if (cell) {
      this._handleAttack(cell, cellIndex)
    } else {
      throw new Error(BATTLE_GRID_CONFIG.cellError)
    }
  }

  _getCellIndex(x, y, id) {
    const { battleGridCell } = BATTLE_GRID_CONFIG
    const cellSize = document
      .querySelector(`#${id} .${battleGridCell}`)
      .getBoundingClientRect()
    const col = Math.floor(x / cellSize.width)
    const row = Math.floor(y / cellSize.height)
    return row * 10 + col
  }

  _handleAttack(cell, cellIndex) {
    const { red, grey } = COLOR
    const row = Math.floor(cellIndex / 10)
    const col = cellIndex % 10
    const board = this.dataService.getBoard()
    const fleet = this.dataService.getEnemyFleet()

    const isHit = board.hit(row, col, fleet)
    cell.style.backgroundColor = isHit ? red : grey
  }
}

class BattleTurnManager {
  constructor(dataService) {
    this.dataService = dataService
  }

  endTurn() {
    const { battleGrid1, battleGrid2, hiddenStyle } = BATTLE_GRID_CONFIG
    this.dataService.turn.incrementTurn()
    this.dataService.turn.printTurnInfo()

    const currentPlayer = this.dataService.turn.currentPlayer
    const isPlayer1 = currentPlayer === this.dataService.player1.name

    document
      .getElementById(battleGrid1)
      .classList.toggle(hiddenStyle, isPlayer1)
    document
      .getElementById(battleGrid2)
      .classList.toggle(hiddenStyle, !isPlayer1)
  }
}

export class BattleAI {
  constructor(guiContainer, dataService) {
    this.guiContainer = guiContainer
    this.dataService = dataService
    this.attackHandler = new AttackHandler(dataService)
    this.turnManager = new BattleTurnManager(dataService)
  }

  aiMove() {
    const xy = this.dataService.playerAI.attack()
    return ScreenCoordinates.matrixToScreenCoords(xy[0], xy[1])
  }

  handleGlobalAttack(event, id, gridItems, enableClick) {
    this.attackHandler.executeAttack(id, event, gridItems)

    if (this.dataService.getBoard().isWin()) {
      console.debug(
        ...format.debug(`Player ${this.dataService.turn.currentPlayer} WON!`)
      )
      setTimeout(() => {
        console.debug(...format.debug('Wait 3s before reset'))
        this._resetGame()
      }, 3000)
    } else {
      setTimeout(() => {
        console.debug(...format.debug('Wait 2s'))
        this.turnManager.endTurn()
        enableClick()
      }, 2000)
    }
  }

  _resetGame() {
    this.dataService.reset()
    const bg1 = this.guiContainer.getInstanceById(
      BATTLE_GRID_CONFIG.battleGridId1
    )
    const bg2 = this.guiContainer.getInstanceById(
      BATTLE_GRID_CONFIG.battleGridId2
    )
    bg1.jsInstance.resetGrid()
    bg2.jsInstance.resetGrid()
    this.dataService.initializeTurn()
  }
}
