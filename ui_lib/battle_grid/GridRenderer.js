import { EVENT, BATTLE_GRID } from '../config.js'
import {
  selectElementOrThrow,
  generateElements,
  observeVisibilityChange,
  setEventForElement,
} from './../../shared_lib/ui.js'

export class GridRenderer {
  constructor(battleAI) {
    this.battleAI = battleAI
    this.gridItems = null
    this.isPlayerTurn = true
  }

  resetGrid() {
    if (!this.gridItems) throw new Error(BATTLE_GRID.itemsError)
    this.gridItems.forEach((cell) => cell.removeAttribute('style'))
    this.isPlayerTurn = true
  }

  getGridItems() {
    if (!this.gridItems) throw new Error(BATTLE_GRID.itemsError)
    return this.gridItems
  }

  generateGridItems(id, isAI = false) {
    const grid = selectElementOrThrow({
      selector: BATTLE_GRID.getSelector(id, BATTLE_GRID.battleGridGrid),
      isId: false,
    })

    grid.innerHTML = ''

    generateElements({
      parentElement: grid,
      className: BATTLE_GRID.battleGridCell,
    })

    this.gridItems = document.querySelectorAll(
      BATTLE_GRID.getSelector(id, BATTLE_GRID.battleGridCell)
    )

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
          eventType: EVENT.click,
          handler: (event) => this.handleClick(event, id),
        })
  }

  handleClick(event, id) {
    this.battleAI.setElements(id)
    if (!this.isPlayerTurn) return
    this.isPlayerTurn = false
    this.battleAI.handlePlayerHit(event, this.gridItems, () => {
      this.isPlayerTurn = true
    })
  }
}
