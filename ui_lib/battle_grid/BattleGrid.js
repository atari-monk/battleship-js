import { format } from './../../data_lib/LogService.js'
import { BATTLE_GRID_CONFIG } from './../config.js'

export class BattleGrid {
  constructor(gridRenderer) {
    this.gridItems = null
    this.gridRenderer = gridRenderer
  }

  init(id, isAI = false) {
    this.gridRenderer.generateGridItems(id, isAI)
    this.gridItems = this.gridRenderer.getGridItems()
    console.debug(...format.debug(BATTLE_GRID_CONFIG.initMsg(id)))
  }

  resetGrid() {
    this.gridRenderer.resetGrid()
  }
}
