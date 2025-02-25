import { generateGridArray } from './../shared/index.js'

export class Board {
  constructor(config, fleet) {
    this._config = config.grid
    this._dataConfig = config.data
    this._fleet = fleet
    this._matrix = generateGridArray(this._config.GRID_SIZE)
    this._hitSum = 0
  }

  get matrix() {
    return this._matrix
  }

  set matrix(newMatrix) {
    const { GRID_SIZE } = this._config

    if (
      Array.isArray(newMatrix) &&
      newMatrix.length === GRID_SIZE &&
      newMatrix.every((row) => Array.isArray(row) && row.length === GRID_SIZE)
    ) {
      this._matrix = newMatrix
    } else {
      throw new Error('Invalid matrix format')
    }
  }

  toString() {
    return `Board:\n\t\t${this._matrix
      .map((row) => row.join(' '))
      .join('\n\t\t')}`
  }

  hit(x, y) {
    const { SHIP_HIT, SHIP_MISS } = this._config

    if (this._fleet.hit(x, y)) {
      this._matrix[x][y] = SHIP_HIT
      this._hitSum++
      return true
    } else {
      this._matrix[x][y] = SHIP_MISS
      return false
    }
  }

  isEmpty(x, y) {
    if (this._matrix[x][y] === this._config.EMPTY) return true
    else return false
  }

  isWithinBounds(x, y) {
    const { GRID_SIZE } = this._config

    return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE
  }

  isWin() {
    const { SHIP_HIT, SHIP_SUM } = this._config

    if (this._dataConfig.enableTest) return this._hitSum === SHIP_HIT
    else return this._hitSum === SHIP_SUM
  }

  reset() {
    this._matrix = generateGridArray(this._config.GRID_SIZE)
    this._hitSum = 0
  }
}
