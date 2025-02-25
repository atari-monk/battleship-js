import { getById, query } from './../../shared_lib/index.js'

export class GridMetrics {
  constructor(config) {
    this._config = config.gridCells
    this.isSet = false
  }

  setGridMetrics(id) {
    if (this.isSet) return this

    this._setGridRect(id)
    this._setCellSize(id)

    if (!this.gridRect || !this.cellSize) {
      throw new Error(this._config.error.emptyGridMetrics)
    }

    this.isSet = true

    return this
  }

  _setGridRect(id) {
    this.gridRect = getById(id).getBoundingClientRect()
  }

  _setCellSize(id) {
    const {
      selector,
      cssClass: { cellCssClass },
    } = this._config

    this.cellSize = query(selector(id, cellCssClass)).getBoundingClientRect()
  }
}
