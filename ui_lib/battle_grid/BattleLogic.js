export class BattleLogic {
  constructor(elementService, attackHandler, turnManager) {
    this.elements = elementService
    this.attack = attackHandler
    this.turn = turnManager
  }
}
