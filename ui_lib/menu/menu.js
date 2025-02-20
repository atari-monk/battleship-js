import { MENU_COMPONENT_CONFIG } from './menu_config.js'
import { FleetGridLoader } from './../fleet_grid/FleetGridLoader.js'
import { ToggleLoader } from './../toggle/ToggleLoader.js'
import { BattleGridLoader } from './../battle_grid/BattleGridLoader.js'
import { ToggleGridsUIController } from './../battle_grid/action/ui/ToggleGridsUIController.js'
import { LoadGameEventHandler } from './LoadGameEventHandler.js'
import { MenuComponent } from './MenuComponent.js'

export default function init({ serviceContainer, guiContainer } = {}) {
  const eventHandler = new LoadGameEventHandler(
    MENU_COMPONENT_CONFIG,
    serviceContainer,
    new FleetGridLoader(guiContainer),
    new ToggleLoader(guiContainer),
    new BattleGridLoader(guiContainer),
    new ToggleGridsUIController()
  )
  return new MenuComponent(MENU_COMPONENT_CONFIG, eventHandler)
}
