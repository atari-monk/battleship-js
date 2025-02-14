export class ActionService {
  constructor(gameStateService, { endTurn, win }) {
    this._gameStateService = gameStateService
    this._actions = {
      endTurn: () => endTurn.endTurn(),
      win: () => win.win(),
    }
  }

  action() {
    this._actions[this._gameStateService.nextAction()]()
  }
}
