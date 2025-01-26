export class PlayerAI {
  constructor(board) {
    this.board = board
    this.target = null
    this.x1 = { check: false, hit: false }
    this.x2 = { check: false, hit: false }
  }

  attack() {
    if (this.target === null) {
      const [x, y] = this.getRandomCell()
      const result = this.board.hit(x, y)
      if (result) {
        this.target = { x, y }
      }
      return [x, y]
    } else {
      if (
        !this.x1.check &&
        this.board.isEmpty(this.target.x - 1, this.target.y)
      ) {
        this.x1.check = true
        this.x1.hit = this.board.hit(this.target.x - 1, this.target.y)
        return [this.target.x - 1, this.target.y]
      }
      if (
        this.x1.check &&
        this.x1.hit &&
        !this.x2.check &&
        this.board.isEmpty(this.target.x - 2, this.target.y)
      ) {
        this.x2.check = true
        this.x2.hit = this.board.hit(this.target.x - 2, this.target.y)
        return [this.target.x - 2, this.target.y]
      }
    }
  }

  getRandomCell() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
  }
}
