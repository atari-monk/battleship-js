export class Board {
  constructor(fleet, config) {
    this.fleet = fleet
    this.config = config
    this._matrix = Array(10)
      .fill()
      .map(() => Array(10).fill(0))
    this.hitSum = 0
  }

  get matrix() {
    return this._matrix
  }

  set matrix(newMatrix) {
    if (
      Array.isArray(newMatrix) &&
      newMatrix.length === 10 &&
      newMatrix.every((row) => Array.isArray(row) && row.length === 10)
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
    if (this.fleet.hit(x, y)) {
      this._matrix[x][y] = 1
      this.hitSum++
      return true
    } else {
      this._matrix[x][y] = 2
      return false
    }
  }

  isEmpty(x, y) {
    if (this._matrix[x][y] === 0) return true
    else return false
  }

  isWithinBounds(x, y) {
    return x >= 0 && x < 10 && y >= 0 && y < 10
  }

  isWin() {
    if (this.config.enableTest) return this.hitSum === 1
    else return this.hitSum === 17
  }
}
