import { BATTLE_GRID } from './config.js'
import { matrixToScreen, handleAction } from './../../shared_lib/ui.js'

/*
This class 
1. Sets Ui elements
2. Handles player move 
3. Handles AI move
4. Handles win
5. Handles next turn
6. Handles reset
Seems like it breaks SRP, 
*/
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
    handleAction({
      logMessages: [
        winMsg(this._dataService.turn.currentPlayer),
        waitMsg(waitOnReset),
      ],
      waitTime: waitOnReset,
      callback: () => this._resetGame(),
    })
  }

  _resetGame() {
    this._dataService.reset()
    BATTLE_GRID.elementIds.forEach((id) =>
      this._guiContainer.getInstanceById(id).jsInstance.reset()
    )
    this._dataService.initializeTurn()
  }

  _handleEndTurn(enableClick) {
    const { waitOnTurn, waitMsg } = BATTLE_GRID
    handleAction({
      logMessages: [waitMsg(waitOnTurn)],
      waitTime: waitOnTurn,
      callback: () => {
        this._battle.turn.endTurn()
        enableClick()
      },
    })
  }
}
