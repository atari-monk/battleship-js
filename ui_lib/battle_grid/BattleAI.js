import { BATTLE_GRID } from './config.js'
import {
  getRelativeCoordinates,
  getCellPosition,
  matrixToScreen,
  handleAction,
  toggleGrids,
} from './../../shared_lib/ui.js'

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
  constructor(guiContainer, elementService, gameStateService) {
    this._guiContainer = guiContainer
    this._elements = elementService
    this._gameState = gameStateService
    this._actions = {
      win: () => this._handleWin(),
      endTurn: (enableClick) => this._handleEndTurn(enableClick),
    }
  }

  setElements(id) {
    this._elements.setElements(id)
  }

  handlePlayerHit(event, gridItems, enableClick) {
    this._handleHit(event, gridItems, enableClick)
  }

  handleAIHit(gridItems, enableClick) {
    const { gridRect, cellSize } = this._elements
    const [x, y] = this._gameState.aiAttack()
    this._handleHit(
      matrixToScreen({ gridRect, cellSize, row: x, col: y }),
      gridItems,
      enableClick
    )
  }

  _handleHit(event, gridItems, enableClick) {
    this._attack(event, gridItems)
    this._actions[this._gameState.nextAction()](enableClick)
  }

  _attack(event, gridItems) {
    const { x, y } = getRelativeCoordinates(event, this._elements.gridRect)
    const { row, col, index } = getCellPosition(x, y, this._elements.cellSize)
    const cell = gridItems[index]
    if (!cell) throw new Error(BATTLE_GRID.cellError)
    cell.style.backgroundColor = this._gameState.playerAttack(row, col)
      ? BATTLE_GRID.color.red
      : BATTLE_GRID.color.grey
  }

  _handleWin() {
    const { winMsg, waitOnReset, waitMsg } = BATTLE_GRID
    handleAction({
      logMessages: [
        winMsg(this._gameState.getcurrentPlayer()),
        waitMsg(waitOnReset),
      ],
      waitTime: waitOnReset,
      callback: () => this._resetGame(),
    })
  }

  _resetGame() {
    BATTLE_GRID.elementIds.forEach((id) =>
      this._guiContainer.getInstanceById(id).jsInstance.reset()
    )
    this._gameState.reset()
  }

  _handleEndTurn(enableClick) {
    const { waitOnTurn, waitMsg } = BATTLE_GRID
    handleAction({
      logMessages: [waitMsg(waitOnTurn)],
      waitTime: waitOnTurn,
      callback: () => {
        this._endTurn()
        enableClick()
      },
    })
  }

  _endTurn() {
    const { currentPlayer, player1Name } = this._gameState.nextTurn()
    const { elementIds, hiddenStyle } = BATTLE_GRID
    toggleGrids(currentPlayer, player1Name, elementIds, hiddenStyle)
  }
}
