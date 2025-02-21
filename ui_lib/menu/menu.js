import { MENU_COMPONENT_CONFIG } from './menu_config.js'
import { FleetGridLoader } from './../fleet_grid/FleetGridLoader.js'
import { ToggleLoader } from './../toggle/ToggleLoader.js'
import { BattleGridLoader } from './../battle_grid/BattleGridLoader.js'
import { ToggleGridsUIController } from './../battle_grid/action/ui/ToggleGridsUIController.js'
import { LoadGameEventHandler } from './LoadGameEventHandler.js'
import { MenuComponent } from './MenuComponent.js'
import { BATTLE_GRID_COMPONENT_CONFIG } from './../battle_grid/config.js'
import { TOGGLE_COMPONENT_CONFIG } from './../toggle/toggle_config.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  const eventHandler = new LoadGameEventHandler(
    MENU_COMPONENT_CONFIG,
    serviceContainer,
    {
      fleetGridLoader: new FleetGridLoader(guiContainer),
      toggleLoader: new ToggleLoader(TOGGLE_COMPONENT_CONFIG, guiContainer),
      battleGridLoader: new BattleGridLoader(
        BATTLE_GRID_COMPONENT_CONFIG,
        guiContainer
      ),
      toggleGridsUIController: new ToggleGridsUIController(),
    }
  )

  return new MenuComponent(MENU_COMPONENT_CONFIG, eventHandler)
}
