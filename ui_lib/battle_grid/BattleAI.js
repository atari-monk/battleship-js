import { BATTLE_GRID } from './../config.js'
import { format } from './../../shared_lib/LogFormatter.js'

export class BattleAI {
  constructor(guiContainer, dataService, battleLogic) {
    this._guiContainer = guiContainer
    this._dataService = dataService
    this._battle = battleLogic
  }

  handlePlayerHit(event, id, gridItems, enableClick) {
    this._handleHit(event, id, gridItems, enableClick)
  }

  handleAIHit(id, gridItems, enableClick) {
    this._handleHit(this._aiMove(), id, gridItems, enableClick)
  }

  _aiMove() {
    this._battle.screen.setElements()
    const xy = this._dataService.playerAI.attack()
    return this._battle.screen.matrixToScreen(xy[0], xy[1])
  }

  _handleHit(event, id, gridItems, enableClick) {
    this._battle.attack.executeAttack(id, event, gridItems)

    if (this._dataService.getBoard().isWin()) {
      this._handleWin()
      return
    }

    this._handleEndTurn(enableClick)
  }

  _handleWin() {
    const { winMsg, waitOnReset, waitMsg } = BATTLE_GRID
    console.debug(...format.debug(winMsg(this._dataService.turn.currentPlayer)))
    console.debug(...format.debug(waitMsg(waitOnReset)))
    setTimeout(() => {
      this._resetGame()
    }, waitOnReset)
  }

  _resetGame() {
    this._dataService.reset()
    const { battleGridId1: id1, battleGridId2: id2 } = BATTLE_GRID
    ;[id1, id2].forEach((id) =>
      this._guiContainer.getInstanceById(id).jsInstance.resetGrid()
    )
    this._dataService.initializeTurn()
  }

  _handleEndTurn(enableClick) {
    const { waitOnTurn, waitMsg } = BATTLE_GRID
    console.debug(...format.debug(waitMsg(waitOnTurn)))
    setTimeout(() => {
      this._battle.turn.endTurn()
      enableClick()
    }, waitOnTurn)
  }
}
