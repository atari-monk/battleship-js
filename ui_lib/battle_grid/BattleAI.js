import { BATTLE_GRID } from './config.js'
import { format } from './../../shared_lib/LogFormatter.js'

export class BattleAI {
  constructor(guiContainer, dataService, battleLogic) {
    this._guiContainer = guiContainer
    this._dataService = dataService
    this._battle = battleLogic
  }

  setElements(id) {
    this._battle.elements.setElements(id)
  }

  handlePlayerHit(event, gridItems, enableClick) {
    this._handleHit(event, gridItems, enableClick)
  }

  handleAIHit(gridItems, enableClick) {
    this._handleHit(
      this._matrixToScreen(...this._dataService.playerAI.attack()),
      gridItems,
      enableClick
    )
  }

  _matrixToScreen(row, col) {
    const { gridRect, cellSize } = this._battle.elements
    return {
      x: gridRect.left + col * cellSize.width + cellSize.width / 2,
      y: gridRect.top + row * cellSize.height + cellSize.height / 2,
    }
  }

  _handleHit(event, gridItems, enableClick) {
    this._battle.attack.attack(event, gridItems)

    if (this._dataService.getBoard().isWin()) {
      this._handleWin()
    } else {
      this._handleEndTurn(enableClick)
    }
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

    BATTLE_GRID.elementIds.forEach((id) =>
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
