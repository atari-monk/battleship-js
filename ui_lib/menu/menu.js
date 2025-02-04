import { serviceContener } from '../../client/script.js'
import { format } from '../../data_lib/LogService.js'
import { MENU_CONFIG } from './../config.js'
import { FleetGridLoader } from './../fleet_grid/FleetGridLoader.js'
import { ToggleLoader } from './../toggle/ToggleLoader.js'
import { BattleGridLoader } from './../battle_grid/BattleGridLoader.js'

export class Menu {
  constructor(fleetGridLoader, toggleLoader, battleGridLoader) {
    this.fleetGridLoader = fleetGridLoader
    this.toggleLoader = toggleLoader
    this.battleGridLoader = battleGridLoader
  }

  init() {
    const { startButtonId, clickEvent, initMsg, buttonNotFoundWarn } =
      MENU_CONFIG
    const startButton = document.getElementById(startButtonId)
    if (startButton) {
      startButton.addEventListener(clickEvent, async () => {
        await this.handleClick()
      })
      console.debug(...format.debug(initMsg))
    } else {
      console.warn(...format.warn(buttonNotFoundWarn))
    }
  }

  async loadFleetGrid(dataService) {
    await this.fleetGridLoader.load(dataService)
    await this.toggleLoader.load()
  }

  async handleClick() {
    const { dataServiceName, handleClickError } = MENU_CONFIG
    try {
      this.hideMenu()

      const dataService = serviceContener.getServiceByName(dataServiceName)

      if (dataService.config.enableFleetGrid) {
        await this.loadFleetGrid(dataService)
      } else {
        await this.battleGridLoader.load(dataService)
        dataService.initializeTurn()
        this.battleGridLoader.setVisability(dataService)
      }
    } catch (error) {
      console.error(...format.error(handleClickError, error))
    }
  }

  hideMenu() {
    const { menuDivClass, hiddenStyle, menuNotFoundWarn } = MENU_CONFIG
    const menuElement = document.querySelector(menuDivClass)
    if (menuElement) {
      menuElement.classList.add(hiddenStyle)
    } else {
      console.warn(...format.warn(menuNotFoundWarn))
    }
  }
}

export default function init() {
  new Menu(
    new FleetGridLoader(),
    new ToggleLoader(),
    new BattleGridLoader()
  ).init()
}
