import { guiContener, serviceContener } from '../../client/script.js'
import { logger } from '../../data_lib/LogService.js'

export class Menu {
  constructor() {
    this.config = {
      startButtonId: 'gameMenuStartButton',
      clickEvent: 'click',
      initMsg: 'Load component: menu',
      menuDivClass: '.game-menu',
      hiddenStyle: 'game-menu--hidden',
      dataServiceName: 'data_service',
    }
    this.fleetGrid = {
      name: 'fleet_grid',
      cssClass: 'fleet-grid',
      id: 'fleet-grid-1',
      scripts: [
        'EventHandler.js',
        'FleetGridConfig.js',
        'FleetGridConfig.js',
        'FleetService.js',
        'GridRenderer.js',
        'PlacementValidator.js',
        'ShipPreview.js',
        'PlacementHandler.js',
        'FleetGrid.js',
      ],
    }
    this.toggle = {
      name: 'toggle',
      cssClass: 'toggle',
      id: 'toggle-1',
    }
    this.battleGrid = {
      name: 'battle_grid',
      cssClass: 'battle-grid',
      id1: 'battle-grid-1',
      id2: 'battle-grid-2',
      hiddenStyle: 'battle-grid--hidden',
    }
    this.error = {
      handleClick: 'Error in handleClick:',
      loadFleetGrid: 'Error in loadFleetGrid:',
      loadToggle: 'Error in loadToggle:',
      loadBattleGrid: 'Error in loadBattleGrid:',
    }
    this.warn = {
      buttonNotFound: 'Menu start button not found',
      menuNotFound: 'Menu div not found',
    }
  }

  init() {
    const { startButtonId, clickEvent, initMsg } = this.config
    const startButton = document.getElementById(startButtonId)
    if (startButton) {
      startButton.addEventListener(clickEvent, async () => {
        await this.handleClick()
      })
      logger.debug(initMsg)
    } else {
      logger.warn(this.warn.buttonNotFound)
    }
  }

  async handleClick() {
    try {
      const { dataServiceName } = this.config
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
      logger.error(this.error.handleClick, error)
    }
  }

  hideMenu() {
    const { menuDivClass, hiddenStyle } = this.config
    const menuElement = document.querySelector(menuDivClass)
    if (menuElement) {
      menuElement.classList.add(hiddenStyle)
    } else {
      logger.warn(this.warn.menuNotFound)
    }
  }

  async loadFleetGrid(dataService) {
    try {
      const { name, cssClass, id, scripts } = this.fleetGrid

      await guiContener.loadComponentResources(name, scripts)
      const fleetGrid = guiContener.createInstance(name, cssClass, id)

      if (dataService && fleetGrid) {
        fleetGrid.jsInstance.dataService = dataService
      }
    } catch (error) {
      logger.error(this.error.loadFleetGrid, error)
    }
  }

  async loadToggle() {
    try {
      const { name, cssClass, id } = this.toggle

      await guiContener.loadComponentResources(name)
      guiContener.createInstance(name, cssClass, id)
    } catch (error) {
      logger.error(this.error.loadToggle, error)
    }
  }

  async loadBattleGrid(dataService) {
    try {
      const { name, cssClass, id1, id2, hiddenStyle } = this.battleGrid
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
      logger.error(this.error.loadBattleGrid, error)
    }
  }
}

export default function init() {
  new Menu().init()
}
