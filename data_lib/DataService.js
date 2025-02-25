import { format, LEVEL } from './../shared_lib/index.js'
import { Turn } from './Turn.js'

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
      this.turn.printTurnInfo()
    } else {
      console.error(
        format(
          LEVEL.ERROR,
          'Players must be initialized before starting turns.'
        )
      )
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
    return this.isPlayer1() ? this.player2.fleet : this.player1.fleet
  }

  getBoard() {
    return this.isPlayer1() ? this.player1.board : this.player2.board
  }

  isPlayer1() {
    return this.turn.currentPlayer === this.player1.name
  }

  toString() {
    return this.config.enableFleetGrid
      ? [this.player2.toString()]
      : [this.player1.toString(), '\n\t', this.player2.toString()].join('')
  }

  logPlayers() {
    console.debug(format(`Load data: \n\t${this.toString()}`))
  }

  async reset() {
    this.player1.reset()
    this.player2.reset()
    this.turn.reset()
    this.playerAI.reset()
    await this.setFleet()
  }

  async setFleet() {
    if (this.setFleetForTest()) return
    if (await this.setFleetFromFile()) return
    this.player1.fleet.setFleetRandomly()
    this.player2.fleet.setFleetRandomly()
  }

  setFleetForTest() {
    if (!this.config.enableTest) return false
    this.player1.fleet.setTestCell()
    this.player2.fleet.setTestCell()
    return true
  }

  async setFleetFromFile() {
    if (!this.config.enableTest) return false
    await this.loadMatricesFromURL('./../client/fleet.json')
    return true
  }
}
