import { BATTLE_GRID } from './config.js'
import {
  selectElementOrThrow,
  generateElements,
  observeVisibilityChange,
  setEventForElement,
} from '../../shared_lib/ui.js'

export class GridGenerator {
  constructor(battleAI) {
    this.battleAI = battleAI
    this.isPlayerTurn = true
  }

  generate(id, isAI = false) {
    const { getSelector, battleGridGrid, battleGridCell } = BATTLE_GRID

    const grid = selectElementOrThrow({
      selector: getSelector(id, battleGridGrid),
      isId: false,
    })
    grid.innerHTML = ''

    generateElements({
      parentElement: grid,
      className: battleGridCell,
    })

    this._setEventHandlers(isAI, id, grid)

    this.gridItems = document.querySelectorAll(getSelector(id, battleGridCell))
  }

  reset() {
    if (!this.gridItems) throw new Error(BATTLE_GRID.itemsError)
    this.gridItems.forEach((cell) => cell.removeAttribute('style'))
    this.isPlayerTurn = true
  }

  _setEventHandlers(isAI, id, grid) {
    isAI
      ? observeVisibilityChange(document.getElementById(id), () => {
          this.battleAI.setElements(id)

          this.battleAI.handleAIHit(
            this.gridItems,
            () => (this.isPlayerTurn = true)
          )
        })
      : setEventForElement({
          element: grid,
          eventType: BATTLE_GRID.event.click,
          handler: (event) => this._handleClick(event, id),
        })
  }

  _handleClick(event, id) {
    this.battleAI.setElements(id)

    if (!this.isPlayerTurn) return
    this.isPlayerTurn = false
    this.battleAI.handlePlayerHit(event, this.gridItems, () => {
      this.isPlayerTurn = true
    })
  }
}
