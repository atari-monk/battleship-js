export class ActionResolver {
  constructor(gameStateService) {
    this._gameStateService = gameStateService
  }

  resolve() {
    return this._gameStateService.nextAction()
  }
}
