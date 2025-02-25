import { format } from './../shared/index.js'

export class PlayerAI {
  constructor(board) {
    this.board = board
    this.hits = []
    this.potentialTargets = []
    this.visited = new Set()
    this.orientation = null

    this.preloadedTargets = this.loadMatrixTargets([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ])
  }

  loadMatrixTargets(matrix) {
    const targets = []
    for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix[x].length; y++) {
        if (matrix[x][y] === 1) {
          targets.push({ x, y })
        }
      }
    }
    return targets
  }

  attack() {
    if (this.noTargetsOrHits()) {
      if (this.preloadedTargets.length > 0) {
        console.debug(format(`Preloaded, left ${this.preloadedTargets.length}`))
        return this.attackFromPreloadedTargets()
      } else {
        console.debug(format(`Random, ${100 - this.visited.size}`))
        return this.randomAttack()
      }
    } else if (this.hasPotentialTargets()) {
      console.debug(format(`Targeted`))
      return this.targetedAttack()
    } else if (this.hasHits()) {
      this.resetTargeting()
      return this.attack()
    }
  }

  noTargetsOrHits() {
    return this.potentialTargets.length === 0 && this.hits.length === 0
  }

  attackFromPreloadedTargets() {
    const { x, y } = this.preloadedTargets.shift()
    const result = this.board.hit(x, y)
    this.visited.add(this.getKey(x, y))

    if (result) {
      this.hits.push({ x, y })
      this.addPotentialTargets(x, y)
    }

    return [x, y]
  }

  randomAttack() {
    let x, y
    do {
      ;[x, y] = this.getRandomCell()
    } while (this.visited.has(this.getKey(x, y)))

    const result = this.board.hit(x, y)
    this.visited.add(this.getKey(x, y))

    if (result) {
      this.hits.push({ x, y })
      this.addPotentialTargets(x, y)
    }

    return [x, y]
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

  hasPotentialTargets() {
    return this.potentialTargets.length > 0
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

  hasHits() {
    return this.hits.length > 0
  }

  resetTargeting() {
    this.hits = []
    this.potentialTargets = []
    this.orientation = null
  }

  reset() {
    this.resetTargeting()
    this.visited = new Set()
    this.preloadedTargets = this.loadMatrixTargets([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ])
    this.orientation = null
  }
}
