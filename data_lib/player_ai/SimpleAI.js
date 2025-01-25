export class SimpleAI {
  constructor(board) {
    this.board = board
  }

  move() {
    const [x, y] = this.getHitXY()
    this.board.hit(x, y)
    return [x, y]
  }

  getHitXY() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
  }
}
