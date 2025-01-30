import { guiContener, serviceContener } from '../../client/script.js'
import { logger } from '../../data_lib/LogService.js'
import {
  MENU_CONFIG,
  FLEET_GRID_CONFIG,
  TOGGLE_CONFIG,
  BATTLE_GRID_CONFIG,
} from './../config.js'

export class Menu {
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

  async handleClick() {
    const { dataServiceName, handleClickError } = MENU_CONFIG
    try {
      this.hideMenu()

      const dataService = serviceContener.getServiceByName(dataServiceName)

      if (dataService.config.enableFleetGrid) {
        await this.loadFleetGrid(dataService)
        await this.loadToggle()
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

  async loadFleetGrid(dataService) {
    const { name, cssClass, id, scripts, loadFleetGridError } =
      FLEET_GRID_CONFIG
    try {
      await guiContener.loadComponentResources(name, scripts)
      const fleetGrid = guiContener.createInstance(name, cssClass, id)

      if (dataService && fleetGrid) {
        fleetGrid.jsInstance.dataService = dataService
      }
    } catch (error) {
      logger.error(loadFleetGridError, error)
    }
  }

  async loadToggle() {
    const { name, cssClass, id, loadToggleError } = TOGGLE_CONFIG
    try {
      await guiContener.loadComponentResources(name)
      guiContener.createInstance(name, cssClass, id)
    } catch (error) {
      logger.error(loadToggleError, error)
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
  new Menu().init()
}
