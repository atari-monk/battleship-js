export class PredictiveAI {
  constructor(board, fleetGuess) {
    this.board = board
    this.fleetGuess = fleetGuess
  }

  move() {
    const [x, y] = this.getHitXY()
    this.board.hit(x, y)
    return [x, y]
  }

  getHitXY() {
    return this.fleetGuess.getHitXY()
  }

  toString() {
    return this.fleetGuess.toString()
  }
}
