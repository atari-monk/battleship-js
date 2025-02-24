import { MENU_COMPONENT_CONFIG } from './menu_config.js'
import { TOGGLE_COMPONENT_CONFIG } from './../toggle/toggle_config.js'
import { FLEET_GRID_COMPONENT_CONFIG } from './../fleet_grid/fleet_grid_config.js'
import { BATTLE_GRID_COMPONENT_CONFIG } from './../battle_grid/battle_grid_config.js'

import { FleetGridLoader } from './../fleet_grid/FleetGridLoader.js'
import { ToggleLoader } from './../toggle/ToggleLoader.js'
import { BattleGridLoader } from './../battle_grid/BattleGridLoader.js'
import { ToggleGridsUIController } from './../battle_grid/action/ui/ToggleGridsUIController.js'
import { LoadGameEventHandler } from './LoadGameEventHandler.js'
import { MenuComponent } from './MenuComponent.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  const config = {
    menu: MENU_COMPONENT_CONFIG,
    fleetGrid: FLEET_GRID_COMPONENT_CONFIG,
    toggle: TOGGLE_COMPONENT_CONFIG,
    battleGrid: BATTLE_GRID_COMPONENT_CONFIG,
  }

  const eventHandler = new LoadGameEventHandler(config.menu, serviceContainer, {
    fleetGridLoader: new FleetGridLoader(config.fleetGrid, guiContainer),
    toggleLoader: new ToggleLoader(config.toggle, guiContainer),
    battleGridLoader: new BattleGridLoader(config.battleGrid, guiContainer),
    toggleGridsUIController: new ToggleGridsUIController(config.battleGrid),
  })

  return new MenuComponent(config.menu, eventHandler)
}
