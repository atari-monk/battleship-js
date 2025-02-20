import {
  LEVEL,
  format,
  queryObj,
  toggleObj,
} from './../../shared_lib_2/index.js'

export class LoadGameEventHandler {
  constructor(
    config,
    serviceContainer,
    { fleetGridLoader, toggleLoader, battleGridLoader, toggleGridsUIController }
  ) {
    this._config = config
    this._dataService = serviceContainer.getServiceByName(
      config.dependency.dataService
    )
    this._fleetGridLoader = fleetGridLoader
    this._toggleLoader = toggleLoader
    this._battleGridLoader = battleGridLoader
    this._toggleGridsUIController = toggleGridsUIController
  }

  async handleLoadGameRequest() {
    const {
      hide,
      error: { gameLoadingFailed },
    } = this._config
    try {
      toggleObj({ element: queryObj(hide), ...hide })

      await this._loadFleetGrid()
      await this._loadBattleGrid()
    } catch (error) {
      console.error(format(LEVEL.ERROR, gameLoadingFailed, error))
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
