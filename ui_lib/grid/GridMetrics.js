import { selectElementOrThrow } from '../../shared_lib/ui.js'

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
    this.gridRect = selectElementOrThrow({
      selector: id,
      isId: true,
    }).getBoundingClientRect()
  }

  _setCellSize(id) {
    const {
      selector,
      cssClass: { cellCssClass },
    } = this._config

    this.cellSize = selectElementOrThrow({
      selector: selector(id, cellCssClass),
    }).getBoundingClientRect()
  }
}
