import { BattleGrid } from './BattleGrid.js'
import { ElementService } from './ElementService.js'
import { GameStateService } from './GameStateService.js'
import { PlayerEventService } from './PlayerEventService.js'
import { PlayerHitService } from './PlayerHitService.js'
import { AIEventService } from './AIEventService.js'
import { AIHitService } from './AIHitService.js'
import { GridCells } from './GridCells.js'
import { ActionRegistry } from './action/ActionRegistry.js'
import { ActionResolver } from './action/ActionResolver.js'
import { ActionExecutor } from './action/ActionExecutor.js'
import { GameTurnManager } from './action/logic/GameTurnManager.js'
import { TurnUIController } from './action/ui/TurnUIController.js'
import { GameWinManager } from './action/logic/GameWinManager.js'
import { WinUIController } from './action/ui/WinUIController.js'
import { CellHitManager } from './action/logic/CellHitManager.js'
import { CellHitUIController } from './action/ui/CellHitUIController.js'

export default function init({ serviceContainer, guiContainer, type } = {}) {
  const dataService = serviceContainer.getServiceByName('data_service')
  const elementService = new ElementService()
  const gameStateService = new GameStateService(dataService)

  const cellHitManager = new CellHitManager(gameStateService)
  const turnManager = new GameTurnManager(gameStateService)
  const winManager = new GameWinManager(gameStateService)
  new CellHitUIController(cellHitManager)
  new TurnUIController(turnManager)
  new WinUIController(winManager, guiContainer)

  const actionRegistry = new ActionRegistry()
  actionRegistry.register('endTurn', () => turnManager.endTurn())
  actionRegistry.register('win', () => winManager.win())
  const actionResolver = new ActionResolver(gameStateService)
  const actionExecutor = new ActionExecutor(actionRegistry, actionResolver)

  const playerEventService = new PlayerEventService(
    elementService,
    new PlayerHitService(cellHitManager),
    actionExecutor
  )
  const aiEventService = new AIEventService(
    elementService,
    new AIHitService(gameStateService, cellHitManager),
    actionExecutor
  )
  const eventService = { player: playerEventService, ai: aiEventService }

  return new BattleGrid(new GridCells(), eventService[type])
}
