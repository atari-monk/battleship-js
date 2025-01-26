export class PlayerAI {
  constructor(board) {
    this.board = board
    this.target = null // First hit cell
    this.hits = [] // Keep track of all hit cells
    this.potentialTargets = [] // Cells to target
    this.visited = new Set() // Track visited cells
    this.orientation = null // Horizontal or vertical
  }

  attack() {
    if (this.potentialTargets.length === 0 && this.target === null) {
      // Random attack when no ship is being targeted
      const [x, y] = this.getRandomCell()
      const result = this.board.hit(x, y)
      if (result) {
        this.target = { x, y }
        this.hits.push({ x, y }) // Save the first hit
        this.addPotentialTargets(x, y)
      }
      return [x, y]
    } else if (this.potentialTargets.length > 0) {
      // Targeted attack
      const { x, y } = this.potentialTargets.shift()
      if (this.board.isEmpty(x, y)) {
        const result = this.board.hit(x, y)
        if (result) {
          this.hits.push({ x, y }) // Save the new hit
          this.determineOrientation() // Determine orientation if needed
          this.addPotentialTargets(x, y) // Add new cells based on orientation
        }
        return [x, y]
      } else {
        return this.attack() // Skip invalid cells
      }
    } else if (this.target !== null) {
      // If we have hits but no potential targets, fallback
      this.resetTargeting()
      return this.attack()
    }
  }

  getRandomCell() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
  }

  addPotentialTargets(x, y) {
    if (this.orientation === null) {
      // No orientation yet, add all surrounding cells
      const directions = [
        [-1, 0], // Up
        [1, 0], // Down
        [0, -1], // Left
        [0, 1], // Right
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
      // Only add cells in the confirmed orientation
      const offsets =
        this.orientation === 'vertical'
          ? [
              [-1, 0], // Up
              [1, 0], // Down
            ]
          : [
              [0, -1], // Left
              [0, 1], // Right
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
    if (this.hits.length < 2 || this.orientation !== null) return // Orientation needs at least 2 hits

    const [first, second] = this.hits

    if (first.x !== second.x) {
      this.orientation = 'vertical' // Different x-coordinates -> vertical
    } else if (first.y !== second.y) {
      this.orientation = 'horizontal' // Different y-coordinates -> horizontal
    }

    // Prune potential targets to align with the detected orientation
    this.potentialTargets = this.potentialTargets.filter(({ x, y }) => {
      if (this.orientation === 'vertical') {
        return x !== this.target.x // Only keep cells in the same column
      } else if (this.orientation === 'horizontal') {
        return y !== this.target.y // Only keep cells in the same row
      }
      return false
    })
  }

  resetTargeting() {
    // Reset targeting after sinking a ship
    this.target = null
    this.hits = []
    this.potentialTargets = []
    this.orientation = null
  }
}
