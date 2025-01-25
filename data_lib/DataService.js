import { Turn } from './Turn.js'
import { logger } from './../data_lib/LogService.js'

export class DataService {
  constructor() {
    this.player1 = null
    this.player2 = null
    this.turn = null
    this.config = null
    this.playerAI = null
  }

  initializeTurn() {
    if (this.player1 && this.player2) {
      this.turn = new Turn(this.player1.name, this.player2.name)
      this.turn.randomlySelectPlayer()
    } else {
      console.error('Players must be initialized before starting turns.')
    }
  }

  async loadMatricesFromURL(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      this.player1.fleet.matrix = data.player1.matrix
      this.player2.fleet.matrix = data.player2.matrix
    } catch (error) {
      throw new Error('Failed to load matrices from URL')
    }
  }

  getEnemyFleet() {
    const player1 = this.turn.currentPlayer === this.player1.name
    return player1 ? this.player2.fleet : this.player1.fleet
  }

  getBoard() {
    const player1 = this.turn.currentPlayer === this.player1.name
    return player1 ? this.player1.board : this.player2.board
  }

  toString() {
    return this.config.enableFleetGrid
      ? [this.player2.toString()]
      : [this.player1.toString(), '\n\t', this.player2.toString()].join('')
  }

  logPlayers() {
    logger.debug(`Load data: \n\t${this.toString()}`)
  }
}
