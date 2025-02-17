import { EventEmitter } from './EventEmitter.js'

export class GameTurnManager extends EventEmitter {
  constructor(gameStateService) {
    super()
    this._gameStateService = gameStateService
  }

  endTurn() {
    const turnInfo = this._gameStateService.nextTurn()
    this.emit('turnChanged', turnInfo)
  }
}
