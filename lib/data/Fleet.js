import { generateGridArray } from './../shared/index.js'

export class Fleet {
  constructor(config) {
    this._config = config
    this._matrix = generateGridArray(this._config.GRID_SIZE)
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

  isValidPlacement(row, col, length, direction) {
    const { GRID_SIZE, EMPTY } = this._config

    if (direction === 'horizontal') {
      if (col + length > GRID_SIZE) return false
      for (let i = 0; i < length; i++) {
        if (this._matrix[row][col + i] !== EMPTY) return false
      }
    } else {
      if (row + length > GRID_SIZE) return false
      for (let i = 0; i < length; i++) {
        if (this._matrix[row + i][col] !== EMPTY) return false
      }
    }
    return true
  }

  placeShip(row, col, length, direction) {
    const { SHIP_HIT } = this._config

    if (direction === 'horizontal') {
      for (let i = 0; i < length; i++) {
        this._matrix[row][col + i] = SHIP_HIT
      }
    } else {
      for (let i = 0; i < length; i++) {
        this._matrix[row + i][col] = SHIP_HIT
      }
    }
  }

  setFleetRandomly() {
    const { GRID_SIZE, SHIP_SIZES } = this._config

    const directions = ['horizontal', 'vertical']

    for (const ship of SHIP_SIZES) {
      let placed = false

      while (!placed) {
        const row = Math.floor(Math.random() * GRID_SIZE)
        const col = Math.floor(Math.random() * GRID_SIZE)
        const direction = directions[Math.floor(Math.random() * 2)]

        if (this.isValidPlacement(row, col, ship, direction)) {
          this.placeShip(row, col, ship, direction)
          placed = true
        }
      }
    }
  }

  setTestCell() {
    this._matrix[0][0] = this._config.SHIP_HIT
  }

  toString() {
    return `Fleet:\n\t\t${this._matrix
      .map((row) => row.join(' '))
      .join('\n\t\t')}`
  }

  hit(x, y) {
    if (this._matrix[x][y] === this._config.SHIP_HIT) {
      return true
    } else {
      return false
    }
  }

  reset() {
    this._matrix = generateGridArray(this._config.GRID_SIZE)
  }
}
