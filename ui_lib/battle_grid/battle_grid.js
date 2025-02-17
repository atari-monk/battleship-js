import { BattleGrid } from './BattleGrid.js'
import { ElementService } from './ElementService.js'
import { GameStateService } from './GameStateService.js'
import { CellHitService } from './CellHitService.js'
import { PlayerEventService } from './PlayerEventService.js'
import { PlayerHitService } from './PlayerHitService.js'
import { AIEventService } from './AIEventService.js'
import { AIHitService } from './AIHitService.js'
import { GridCells } from './GridCells.js'
import { ActionRegistry } from './action/ActionRegistry.js'
import { ActionResolver } from './action/ActionResolver.js'
import { ActionExecutor } from './action/ActionExecutor.js'
import { GameTurnManager } from './action/GameTurnManager.js'
import { TurnUIController } from './action/TurnUIController.js'
import { GameWinManager } from './action/GameWinManager.js'
import { WinUIController } from './action/WinUIController.js'

export default function init({ serviceContainer, guiContainer, type } = {}) {
  const dataService = serviceContainer.getServiceByName('data_service')
  const elementService = new ElementService()
  const gameStateService = new GameStateService(dataService)

  const turnManager = new GameTurnManager(gameStateService)
  new TurnUIController(turnManager)
  const winManager = new GameWinManager(gameStateService)
  new WinUIController(winManager, guiContainer)

  const actionRegistry = new ActionRegistry()
  actionRegistry.register('endTurn', () => turnManager.endTurn())
  actionRegistry.register('win', () => winManager.win())
  const actionResolver = new ActionResolver(gameStateService)
  const actionExecutor = new ActionExecutor(actionRegistry, actionResolver)

  const cellHitService = new CellHitService(gameStateService)

  const playerEventService = new PlayerEventService(
    elementService,
    new PlayerHitService(cellHitService),
    actionExecutor
  )
  const aiEventService = new AIEventService(
    elementService,
    new AIHitService(gameStateService, cellHitService),
    actionExecutor
  )
  const eventService = { player: playerEventService, ai: aiEventService }

  return new BattleGrid(new GridCells(), eventService[type])
}
