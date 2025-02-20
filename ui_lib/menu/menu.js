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

export class Menu {
  constructor(
    config,
    serviceContainer,
    fleetGridLoader,
    toggleLoader,
    battleGridLoader,
    toggleGridsUIController
  ) {
    this._config = config
    this.dataService = serviceContainer.getServiceByName(
      MENU_CONFIG.dataServiceName
    )
    this.fleetGridLoader = fleetGridLoader
    this.toggleLoader = toggleLoader
    this.battleGridLoader = battleGridLoader
    this.toggleGridsUIController = toggleGridsUIController
  }

  init() {
    const {
      button,
      message: { init },
    } = this._config

    console.debug(format2(init))

    getByIdObj(button).addEventListener(
      EVENT.CLICK,
      async () => await this.handleClick()
    )

    // setEvent({
    //   ...MENU_BUTTON,
    //   handler: async () => {
    //     await this.handleClick()
    //   },
    // })
  }

  async handleClick() {
    try {
      selectAndToggle({ ...MENU_HIDE })
      await this.loadFleetGrid()
      await this.loadBattleGrid()
    } catch (error) {
      console.error(...format.error(MENU_CONFIG.handleClickError, error))
    }
  }

  async loadFleetGrid() {
    if (!this.dataService.config.enableFleetGrid) return
    await this.fleetGridLoader.load(this.dataService)
    await this.toggleLoader.load()
  }

  async loadBattleGrid() {
    if (this.dataService.config.enableFleetGrid) return
    await this.battleGridLoader.load(this.dataService)
    this.dataService.initializeTurn()
    this.toggleGridsUIController.toggleGrids({
      currentPlayer: this.dataService.turn.currentPlayer,
      player1Name: this.dataService.player1.name,
    })
  }
}

export default function init({ serviceContainer, guiContainer } = {}) {
  const menu = new Menu(
    MENU_COMPONENT_CONFIG,
    serviceContainer,
    new FleetGridLoader(guiContainer),
    new ToggleLoader(guiContainer),
    new BattleGridLoader(guiContainer),
    new ToggleGridsUIController()
  )
  menu.init()
  return menu
}
