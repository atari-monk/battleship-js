export class PlayerAI {
  constructor(ai) {
    this.ai = ai
  }

  move() {
    return this.ai.move()
  }

  getHitXY() {
    this.ai.getHitXY()
  }

  toString() {
    return this.ai.toString()
  }
}
