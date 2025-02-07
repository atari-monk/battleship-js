import { BATTLE_GRID_CONFIG, HTML_CONFIG, EVENT } from '../config.js'
import {
  selectElementOrThrow,
  observeVisibilityChange,
  setEventForElement,
} from './../../shared_lib/ui.js'

export class GridRenderer {
  set dataService(dataService) {
    this.battleAI.dataService = dataService
  }

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

    this._createGridCells(grid)

    this.gridItems = document.querySelectorAll(
      BATTLE_GRID_CONFIG.getSelector(id, BATTLE_GRID_CONFIG.battleGridCell)
    )

    isAI
      ? observeVisibilityChange(document.getElementById(id), () =>
          this.handleAIClick()
        )
      : setEventForElement({
          element: grid,
          eventType: EVENT.click,
          handler: (event) => this.handleClick(event, id),
        })
  }

  _createGridCells(grid) {
    for (let i = 1; i <= 100; i++) {
      const gridItem = document.createElement(HTML_CONFIG.div)
      gridItem.classList.add(BATTLE_GRID_CONFIG.battleGridCell)
      grid.appendChild(gridItem)
    }
  }

  handleAIClick() {
    this.battleAI.handleGlobalAtack(
      this.battleAI.aiMove(),
      id,
      this.gridItems,
      () => (this.isPlayerTurn = true)
    )
  }

  handleClick(event, id) {
    if (!this.isPlayerTurn) return
    this.isPlayerTurn = false
    this.battleAI.handleGlobalAtack(event, id, this.gridItems, () => {
      this.isPlayerTurn = true
    })
  }
}
