import { BATTLE_GRID_CONFIG } from '../config.js'
import { format } from './../../shared_lib/LogFormatter.js'
import { AttackHandler } from './AttackHandler.js'
import { BattleTurnManager } from './BattleTurnManager.js'
import { ScreenCoordinates } from './ScreenCoordinates.js'

export class BattleAI {
  constructor(guiContainer, dataService) {
    this.guiContainer = guiContainer
    this.dataService = dataService
    this.attackHandler = new AttackHandler(dataService)
    this.turnManager = new BattleTurnManager(dataService)
  }

  handlePlayerHit(event, id, gridItems, enableClick) {
    this._handleHit(event, id, gridItems, enableClick)
  }

  handleAIHit(id, gridItems, enableClick) {
    this._handleHit(this._aiMove(), id, gridItems, enableClick)
  }

  _aiMove() {
    const xy = this.dataService.playerAI.attack()
    return ScreenCoordinates.matrixToScreenCoords(xy[0], xy[1])
  }

  _handleHit(event, id, gridItems, enableClick) {
    this.attackHandler.executeAttack(id, event, gridItems)

    if (this.dataService.getBoard().isWin()) {
      this._handleWin()
      return
    }

    this._handleEndTurn(enableClick)
  }

  _handleWin() {
    console.debug(
      ...format.debug(`Player ${this.dataService.turn.currentPlayer} WON!`)
    )
    console.debug(...format.debug('Waiting 3s'))
    setTimeout(() => {
      this._resetGame()
    }, 3000)
  }

  _resetGame() {
    this.dataService.reset()
    this._resetBattleGrid(BATTLE_GRID_CONFIG.battleGridId1)
    this._resetBattleGrid(BATTLE_GRID_CONFIG.battleGridId2)
    this.dataService.initializeTurn()
  }

  _resetBattleGrid(id) {
    this.guiContainer.getInstanceById(id).jsInstance.resetGrid()
  }

  _handleEndTurn(enableClick) {
    console.debug(...format.debug('Waiting 2s'))
    setTimeout(() => {
      this.turnManager.endTurn()
      enableClick()
    }, 2000)
  }
}
