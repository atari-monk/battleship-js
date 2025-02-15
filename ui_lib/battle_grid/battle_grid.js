import { BattleGrid } from './BattleGrid.js'
import { ElementService } from './ElementService.js'
import { GameStateService } from './GameStateService.js'
import { CellHitService } from './CellHitService.js'
import { PlayerEventService } from './PlayerEventService.js'
import { PlayerHitService } from './PlayerHitService.js'
import { AIEventService } from './AIEventService.js'
import { AIHitService } from './AIHitService.js'
import { ActionService } from './ActionService.js'
import { EndTurnAction } from './EndTurnAction.js'
import { WinAction } from './WinAction.js'
import { GridCells } from './GridCells.js'

export default function init({ serviceContainer, guiContainer, type } = {}) {
  const ds = serviceContainer.getServiceByName('data_service')
  const es = new ElementService()
  const gss = new GameStateService(ds)

  const as = new ActionService(gss, {
    endTurn: new EndTurnAction(gss),
    win: new WinAction(guiContainer, gss),
  })

  const chs = new CellHitService(gss)
  const pes = new PlayerEventService(es, new PlayerHitService(chs), as)
  const aies = new AIEventService(es, new AIHitService(gss, chs), as)
  const eventService = { player: pes, ai: aies }

  return new BattleGrid(new GridCells(), eventService[type])
}
