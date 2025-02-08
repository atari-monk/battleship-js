import { format } from './../../shared_lib/LogFormatter.js'
import { BATTLE_GRID } from './../config.js'

export class BattleGrid {
  constructor(gridRenderer) {
    this.gridItems = null
    this.gridRenderer = gridRenderer
  }

  init(id, isAI = false) {
    this.gridRenderer.generateGridItems(id, isAI)
    this.gridItems = this.gridRenderer.getGridItems()
    console.debug(...format.debug(BATTLE_GRID.initMsg(id)))
  }

  resetGrid() {
    this.gridRenderer.resetGrid()
  }
}
