import { EVENT, BATTLE_GRID_CONFIG } from '../config.js'
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
    if (!this.gridItems) throw new Error(BATTLE_GRID_CONFIG.itemsError)
    this.gridItems.forEach((cell) => cell.removeAttribute('style'))
    this.isPlayerTurn = true
  }

  getGridItems() {
    if (!this.gridItems) throw new Error(BATTLE_GRID_CONFIG.itemsError)
    return this.gridItems
  }

  generateGridItems(id, isAI = false) {
    const grid = selectElementOrThrow({
      selector: BATTLE_GRID_CONFIG.getSelector(
        id,
        BATTLE_GRID_CONFIG.battleGridGrid
      ),
      isId: false,
    })

    grid.innerHTML = ''

    generateElements({
      parentElement: grid,
      className: BATTLE_GRID_CONFIG.battleGridCell,
    })

    this.gridItems = document.querySelectorAll(
      BATTLE_GRID_CONFIG.getSelector(id, BATTLE_GRID_CONFIG.battleGridCell)
    )

    isAI
      ? observeVisibilityChange(document.getElementById(id), () =>
          this.handleAIClick(id)
        )
      : setEventForElement({
          element: grid,
          eventType: EVENT.click,
          handler: (event) => this.handleClick(event, id),
        })
  }

  handleAIClick(id) {
    this.battleAI.handleGlobalAttack(
      this.battleAI.aiMove(),
      id,
      this.gridItems,
      () => (this.isPlayerTurn = true)
    )
  }

  handleClick(event, id) {
    if (!this.isPlayerTurn) return
    this.isPlayerTurn = false
    this.battleAI.handleGlobalAttack(event, id, this.gridItems, () => {
      this.isPlayerTurn = true
    })
  }
}
