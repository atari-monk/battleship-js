import { BattleGrid } from './BattleGrid.js'
import { GridRenderer } from './GridRenderer.js'
import { BattleAI } from './BattleAI.js'
import { BattleLogic } from './BattleLogic.js'
import { AttackHandler } from './AttackHandler.js'
import { BattleTurnManager } from './BattleTurnManager.js'
import { ScreenCoordinates } from './ScreenCoordinates.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  const ds = serviceContainer.getServiceByName('data_service')

  return new BattleGrid(
    new GridRenderer(
      new BattleAI(
        guiContainer,
        ds,
        new BattleLogic(
          new AttackHandler(ds),
          new BattleTurnManager(ds),
          new ScreenCoordinates()
        )
      )
    )
  )
}
