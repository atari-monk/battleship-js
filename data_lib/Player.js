export class Player {
  constructor(role, name, fleet, board) {
    this.role = role
    this.name = name
    this.fleet = fleet
    this.board = board
  }

  toString() {
    return `${this.role} - '${this.name}'\n\t${this.fleet.toString()}`
  }
}
