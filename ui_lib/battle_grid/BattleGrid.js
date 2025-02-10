import { format } from './../../shared_lib/LogFormatter.js'
import { BATTLE_GRID } from './config.js'

export class BattleGrid {
  constructor(gridGenerator) {
    this.generator = gridGenerator
  }

  init(id, isAI = false) {
    console.debug(...format.debug(BATTLE_GRID.initMsg(id)))

    this.generator.generate(id, isAI)
  }

  resetGrid() {
    this.generator.resetGrid()
  }
}
