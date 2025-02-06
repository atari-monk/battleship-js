# Log Task 2025

## 1

### 10

1. 10:04 - 10:36, Project reorganization.
2. 10:37 - 10:43, Docs reorganization.
3. 10:44 - 11:34, Organizing mail; Moving ship.
4. 13:29 - 14:29, Improving cable organization to level well.
5. 14:30 - 15:31, Horizontal/Vertical ship orientation.
6. 15:32 - 15:55, Improve desk, new music.
7. 17:54 - 18:08, Ship placement validation.
8. 18:09 - 18:33, Coffee, 10 pushups, 4 min step.
9. 18:34 - 19:27, Ship placement.
10. 20:31 - 22:04, Toggle button.
11. 22:05 - 23:15, Toggle button in grid.

### 11

1. 13:10 - 15:00, Integrate grid to page.
2. 21:31 - 22:20, Fix toogle button; Ship is not moved to it on switching orientation; Remove divs now generated in load component function.

### 12

1. 16:22 - 16:56, Place fleet.
2. 16:56 - 17:12, Mobile version and pc version of grid are mostly same code so there will be no separate version at this point. Maybe release will be separate.
3. 17:13 - 17:27, Refactor proj structure again.
4. 17:28 - 18:01, Fleet placment data.
5. 18:02 - 18:37, Passing dataService form app module to components and set grid data for player1.
6. 21:45 - 21:53, Test of fleet placing and battle in one grid; Better do them as separate components.

### 13

1. 08:57 - 10:15, Generate fleet placing component.  
   Strings to vars.
2. 12:27 - 13:14, Generate battle component.
3. 18:50 - 20:04, Encapsulated fleet grid module in class.
4. 20:05 - 20:27, PlacementValidator class.
5. 20:28 - 20:52, ShipPreview class.
6. 22:38 - 23:32, GridRenderer class.

### 14

1. 07:53 - 08:14, EventHandler class.
2. 10:02 - 11:04, FleetLogic class.
3. 14:52 - 15:27, PlacementHandler class.
4. 15:47 - 16:29, FleetGridConfig class.
5. 18:57 - 20:47, Using Fleet Grid component with many js in page, updated component loader for this.

### 15

1. 13:06 - 15:46, Component system; From one method loading component to 4 classes.

### 16

1. 10:47 - 11:07, component_service - gui component classes
2. 11:08 - 11:41, use new guiContener in page
3. 13:37 - 15:20, load components setters with dependency on service
4. 17:13 - 17:45, fixed toggle ship orientation button

### 17

1. 06:24 - 06:45, set fleet for player2
2. 06:46 - 07:30, battle grid SOLID
3. 08:09 - 08:49, hide fleet grid and toogle
4. 08:50 - 09:06, load battle grid
5. 09:51 - 12:34, test grid in component battle grid fleet (test page in component folder)
6. 17:20 - 18:26, react to ship hit using fleet placement data in gui

### 18

1. 05:47 - 06:19, feat(data): add game turn model
2. 06:20 - 07:10, refactor(config): fix config format
3. 07:11 - 08:15, refactor(proj): structure reorganization
4. 09:18 - 10:06, fix battle grid config
5. 10:07 - 10:22, feat(grid): use battle grid with fleet data
6. 11:03 - 12:03, refactor(log): make log tell a game story in numbered list
7. 12:40 - 14:15, feat(grid): show data for current player in battle grid, refactor(config): config for menu
8. 14:16 - 14:26, reaserched next changes needed
9. 16:00 - 16:34, implementing rearch
10. 17:52 - 19:18, feat(grid): two components on one page enabled, battlegrid for current player in turn 1

- Total 493 min = 8 hours and 14 minutes
- Honest day work :)

### 19

1. 09:36 - 10:22, refactor(log): improved numbered logs
2. 13:25 - 14:10, fix(grid): bugs in selectors of battle grid renderer
3. 14:11 - 16:49, debuging why it dosent work
4. 20:14 - 22:54, fix(grid): component now provides factory to gen new instance

- Total 409 min = 6 hours 49 minutes
- Important bug fixed.  
  The bug was that the component was using a single instance of the battle grid when it actually needed two instances for separate UI updates.  
  Because there was only one shared instance of the grid, only one UI was being updated, leading to incorrect rendering.  
  After adding a factory to generate two separate instances of the grid, it properly handles multiple turns and ensure both grids rendered and updated correctly.

