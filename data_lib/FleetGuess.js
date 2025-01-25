export class FleetGuess {
  constructor(board) {
    this.board = board
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

  toString() {
    return `Fleet Guess:\n\t\t${this._matrix
      .map((row) => row.join(' '))
      .join('\n\t\t')}`
  }

  copyBoardMatrix() {
    this._matrix = this.board.matrix.map((row) => row.slice())
  }

  predictFleetPlacement() {
    this.copyBoardMatrix()
  }

  getHitXY() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
  }
}
