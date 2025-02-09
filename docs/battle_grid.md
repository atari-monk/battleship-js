# Battle Grid

## BattleAI

This `BattleAI` class manages the AI's behavior during a battle game. It handles the AI's and player's moves, including executing attacks, checking for a win, and resetting the game when needed. It interacts with several other components like `AttackHandler` for attack logic, `BattleTurnManager` for managing turns, and `ScreenCoordinates` for converting between matrix and screen coordinates. It also ensures the flow of the game is smooth by managing events like ending turns and handling win conditions.