import { BattleGrid } from './BattleGrid.js'
import { GridGenerator } from './GridGenerator.js'
import { BattleAI } from './BattleAI.js'
import { BattleLogic } from './BattleLogic.js'
import { AttackHandler } from './AttackHandler.js'
import { BattleTurnManager } from './BattleTurnManager.js'
import { ElementService } from './ElementService.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  const ds = serviceContainer.getServiceByName('data_service')
  const es = new ElementService()

  return new BattleGrid(
    new GridGenerator(
      new BattleAI(
        guiContainer,
        ds,
        new BattleLogic(
          es,
          new AttackHandler(es, ds),
          new BattleTurnManager(ds)
        )
      )
    )
  )
}
