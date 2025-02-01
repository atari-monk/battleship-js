import { serviceContener } from '../../client/script.js'
import { logger } from '../../data_lib/LogService.js'
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
      logger.debug(initMsg)
    } else {
      logger.warn(buttonNotFoundWarn)
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
        dataService.initializeTurn()
        await this.battleGridLoader.load(dataService)
      }
    } catch (error) {
      logger.error(handleClickError, error)
    }
  }

  hideMenu() {
    const { menuDivClass, hiddenStyle, menuNotFoundWarn } = MENU_CONFIG
    const menuElement = document.querySelector(menuDivClass)
    if (menuElement) {
      menuElement.classList.add(hiddenStyle)
    } else {
      logger.warn(menuNotFoundWarn)
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
