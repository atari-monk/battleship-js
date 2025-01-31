import { BATTLE_GRID_CONFIG, HTML_CONFIG, EVENT } from '../config.js'

export class GridRenderer {
  set dataService(dataService) {
    this.battleAI.dataService = dataService
  }

  constructor(battleAI) {
    this.battleAI = battleAI
    this.gridItems = null
  }

  generateGridItems(id, isAI = false) {
    const { battleGridGrid, battleGridCell, getSelector, notFoundError } =
      BATTLE_GRID_CONFIG
    const gridId = getSelector(id, battleGridGrid)
    const grid = document.querySelector(gridId)
    if (!grid) {
      throw new Error(notFoundError(gridId))
    }

    for (let i = 1; i <= 100; i++) {
      const gridItem = document.createElement(HTML_CONFIG.div)
      gridItem.classList.add(battleGridCell)
      grid.appendChild(gridItem)
    }
    this.gridItems = document.querySelectorAll(getSelector(id, battleGridCell))

    grid.addEventListener(EVENT.click, (event) =>
      this.battleAI.handleGlobalAtack(event, id, this.gridItems)
    )

    if (!isAI) return
    const board = document.getElementById(id)
    this.onVisibilityChange(board, () => {
      this.battleAI.handleGlobalAtack(
        this.battleAI.aiMove(),
        id,
        this.gridItems
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
}
