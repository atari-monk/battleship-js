import { BATTLE_GRID_COMPONENT_CONFIG } from './battle_grid_config.js'
import { BattleGrid } from './BattleGrid.js'
import { GridMetrics } from './../grid/GridMetrics.js'
import { GameStateService } from './GameStateService.js'
import { PlayerEventService } from './PlayerEventService.js'
import { PlayerHitService } from './PlayerHitService.js'
import { AIEventService } from './AIEventService.js'
import { AIHitService } from './AIHitService.js'
import { GridCells } from './../grid/GridCells.js'
import { ActionRegistry } from './action/ActionRegistry.js'
import { ActionResolver } from './action/ActionResolver.js'
import { ActionExecutor } from './action/ActionExecutor.js'
import { GameTurnManager } from './action/logic/GameTurnManager.js'
import { TurnUIController } from './action/ui/TurnUIController.js'
import { GameWinManager } from './action/logic/GameWinManager.js'
import { WinUIController } from './action/ui/WinUIController.js'
import { CellHitManager } from './action/logic/CellHitManager.js'
import { CellHitUIController } from './action/ui/CellHitUIController.js'
import { ToggleGridsUIController } from './action/ui/ToggleGridsUIController.js'

export default function init({ serviceContainer, guiContainer, type } = {}) {
  const configObj = { battleGrid: BATTLE_GRID_COMPONENT_CONFIG }
  const config = configObj.battleGrid

  const dataService = serviceContainer.getService('data_service')
  const gridMetrics = new GridMetrics(config)
  const gameStateService = new GameStateService(config, dataService)

  const cellHitManager = new CellHitManager(gameStateService)
  const turnManager = new GameTurnManager(gameStateService)
  const winManager = new GameWinManager(gameStateService)

  setupUIControllers(
    config,
    cellHitManager,
    turnManager,
    winManager,
    guiContainer
  )

  const actionExecutor = setupActions(turnManager, winManager, gameStateService)

  const eventService = setupEventServices(
    gridMetrics,
    cellHitManager,
    actionExecutor,
    gameStateService
  )

  return new BattleGrid(config, new GridCells(config), eventService[type])
}

function setupUIControllers(
  config,
  cellHitManager,
  turnManager,
  winManager,
  guiContainer
) {
  const toggleGridsUIController = new ToggleGridsUIController(config)
  new CellHitUIController(config, cellHitManager)
  new TurnUIController(config, turnManager, toggleGridsUIController)
  new WinUIController(config, winManager, guiContainer)
}

function setupActions(turnManager, winManager, gameStateService) {
  const actionRegistry = new ActionRegistry()
  actionRegistry.register('endTurn', () => turnManager.endTurn())
  actionRegistry.register('win', () => winManager.declareWin())

  const actionResolver = new ActionResolver(gameStateService)
  return new ActionExecutor(actionRegistry, actionResolver)
}

function setupEventServices(
  gridMetrics,
  cellHitManager,
  actionExecutor,
  gameStateService
) {
  const playerEventService = new PlayerEventService(
    gridMetrics,
    new PlayerHitService(cellHitManager),
    actionExecutor
  )

  const aiEventService = new AIEventService(
    gridMetrics,
    new AIHitService(gameStateService, cellHitManager),
    actionExecutor
  )

  return { player: playerEventService, ai: aiEventService }
}
