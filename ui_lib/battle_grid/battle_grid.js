import { BattleGridConfig } from './BattleGridConfig.js'
import { BattleGrid } from './BattleGrid.js'
import { GridRenderer } from './GridRenderer.js'

export default function generate() {
  const config = new BattleGridConfig()
  const battleGrid = new BattleGrid(config, new GridRenderer(config))
  return battleGrid
}
