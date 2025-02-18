import {
  selectElementOrThrow,
  generateElements,
  selectAll,
} from '../../shared_lib/ui.js'

export class GridCells {
  constructor(config) {
    this._config = config.gridCells
    this.grid = {}
    this.cells = []
  }

  generate(id) {
    const {
      selector,
      cssClass: { gridCssClass, cellCssClass },
    } = this._config

    this.grid = selectElementOrThrow({
      selector: selector(id, gridCssClass),
      isId: false,
    })

    this.grid.innerHTML = ''

    generateElements({
      parentElement: this.grid,
      childCssClassName: cellCssClass,
    })

    this.cells = selectAll(selector(id, cellCssClass))
  }

  reset() {
    if (!this.cells) return
    this.cells.forEach((cell) =>
      cell.removeAttribute(this._config.attribute.style)
    )
  }
}
