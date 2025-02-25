import { COLOR, updateColor } from './../../../../shared/index.js'

export class CellHitUIController {
  constructor(config, cellHitManager) {
    this._config = config
    this.cellHitManager = cellHitManager

    this.cellHitManager.on('cellHit', this.updateCellUI.bind(this))
  }

  updateCellUI({ cells, isHit, index }) {
    if (index < 0 || index >= cells.length) {
      throw new Error('Clicked outside of grid bounds.')
    }

    const { cellError } = this._config

    const cell = cells[index]
    if (!cell) throw new Error(cellError)

    updateColor({
      element: cell,
      isOn: isHit,
      isOnColor: COLOR.RED,
      isOffColor: COLOR.GREY,
    })
  }
}
