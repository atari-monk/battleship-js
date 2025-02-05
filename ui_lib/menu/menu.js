import { serviceContener } from '../../client/script.js'
import { format } from './../../shared_lib/LogFormatter.js'
import { MENU_CONFIG, MENU_BUTTON, MENU_HIDE } from './../config.js'
import { FleetGridLoader } from './../fleet_grid/FleetGridLoader.js'
import { ToggleLoader } from './../toggle/ToggleLoader.js'
import { BattleGridLoader } from './../battle_grid/BattleGridLoader.js'
import { setEvent, toggle } from './../../shared_lib/ui.js'

export class Menu {
  constructor(fleetGridLoader, toggleLoader, battleGridLoader) {
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
    const { dataServiceName, handleClickError } = MENU_CONFIG
    try {
      toggle({ ...MENU_HIDE })

      const dataService = serviceContener.getServiceByName(dataServiceName)

      if (dataService.config.enableFleetGrid) {
        await this.fleetGridLoader.load(dataService)
        await this.toggleLoader.load()
      } else {
        await this.battleGridLoader.load(dataService)
        dataService.initializeTurn()
        this.battleGridLoader.setVisability(dataService)
      }
    } catch (error) {
      console.error(...format.error(handleClickError, error))
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
