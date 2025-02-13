import { BattleGrid } from './BattleGrid.js'
import { BattleAI } from './BattleAI.js'
import { ElementService } from './ElementService.js'
import { GameStateService } from './GameStateService.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  const ds = serviceContainer.getServiceByName('data_service')
  const es = new ElementService()
  const gss = new GameStateService(ds)

  return new BattleGrid(new BattleAI(guiContainer, es, gss))
}
