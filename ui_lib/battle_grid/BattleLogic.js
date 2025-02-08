export class BattleLogic {
  constructor(attackHandler, turnManager, screenCoordinates) {
    this.attack = attackHandler
    this.turn = turnManager
    this.screen = screenCoordinates
  }
}
