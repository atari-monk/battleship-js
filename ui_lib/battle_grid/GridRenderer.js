import { BATTLE_GRID_CONFIG, HTML_CONFIG, EVENT } from '../config.js'

export class GridRenderer {
  set dataService(dataService) {
    this.battleAI.dataService = dataService
  }

  constructor(battleAI) {
    this.battleAI = battleAI
    this.gridItems = null
    this.isPlayerTurn = true
  }

  generateGridItems(id, isAI = false) {
    const grid = this._getGridElement(id)
    this._createGridCells(grid)
    this.gridItems = document.querySelectorAll(
      BATTLE_GRID_CONFIG.getSelector(id, BATTLE_GRID_CONFIG.battleGridCell)
    )
    isAI ? this._setupAIGrid(id) : this._setupPlayerGrid(grid, id)
  }

  getGridItems() {
    if (!this.gridItems) throw new Error(BATTLE_GRID_CONFIG.itemsError)
    return this.gridItems
  }

  resetGrid() {
    if (!this.gridItems) throw new Error(BATTLE_GRID_CONFIG.itemsError)
    this.gridItems.forEach((cell) => cell.removeAttribute('style'))
    this.enableClick()
  }

  enableClick() {
    this.isPlayerTurn = true
  }

  onVisibilityChange(element, callback) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) callback()
      })
    })

    observer.observe(element)
  }

  _getGridElement(id) {
    const gridId = BATTLE_GRID_CONFIG.getSelector(
      id,
      BATTLE_GRID_CONFIG.battleGridGrid
    )
    const grid = document.querySelector(gridId)
    if (!grid) throw new Error(BATTLE_GRID_CONFIG.notFoundError(gridId))
    grid.innerHTML = ''
    return grid
  }

  _createGridCells(grid) {
    for (let i = 1; i <= 100; i++) {
      const gridItem = document.createElement(HTML_CONFIG.div)
      gridItem.classList.add(BATTLE_GRID_CONFIG.battleGridCell)
      grid.appendChild(gridItem)
    }
  }

  _setupPlayerGrid(grid, id) {
    grid.addEventListener(EVENT.click, (event) => {
      if (this.isPlayerTurn) {
        this.isPlayerTurn = false
        this.battleAI.handleGlobalAtack(event, id, this.gridItems, () =>
          this.enableClick()
        )
      }
    })
  }

  _setupAIGrid(id) {
    const board = document.getElementById(id)
    this.onVisibilityChange(board, () => {
      this.battleAI.handleGlobalAtack(
        this.battleAI.aiMove(),
        id,
        this.gridItems,
        () => this.enableClick()
      )
    })
  }
}
