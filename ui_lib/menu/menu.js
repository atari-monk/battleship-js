import { format } from './../../shared_lib/LogFormatter.js'
import { setEvent, selectAndToggle } from './../../shared_lib/ui.js'
import { MENU_CONFIG, MENU_BUTTON, MENU_HIDE } from './../config.js'
import { FleetGridLoader } from './../fleet_grid/FleetGridLoader.js'
import { ToggleLoader } from './../toggle/ToggleLoader.js'
import { BattleGridLoader } from './../battle_grid/BattleGridLoader.js'

export class Menu {
  constructor(
    serviceContainer,
    fleetGridLoader,
    toggleLoader,
    battleGridLoader
  ) {
    this.dataService = serviceContainer.getServiceByName(
      MENU_CONFIG.dataServiceName
    )
    this.fleetGridLoader = fleetGridLoader
    this.toggleLoader = toggleLoader
    this.battleGridLoader = battleGridLoader
  }

  init() {
    console.debug(...format.debug(MENU_CONFIG.initMsg))
    setEvent({
      ...MENU_BUTTON,
      handler: async () => {
        await this.handleClick()
      },
    })
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
    this.battleGridLoader.setVisability(this.dataService)
  }
}

export default function init({ serviceContainer, guiContainer } = {}) {
  new Menu(
    serviceContainer,
    new FleetGridLoader(guiContainer),
    new ToggleLoader(guiContainer),
    new BattleGridLoader()
  ).init()
}
