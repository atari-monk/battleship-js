import { BattleGrid } from './BattleGrid.js'
import { GridRenderer } from './GridRenderer.js'

export default function generate() {
  return new BattleGrid(new GridRenderer())
}
