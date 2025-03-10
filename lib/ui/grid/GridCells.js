import {
  query,
  queryAll,
  generateElementsObj,
} from './../../shared/index.js'

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

    this.grid = query(selector(id, gridCssClass))

    this.grid.innerHTML = ''

    generateElementsObj({
      parentElement: this.grid,
      childCssClassName: cellCssClass,
    })

    this.cells = queryAll(selector(id, cellCssClass))
  }

  reset() {
    if (!this.cells) return
    this.cells.forEach((cell) =>
      cell.removeAttribute(this._config.attribute.style)
    )
  }
}
