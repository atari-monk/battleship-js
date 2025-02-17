import { BattleGrid } from './BattleGrid.js'
import { ElementService } from './ElementService.js'
import { GameStateService } from './GameStateService.js'
import { CellHitService } from './CellHitService.js'
import { PlayerEventService } from './PlayerEventService.js'
import { PlayerHitService } from './PlayerHitService.js'
import { AIEventService } from './AIEventService.js'
import { AIHitService } from './AIHitService.js'
import { EndTurnAction } from './EndTurnAction.js'
import { WinAction } from './WinAction.js'
import { GridCells } from './GridCells.js'
import { ActionRegistry } from './action_service/ActionRegistry.js'
import { ActionResolver } from './action_service/ActionResolver.js'
import { ActionExecutor } from './action_service/ActionExecutor.js'

export default function init({ serviceContainer, guiContainer, type } = {}) {
  const dataService = serviceContainer.getServiceByName('data_service')
  const elementService = new ElementService()
  const gameStateService = new GameStateService(dataService)

  const actionRegistry = new ActionRegistry()
  const endTurnAction = new EndTurnAction(gameStateService)
  const winAction = new WinAction(guiContainer, gameStateService)
  actionRegistry.register('endTurn', () => endTurnAction.endTurn())
  actionRegistry.register('win', () => winAction.win())
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
