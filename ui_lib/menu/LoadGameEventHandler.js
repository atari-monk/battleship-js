import { MENU_CONFIG, MENU_HIDE } from './../config.js'
import { selectAndToggle } from './../../shared_lib/ui.js'

export class LoadGameEventHandler {
  constructor(
    config,
    serviceContainer,
    fleetGridLoader,
    toggleLoader,
    battleGridLoader,
    toggleGridsUIController
  ) {
    this._config = config
    this._dataService = serviceContainer.getServiceByName(
      MENU_CONFIG.dataServiceName
    )
    this._fleetGridLoader = fleetGridLoader
    this._toggleLoader = toggleLoader
    this._battleGridLoader = battleGridLoader
    this._toggleGridsUIController = toggleGridsUIController
  }

  async handleLoadGameRequest() {
    try {
      selectAndToggle({ ...MENU_HIDE })

      await this._loadFleetGrid()
      await this._loadBattleGrid()
    } catch (error) {
      console.error(...format.error(MENU_CONFIG.handleClickError, error))
    }
  }

  async _loadFleetGrid() {
    if (!this._dataService.config.enableFleetGrid) return

    await this._fleetGridLoader.load(this._dataService)

    await this._toggleLoader.load()
  }

  async _loadBattleGrid() {
    if (this._dataService.config.enableFleetGrid) return

    await this._battleGridLoader.load(this._dataService)

    this._dataService.initializeTurn()

    this._toggleGridsUIController.toggleGrids({
      currentPlayer: this._dataService.turn.currentPlayer,
      player1Name: this._dataService.player1.name,
    })
  }
}
