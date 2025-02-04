export class Fleet {
  constructor() {
    this._matrix = Array(10)
      .fill()
      .map(() => Array(10).fill(0))
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

  isValidPlacement(row, col, length, direction) {
    if (direction === 'horizontal') {
      if (col + length > 10) return false
      for (let i = 0; i < length; i++) {
        if (this._matrix[row][col + i] !== 0) return false
      }
    } else {
      if (row + length > 10) return false
      for (let i = 0; i < length; i++) {
        if (this._matrix[row + i][col] !== 0) return false
      }
    }
    return true
  }

  placeShip(row, col, length, direction) {
    if (direction === 'horizontal') {
      for (let i = 0; i < length; i++) {
        this._matrix[row][col + i] = 1
      }
    } else {
      for (let i = 0; i < length; i++) {
        this._matrix[row + i][col] = 1
      }
    }
  }

  setFleetRandomly() {
    const ships = [5, 4, 3, 3, 2]
    const directions = ['horizontal', 'vertical']

    for (const ship of ships) {
      let placed = false

      while (!placed) {
        const row = Math.floor(Math.random() * 10)
        const col = Math.floor(Math.random() * 10)
        const direction = directions[Math.floor(Math.random() * 2)]

        if (this.isValidPlacement(row, col, ship, direction)) {
          this.placeShip(row, col, ship, direction)
          placed = true
        }
      }
    }
  }

  setTestCell() {
    this._matrix[0][0] = 1
  }

  toString() {
    return `Fleet:\n\t\t${this._matrix
      .map((row) => row.join(' '))
      .join('\n\t\t')}`
  }

  hit(x, y) {
    if (this._matrix[x][y] === 1) {
      return true
    } else {
      return false
    }
  }
}
