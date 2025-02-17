import { EventEmitter } from './EventEmitter.js'

export class GameWinManager extends EventEmitter {
  constructor(gameStateService) {
    super()
    this._gameStateService = gameStateService
  }

  declareWin() {
    const winner = this._gameStateService.getcurrentPlayer()
    this.emit('gameWon', { winner })

    this._gameStateService.reset()
  }
}
