import { BattleGrid } from './BattleGrid.js'
import { GridRenderer } from './GridRenderer.js'
import { BattleAI } from './BattleAI.js'

export default function generate() {
  return new BattleGrid(new GridRenderer(new BattleAI()))
}
