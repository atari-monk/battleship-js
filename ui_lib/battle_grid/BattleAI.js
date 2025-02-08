import { BATTLE_GRID } from '../config.js'
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
    const { winMsg, waitOnReset, waitMsg } = BATTLE_GRID
    console.debug(...format.debug(winMsg(this.dataService.turn.currentPlayer)))
    console.debug(...format.debug(waitMsg(waitOnReset)))
    setTimeout(() => {
      this._resetGame()
    }, waitOnReset)
  }

  _resetGame() {
    this.dataService.reset()
    const { battleGridId1: id1, battleGridId2: id2 } = BATTLE_GRID
    ;[id1, id2].forEach((id) =>
      this.guiContainer.getInstanceById(id).jsInstance.resetGrid()
    )
    this.dataService.initializeTurn()
  }

  _handleEndTurn(enableClick) {
    const { waitOnTurn, waitMsg } = BATTLE_GRID
    console.debug(...format.debug(waitMsg(waitOnTurn)))
    setTimeout(() => {
      this.turnManager.endTurn()
      enableClick()
    }, waitOnTurn)
  }
}