### 20

1. 13:14 - 13:44, fix(log): consistent log format
2. 13:45 - 14:57, feat(data): fleet data for test; numbered logger; disable fleetGrid
3. 17:41 - 18:35, refactor(board): extract board class, toStrings
4. 18:36 - 19:31, feat(board): load data from json

- Total 211 min = 3 hours 31 minutes

### 21

1. 06:33 - 07:24, feat(board): callback for AI
2. 09:32 - 11:19, feat(board): battleship ai
3. 13:15 - 14:11, refactor(AI): simple ai
4. 14:17 - 15:28, feat(board): predict ships
5. 15:29 - 16:31, feat(board): boilerplate to predictions of board
6. 17:04 - 18:31, feat(prototype): check free spaces on board

- Total 434 min = 7 hours 14 minutes
- Calculating enemy move

### 22

1. 14:19 - 16:32, refactor(predictor): implement board space counting
2. 20:57 - 21:07, feat(spaceCounter): enhance space counting logic and improve logging output
3. 21:21 - 22:43, feat(board): initialize board data and allow dynamic board generation
4. 22:44 - 23:55, feat(predictor): for 2x2 game, problem framing

- Total 296 min = 4 hours 56 minutes

### 23

1. 08:40 - 09:15, feat(predictor): ship placement logic horizontal and vertical methods
2. 09:19 - 09:37, feat(predictor): implement automated ship placement and board filling logic
3. 09:38 - 09:44 ,refactor(spaceCounter): remove SimpleSpaceCounter and SpaceCounter classes
4. 10:04 - 10:39, feat(predictor): implement multiple game handling
5. 10:40 - 11:56, feat(predictor): enhance ship placement logic with new methods
6. 11:57 - 13:39, feat(predictor): add cell counting and filler methods for enhanced board prediction
7. 16:48 - 18:04, feat(predictor): add coordinate conversion for improved board interaction
8. 18:05 - 19:32, refactor(predictor): simplify ship placement logic and remove unused methods, all combinations of moves in 2x2 game case

- Total 435 min = 7 hours 15 minutes
- Predicted all combinations of 2x2 game case, to learn something about predicting batleship grid

### 24

1. 11:10 - 11:25, chore(predictor): move 2x2 predictor prototype
2. 11:26 - 11:43, feat(predictor): add 10x10 predictor prototype
3. 15:25 - 18:10, feat(predictor): implement random fleet placement and utility methods for board management

- Total 197 min = 3 hours 17 minutes

### 25

1. 06:30 - 11:55, chore(predictor): remove unused 10x10 predictor files, hard fail
2. 17:47 - 18:26
3. 20:02 - 20:36, initialize battleship-js project with core files; (filtered proj files to new repo) 

- Total 398 min = 6 hours 38 minutes

### 26

1. 15:53 - 18:22, refactor: update AI logic and remove unused classes
2. 20:50 - 21:34, feat: enhance PlayerAI with targeted attack logic
3. 21:42 - 22:20, refactor: streamline attack logic in PlayerAI with helper methods

- Total 231 minutes = 3 hours 51 minutes

### 27

1. 16:00 - 17:00
2. 18:47 - 19:21, refactor: PlayerAI, doc
3. 19:22 - 23:00, feat: enhance PlayerAI with preloaded targeting logic

- Total 312 minutes = 5 hours 12 minutes

### 28

1. 14:08 - 15:18, refactor: FullScreen class for improved configuration and event handling,  
                  refactor: improve error handling and logging in FullScreen class methods
2. 16:30 - 17:25, refactor: Menu class structure and enhance error handling
3. 17:26 - 19:00, refactor: extract configuration constants for FullScreen and Menu classes

- Total 219 minutes = 3 hours 39 minutes

### 29

1. 11:00 - 12:08, refactor: Toggle class with configuration, event handling
2. 14:45 - 15:11, refactor: centralize event configuration in FLEET_GRID_CONFIG and simplify EventHandler 
3. 15:12 - 16:30, refactor: migrate event handling to centralized configuration and enhance event management
4. 17:43 - 17:54, refactor: simplify ShipPreview class by extracting painting logic and removing config dependency
5. 17:55 - 18:36, refactor: remove config dependency from FleetService and centralize configuration for fleet and battle grids

