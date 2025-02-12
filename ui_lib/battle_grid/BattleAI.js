import { BATTLE_GRID } from './config.js'
import { format } from './../../shared_lib/LogFormatter.js'
import { matrixToScreen } from './../../shared_lib/ui.js'

export class BattleAI {
  constructor(guiContainer, dataService, battleLogic) {
    this._guiContainer = guiContainer
    this._dataService = dataService
    this._battle = battleLogic
    this._actions = {
      win: () => this._handleWin(),
      endTurn: (enableClick) => this._handleEndTurn(enableClick),
    }
  }

  setElements(id) {
    this._battle.elements.setElements(id)
  }

  handlePlayerHit(event, gridItems, enableClick) {
    this._handleHit(event, gridItems, enableClick)
  }

  handleAIHit(gridItems, enableClick) {
    const { gridRect, cellSize } = this._battle.elements
    const [x, y] = this._dataService.playerAI.attack()
    this._handleHit(
      matrixToScreen({ gridRect, cellSize, row: x, col: y }),
      gridItems,
      enableClick
    )
  }

  _handleHit(event, gridItems, enableClick) {
    this._battle.attack.attack(event, gridItems)
    const action = this._dataService.getBoard().isWin()
      ? BATTLE_GRID.actions.win
      : BATTLE_GRID.actions.endTurn
    this._actions[action](enableClick)
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
