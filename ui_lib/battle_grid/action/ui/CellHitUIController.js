import { updateColor } from './../../../../shared_lib/ui.js'
import { BATTLE_GRID } from './../../config.js'

export class CellHitUIController {
  constructor(cellHitManager) {
    this.cellHitManager = cellHitManager

    this.cellHitManager.on('cellHit', this.updateCellUI.bind(this))
  }

  updateCellUI({ cells, isHit, index }) {
    if (index < 0 || index >= cells.length) {
      throw new Error('Clicked outside of grid bounds.')
    }

    const cell = cells[index]
    if (!cell) throw new Error(BATTLE_GRID.cellError)

    updateColor({
      element: cell,
      isOn: isHit,
      isOnColor: BATTLE_GRID.color.red,
      isOffColor: BATTLE_GRID.color.grey,
    })
  }
}
