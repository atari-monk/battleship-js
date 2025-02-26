import { format } from './../../lib/shared/index.js'

export class Turn {
  constructor(player1Name, player2Name) {
    this.turnNr = 1
    this.players = [player1Name, player2Name]
    this.currentPlayer = null
  }

  randomlySelectPlayer() {
    const randomIndex = Math.floor(Math.random() * this.players.length)
    this.currentPlayer = this.players[randomIndex]
    this.turnNr = 1
  }

  incrementTurn() {
    this.turnNr += 1
    this.counter++
    const currentIndex = this.players.indexOf(this.currentPlayer)
    this.currentPlayer = this.players[(currentIndex + 1) % this.players.length]
  }

  resetTurn() {
    this.turnNr = 1
    this.currentPlayer = null
  }

  printTurnInfo() {
    const currentIndex = this.players.indexOf(this.currentPlayer)

    console.debug(
      format(
        `Turn: ${this.turnNr}, ${
          currentIndex === 0 ? 'Player 1' : 'Player 2'
        } - '${this.currentPlayer}'`
      )
    )
  }

  reset() {
    this.turnNr = 1
    this.currentPlayer = null
    this.players = []
  }
}
