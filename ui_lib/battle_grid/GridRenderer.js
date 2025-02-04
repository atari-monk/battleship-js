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
    const { battleGridGrid, battleGridCell, getSelector, notFoundError } =
      BATTLE_GRID_CONFIG
    const gridId = getSelector(id, battleGridGrid)
    const grid = document.querySelector(gridId)
    if (!grid) {
      throw new Error(notFoundError(gridId))
    }

    grid.innerHTML = ''

    for (let i = 1; i <= 100; i++) {
      const gridItem = document.createElement(HTML_CONFIG.div)
      gridItem.classList.add(battleGridCell)
      grid.appendChild(gridItem)
    }
    this.gridItems = document.querySelectorAll(getSelector(id, battleGridCell))

    if (!isAI) {
      grid.addEventListener(EVENT.click, (event) => {
        if (this.isPlayerTurn) {
          this.isPlayerTurn = false
          this.battleAI.handleGlobalAtack(event, id, this.gridItems, () =>
            this.enableClick()
          )
        }
      })
    }

    if (!isAI) return
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

  getGridItems() {
    if (!this.gridItems) {
      throw new Error(BATTLE_GRID_CONFIG.itemsError)
    }
    return this.gridItems
  }

  onVisibilityChange(element, callback) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback()
        }
      })
    })

    observer.observe(element)
  }

  enableClick() {
    this.isPlayerTurn = true
  }

  resetGrid() {
    if (!this.gridItems) {
      throw new Error(BATTLE_GRID_CONFIG.itemsError)
    }
    this.gridItems.forEach((cell) => {
      cell.removeAttribute('style')
    })
    this.enableClick()
  }
}
