export class PlayerAI {
  constructor(board) {
    this.board = board
    this.hits = []
    this.potentialTargets = []
    this.visited = new Set()
    this.orientation = null
  }

  attack() {
    if (this.noTargetsOrHits()) {
      return this.randomAttack()
    } else if (this.hasPotentialTargets()) {
      return this.targetedAttack()
    } else if (this.hasHits()) {
      this.resetTargeting()
      return this.attack()
    }
  }

  noTargetsOrHits() {
    return this.potentialTargets.length === 0 && this.hits.length === 0
  }

  hasPotentialTargets() {
    return this.potentialTargets.length > 0
  }

  hasHits() {
    return this.hits.length > 0
  }

  randomAttack() {
    const [x, y] = this.getRandomCell()
    const result = this.board.hit(x, y)
    if (result) {
      this.hits.push({ x, y })
      this.addPotentialTargets(x, y)
    }
    return [x, y]
  }

  targetedAttack() {
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
  }

  getRandomCell() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
  }

  addPotentialTargets(x, y) {
    const directions = this.getDirectionsForOrientation()

    for (const [dx, dy] of directions) {
      const newX = x + dx
      const newY = y + dy
      const key = this.getKey(newX, newY)

      if (this.isValidTarget(newX, newY, key)) {
        this.potentialTargets.push({ x: newX, y: newY })
        this.visited.add(key)
      }
    }
  }

  getDirectionsForOrientation() {
    if (this.orientation === null) {
      return [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]
    }

    return this.orientation === 'vertical'
      ? [
          [-1, 0],
          [1, 0],
        ]
      : [
          [0, -1],
          [0, 1],
        ]
  }

  getKey(x, y) {
    return `${x},${y}`
  }

  isValidTarget(x, y, key) {
    return (
      this.board.isWithinBounds(x, y) &&
      !this.visited.has(key) &&
      this.board.isEmpty(x, y)
    )
  }

  determineOrientation() {
    if (this.hits.length < 2 || this.orientation !== null) return

    const [first, second] = this.hits

    if (first.x !== second.x) {
      this.orientation = 'vertical'
    } else if (first.y !== second.y) {
      this.orientation = 'horizontal'
    }

    this.filterPotentialTargets()
  }

  filterPotentialTargets() {
    this.potentialTargets = this.potentialTargets.filter(({ x, y }) => {
      if (this.orientation === 'vertical') {
        return x !== this.hits[0].x
      } else if (this.orientation === 'horizontal') {
        return y !== this.hits[0].y
      }
      return false
    })
  }

  resetTargeting() {
    this.hits = []
    this.potentialTargets = []
    this.orientation = null
  }
}
