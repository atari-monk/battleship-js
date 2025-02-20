import {
  EVENT,
  format as format2,
  getByIdObj,
} from './../../shared_lib_2/index.js'
import { MENU_COMPONENT_CONFIG } from './menu_config.js'
import { format } from './../../shared_lib/LogFormatter.js'
import { setEvent, selectAndToggle } from './../../shared_lib/ui.js'
import { MENU_CONFIG, MENU_BUTTON, MENU_HIDE } from './../config.js'
import { FleetGridLoader } from './../fleet_grid/FleetGridLoader.js'
import { ToggleLoader } from './../toggle/ToggleLoader.js'
import { BattleGridLoader } from './../battle_grid/BattleGridLoader.js'
import { ToggleGridsUIController } from './../battle_grid/action/ui/ToggleGridsUIController.js'
import { LoadGameEventHandler } from './LoadGameEventHandler.js'

export class Menu {
  constructor(config, eventHandler) {
    this._config = config
    this._eventHandler = eventHandler
    this._init()
  }

  _init() {
    const {
      button,
      message: { init },
    } = this._config

    console.debug(format2(init))

    getByIdObj(button).addEventListener(
      EVENT.CLICK,
      async () => await this._eventHandler.handleLoadGameRequest()
    )
  }
}

export default function init({ serviceContainer, guiContainer } = {}) {
  const eventHandler = new LoadGameEventHandler(
    MENU_CONFIG,
    serviceContainer,
    new FleetGridLoader(guiContainer),
    new ToggleLoader(guiContainer),
    new BattleGridLoader(guiContainer),
    new ToggleGridsUIController()
  )
  return new Menu(MENU_COMPONENT_CONFIG, eventHandler)
}
