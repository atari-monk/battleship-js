import { format } from './../../shared_lib_2/index.js'

export class BattleGrid {
  constructor(config, gridCells, eventService) {
    this._config = config
    this._girdCells = gridCells
    this._eventService = eventService
  }

  init(id) {
    const {
      message: { init },
    } = this._config

    console.debug(format(init(id)))

    this._girdCells.generate(id)

    const { grid, cells } = this._girdCells
    
    this._eventService.setEvent(id, grid, cells)
  }

  reset() {
    this._girdCells.reset()
  }
}
