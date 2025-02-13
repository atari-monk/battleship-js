import { BATTLE_GRID } from './config.js'
import {
  getRelativeCoordinates,
  getCellPosition,
  matrixToScreen,
  handleAction,
  toggleGrids,
  updateColor,
} from './../../shared_lib/ui.js'

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
    const { x, y } = getRelativeCoordinates(event, this._elements.gridRect)
    const { row, col, index } = getCellPosition(x, y, this._elements.cellSize)
    const isHit = this._gameState.attackCell(row, col)
    const cell = gridItems[index]
    if (!cell) throw new Error(BATTLE_GRID.cellError)
    updateColor({
      element: cell,
      isOn: isHit,
      isOnColor: BATTLE_GRID.color.red,
      isOffColor: BATTLE_GRID.color.grey,
    })
    this._actions[this._gameState.nextAction()](enableClick)
  }

  _handleWin() {
    const { winMsg, waitOnReset, waitMsg } = BATTLE_GRID
    handleAction({
      logMessages: [
        winMsg(this._gameState.getcurrentPlayer()),
        waitMsg(waitOnReset),
      ],
      waitTime: waitOnReset,
      callback: () => {
        BATTLE_GRID.elementIds.forEach((id) =>
          this._guiContainer.getInstanceById(id).jsInstance.reset()
        )
        this._gameState.reset()
      },
    })
  }

  _handleEndTurn(enableClick) {
    const { waitOnTurn, waitMsg } = BATTLE_GRID
    handleAction({
      logMessages: [waitMsg(waitOnTurn)],
      waitTime: waitOnTurn,
      callback: () => {
        const { currentPlayer, player1Name } = this._gameState.nextTurn()
        const { elementIds, hiddenStyle } = BATTLE_GRID
        toggleGrids(currentPlayer, player1Name, elementIds, hiddenStyle)
        enableClick()
      },
    })
  }
}
