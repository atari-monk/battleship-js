import { guiContener, serviceContener } from '../../client/script.js'
import { logger } from '../../data_lib/LogService.js'
import { MENU_CONFIG, BATTLE_GRID_CONFIG } from './../config.js'
import { FleetGridLoader } from './../fleet_grid/FleetGridLoader.js'
import { ToggleLoader } from './../toggle/ToggleLoader.js'

export class Menu {
  constructor(fleetGridLoader, toggleLoader) {
    this.fleetGridLoader = fleetGridLoader
    this.toggleLoader = toggleLoader
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
        await this.loadBattleGrid(dataService)
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

  async loadBattleGrid(dataService) {
    const { name, cssClass, id1, id2, hiddenStyle, loadBattleGridError } =
      BATTLE_GRID_CONFIG
    try {
      await guiContener.loadComponentResources(name)
      const battleGrid1 = guiContener.createInstance(
        name,
        cssClass,
        id1
      ).jsInstance
      const battleGrid2 = guiContener.createInstance(
        name,
        cssClass,
        id2
      ).jsInstance

      battleGrid1.init(id1, true)
      battleGrid2.init(id2)

      if (dataService && battleGrid1 && battleGrid2) {
        battleGrid1.gridRenderer.dataService = dataService
        battleGrid2.gridRenderer.dataService = dataService
      }

      if (dataService.turn.currentPlayer === dataService.player1.name) {
        document.getElementById(id1).classList.add(hiddenStyle)
      }
      if (dataService.turn.currentPlayer === dataService.player2.name) {
        document.getElementById(id2).classList.add(hiddenStyle)
      }

      dataService.turn.printTurnInfo()
    } catch (error) {
      logger.error(loadBattleGridError, error)
    }
  }
}

export default function init() {
  new Menu(new FleetGridLoader(), new ToggleLoader()).init()
}