- Total 224 minutes = 3 hours 44 minutes
- Refactoring code to make it pretty

### 30

1. 08:52 - 09:20, refactor: centralize grid configuration in FLEET_GRID_CONFIG and simplify GridRenderer
2. 09:21 - 10:09, refactor: remove config dependency from FleetGrid and PlacementHandler, centralize configuration usage
3. 12:48 - 13:43, refactor: remove FleetGridConfig dependency, centralize grid configuration in BATTLE_GRID_CONFIG and HTML_CONFIG
4. 13:44 - 14:19, refactor: enhance GridRenderer and config for improved selector handling and error messages
5. 14:20 - 14:31, refactor: remove BattleGridConfig, centralize configuration in BATTLE_GRID_CONFIG and simplify BattleGrid initialization
6. 14:32 - 15:53, refactor: update import paths to centralize configuration usage and remove obsolete config files
7. 17:15 - 18:53, refactor: update FULL_SCREEN configuration structure and improve logging for fullscreen functionality

- Total 580 minutes = 9 hours 40 minutes
- Refactoring code to make it pretty
- Merging configs to one file

### 31

1. 17:29 - 18:29, refactor: integrate BattleAI into GridRenderer and simplify attack handling

- Total 60 minutes = 1 hour
- When i think about it i just freeze, when i am doing, i am doing

## 2

### 1

1. 13:41 - 14:44, refactor: modularize menu loading by introducing FleetGridLoader and ToggleLoader classes
2. 19:58 - 20:29, refactor: introduce BattleGridLoader for improved battle grid loading in Menu

- Total 94 minutes = 1 hour 34 minutes
- Refactoring, making parts smaller and SRP.

### 2

1. 16:16 - 16:56, refactor: enhance Board class with hit tracking and win condition; simplify DataService methods
2. 17:33 - 17:47, refactor: integrate BattleGridLoader into FleetService

- Total 54 minutes

### 3

1. 13:42 - 15:52, refactor: update PlayerAI and BattleAI to use logger for debug messages; modify GridRenderer to pass AI flag; use delay instead click to end turn
2. 16:49 - 18:00, refactor: enhance LogService with error logging; update FullScreen methods for better visibility control; rename generate to init in battle_grid

- Total 201 minutes = 3 hour 21 minutes

### 4

1. 06:32 - 07:03, refactor: update BattleAI and GridRenderer to improve turn management and click handling
2. 07:04 - 07:14, refactor: update Board and DataServiceFactory to support configuration; add test cell functionality in Fleet
3. 07:15 - 07:29, refactor: update Board and DataServiceFactory to support configuration; add test cell functionality in Fleet
4. 09:33 - 10:01, refactor: bind console methods in LogService for improved logging functionality
5. 10:02 - 10:32, refactor: implement resetGrid functionality in BattleGrid and GridRenderer; update BattleAI for improved turn management
6. 12:20 - 13:13, refactor: implement reset functionality across Board, Fleet, Player, Turn, and PlayerAI classes; update DataService and BattleAI for improved game state management
7. 20:02 - 21:47, refactor: replace logger with format methods for improved logging consistency across FleetService, BattleGrid, FleetGridLoader, ToggleLoader, and DataService

- Total 271 minutes = 4 hour 31 minutes

### 5

1. 08:55 - 10:39, refactor: replace LogService with LogFormatter for improved logging consistency; update imports across various components
2. 11:58 - 12:51, refactor: simplify LogFormatter methods and update toggleClass function signature for improved readability
3. 13:58 - 16:52, refactor: update GUIComponentContainer to pass context to jsModule; enhance event handling and fullscreen functionality in UI components
4. 16:52 - 17:12, refactor: rename goFullScreen to requestFullscreen for clarity; update event handler to use new method
5. 20:59 - 22:29, refactor: enhance menu initialization by utilizing MENU_BUTTON and MENU_HIDE for event handling and visibility management

- Total 441 minutes = 7 hour 21 minutes

### 6

1. 09:43 - 10:33, refactor(menu): fix serviceContainer dependency

### Plan

1. Game end condition.
2. Generate overlay component with game messages.
3. Polish the game.
4. Release single player game.
5. Generate multiplayer version.
