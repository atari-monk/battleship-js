export class PlayerAI {
  constructor(board) {
    this.board = board
    this.target = null
    this.hits = []
    this.potentialTargets = []
    this.visited = new Set()
    this.orientation = null
  }

  attack() {
    if (this.potentialTargets.length === 0 && this.target === null) {
      const [x, y] = this.getRandomCell()
      const result = this.board.hit(x, y)
      if (result) {
        this.target = { x, y }
        this.hits.push({ x, y })
        this.addPotentialTargets(x, y)
      }
      return [x, y]
    } else if (this.potentialTargets.length > 0) {
      const { x, y } = this.potentialTargets.shift()
      if (this.board.isEmpty(x, y)) {
        const result = this.board.hit(x, y)
        if (result) {
          this.hits.push({ x, y })
          this.determineOrientation()
          this.addPotentialTargets(x, y)
        }
        return [x, y]
      } else {
        return this.attack()
      }
    } else if (this.target !== null) {
      this.resetTargeting()
      return this.attack()
    }
  }

  getRandomCell() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
  }

  addPotentialTargets(x, y) {
    if (this.orientation === null) {
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]

      for (const [dx, dy] of directions) {
        const newX = x + dx
        const newY = y + dy
        const key = `${newX},${newY}`
        if (
          this.board.isWithinBounds(newX, newY) &&
          !this.visited.has(key) &&
          this.board.isEmpty(newX, newY)
        ) {
          this.potentialTargets.push({ x: newX, y: newY })
          this.visited.add(key)
        }
      }
    } else {
      const offsets =
        this.orientation === 'vertical'
          ? [
              [-1, 0],
              [1, 0],
            ]
          : [
              [0, -1],
              [0, 1],
            ]

      for (const [dx, dy] of offsets) {
        const newX = x + dx
        const newY = y + dy
        const key = `${newX},${newY}`
        if (
          this.board.isWithinBounds(newX, newY) &&
          !this.visited.has(key) &&
          this.board.isEmpty(newX, newY)
        ) {
          this.potentialTargets.push({ x: newX, y: newY })
          this.visited.add(key)
        }
      }
    }
  }

  determineOrientation() {
    if (this.hits.length < 2 || this.orientation !== null) return

    const [first, second] = this.hits

    if (first.x !== second.x) {
      this.orientation = 'vertical'
    } else if (first.y !== second.y) {
      this.orientation = 'horizontal'
    }

    this.potentialTargets = this.potentialTargets.filter(({ x, y }) => {
      if (this.orientation === 'vertical') {
        return x !== this.target.x
      } else if (this.orientation === 'horizontal') {
        return y !== this.target.y
      }
      return false
    })
  }

  resetTargeting() {
    this.target = null
    this.hits = []
    this.potentialTargets = []
    this.orientation = null
  }
}
