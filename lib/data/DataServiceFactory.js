import { DataService } from './DataService.js'
import { Player } from './Player.js'
import { Fleet } from './Fleet.js'
import { Board } from './Board.js'
import { PlayerAI } from './../ai/PlayerAI.js'

export class DataServiceFactory {
  constructor(config) {
    this._config = config
  }

  async generete() {
    const dataConfig = this._config.data
    const gridConfig = this._config.grid

    const dataService = new DataService()
    dataService.config = dataConfig

    const fleet1 = new Fleet(gridConfig)
    const fleet2 = new Fleet(gridConfig)

    const board2 = new Board(this._config, fleet1)

    dataService.player1 = new Player(
      'Player 1',
      'Captain Jack',
      fleet1,
      new Board(this._config, fleet2)
    )
    dataService.player2 = new Player('Player 2', 'Blackbeard', fleet2, board2)

    dataService.playerAI = new PlayerAI(board2)

    if (dataConfig.enableTest) {
      dataService.player1.fleet.setTestCell()
      dataService.player2.fleet.setTestCell()
    } else if (dataConfig.loadFleetFromFile) {
      await dataService.loadMatricesFromURL('./../client/fleet.json')
    } else {
      dataService.player1.fleet.setFleetRandomly()
      dataService.player2.fleet.setFleetRandomly()
    }

    dataService.logPlayers()

    return dataService
  }
}
