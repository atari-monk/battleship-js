import { format } from './../../shared_lib/LogFormatter.js'
import { BATTLE_GRID } from './../config.js'

export class BattleGrid {
  constructor(gridRenderer) {
    this.gridRenderer = gridRenderer
  }

  init(id, isAI = false) {
    console.debug(...format.debug(BATTLE_GRID.initMsg(id)))

    this.gridRenderer.generateGridItems(id, isAI)
  }

  resetGrid() {
    this.gridRenderer.resetGrid()
  }
}
