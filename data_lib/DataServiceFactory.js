import { Config } from './Config.js'
import { DataService } from './DataService.js'
import { Player } from './Player.js'
import { Fleet } from './Fleet.js'
import { Board } from './Board.js'
import { PlayerAI } from './player_ai/PlayerAI.js'
import { SimpleAI } from './player_ai/SimpleAI.js'
import { PredictiveAI } from './player_ai/PredictiveAI.js'
import { FleetGuess } from './FleetGuess.js'

export class DataServiceFactory {
  async generete() {
    const dataService = new DataService()

    const config = new Config()
    config.enableFleetGrid = true
    config.simpleAI = true
    dataService.config = config

    const fleet1 = new Fleet()
    const fleet2 = new Fleet()

    const board2 = new Board(fleet1)

    dataService.player1 = new Player(
      'Player 1',
      'Captain Jack',
      fleet1,
      new Board(fleet2)
    )
    dataService.player2 = new Player('Player 2', 'Blackbeard', fleet2, board2)

    dataService.playerAI = new PlayerAI(
      config.simpleAI
        ? new SimpleAI(board2)
        : new PredictiveAI(board2, new FleetGuess(board2))
    )

    if (!dataService.enableFleetGrid) {
      await dataService.loadMatricesFromURL('./../client/fleet.json')
    } else dataService.player2.fleet.setFleetRandomly()

    dataService.logPlayers()

    return dataService
  }
}
