import { Config } from './Config.js'
import { DataService } from './DataService.js'
import { Player } from './Player.js'
import { Fleet } from './Fleet.js'
import { Board } from './Board.js'
import { PlayerAI } from './../../ai_lib/PlayerAI.js'

export class DataServiceFactory {
  async generete() {
    const dataService = new DataService()

    const config = new Config()
    config.enableFleetGrid = true
    config.loadFleetFromFile = false
    config.enableTest = false
    dataService.config = config

    const fleet1 = new Fleet()
    const fleet2 = new Fleet()

    const board2 = new Board(fleet1, dataService.config)

    dataService.player1 = new Player(
      'Player 1',
      'Captain Jack',
      fleet1,
      new Board(fleet2, dataService.config)
    )
    dataService.player2 = new Player('Player 2', 'Blackbeard', fleet2, board2)

    dataService.playerAI = new PlayerAI(board2)

    if (dataService.config.enableTest) {
      dataService.player1.fleet.setTestCell()
      dataService.player2.fleet.setTestCell()
    } else if (dataService.config.loadFleetFromFile) {
      await dataService.loadMatricesFromURL('./../client/fleet.json')
    } else {
      dataService.player1.fleet.setFleetRandomly()
      dataService.player2.fleet.setFleetRandomly()
    }

    dataService.logPlayers()

    return dataService
  }
}
