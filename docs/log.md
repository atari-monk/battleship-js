# Log

## 2025

### 1

#### 10

1. 10:04 - 10:36, Project reorganization.
2. 10:37 - 10:43, Docs reorganization.
3. 10:44 - 11:34, Organizing mail; Moving ship.
4. 13:29 - 14:29, Improving cable organization to level well. (workspace)
5. 14:30 - 15:31, Horizontal/Vertical ship orientation.
6. 15:32 - 15:55, Improve desk, new music. (workspace)
7. 17:54 - 18:08, Ship placement validation.
8. 18:09 - 18:33, Coffee, 10 pushups, 4 min step. (workspace)
9. 18:34 - 19:27, Ship placement.
10. 20:31 - 22:04, Toggle button.
11. 22:05 - 23:15, Toggle button in grid.

#### 11

1. 13:10 - 15:00, Integrate grid to page.
2. 21:31 - 22:20, Fix toogle button; Ship is not moved to it on switching orientation; Remove divs now generated in load component function.

#### 12

1. 16:22 - 16:56, Place fleet.
2. 16:56 - 17:12, Mobile version and pc version of grid are mostly same code so there will be no separate version at this point. Maybe release will be separate.
3. 17:13 - 17:27, Refactor proj structure again.
4. 17:28 - 18:01, Fleet placment data.
5. 18:02 - 18:37, Passing dataService form app module to components and set grid data for player1.
6. 21:45 - 21:53, Test of fleet placing and battle in one grid; Better do them as separate components.

#### 13

1. 08:57 - 10:15, Generate fleet placing component.  
   Strings to vars.
2. 12:27 - 13:14, Generate battle component.
3. 18:50 - 20:04, Encapsulated fleet grid module in class.
4. 20:05 - 20:27, PlacementValidator class.
5. 20:28 - 20:52, ShipPreview class.
6. 22:38 - 23:32, GridRenderer class.

#### 14

1. 07:53 - 08:14, EventHandler class.
2. 10:02 - 11:04, FleetLogic class.
3. 14:52 - 15:27, PlacementHandler class.
4. 15:47 - 16:29, FleetGridConfig class.
5. 18:57 - 20:47, Using Fleet Grid component with many js in page, updated component loader for this.

#### 15

1. 13:06 - 15:46, Component system; From one method loading component to 4 classes.

#### 16

1. 10:47 - 11:07, component_service - gui component classes
2. 11:08 - 11:41, use new guiContener in page
3. 13:37 - 15:20, load components setters with dependency on service
4. 17:13 - 17:45, fixed toggle ship orientation button

#### 17

1. 06:24 - 06:45, set fleet for player2
2. 06:46 - 07:30, battle grid SOLID
3. 08:09 - 08:49, hide fleet grid and toogle
4. 08:50 - 09:06, load battle grid
5. 09:51 - 12:34, test grid in component battle grid fleet (test page in component folder)
6. 17:20 - 18:26, react to ship hit using fleet placement data in gui

#### 18

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

#### 19

1. 09:36 - 10:22, refactor(log): improved numbered logs
2. 13:25 - 14:10, fix(grid): bugs in selectors of battle grid renderer
3. 14:11 - 16:49, debuging why it dosent work
4. 20:14 - 22:54, fix(grid): component now provides factory to gen new instance

- Total 409 min = 6 hours 49 minutes
- Important bug fixed.  
  The bug was that the component was using a single instance of the battle grid when it actually needed two instances for separate UI updates.  
  Because there was only one shared instance of the grid, only one UI was being updated, leading to incorrect rendering.  
  After adding a factory to generate two separate instances of the grid, it properly handles multiple turns and ensure both grids rendered and updated correctly.

#### 20

1. 13:14 - 13:44, fix(log): consistent log format
2. 13:45 - 14:57, feat(data): fleet data for test; numbered logger; disable fleetGrid
3. 17:41 - 18:35, refactor(board): extract board class, toStrings
4. 18:36 - 19:31, feat(board): load data from json

- Total 211 min = 3 hours 31 minutes

#### 21

1. 06:33 - 07:24, feat(board): callback for AI
2. 09:32 - 11:19, feat(board): battleship ai
3. 13:15 - 14:11, refactor(AI): simple ai
4. 14:17 - 15:28, feat(board): predict ships
5. 15:29 - 16:31, feat(board): boilerplate to predictions of board
6. 17:04 - 18:31, feat(prototype): check free spaces on board

- Total 434 min = 7 hours 14 minutes
- Calculating enemy move

#### 22

1. 14:19 - 16:32, refactor(predictor): implement board space counting
2. 20:57 - 21:07, feat(spaceCounter): enhance space counting logic and improve logging output
3. 21:21 - 22:43, feat(board): initialize board data and allow dynamic board generation
4. 22:44 - 23:55, feat(predictor): for 2x2 game, problem framing

- Total 296 min = 4 hours 56 minutes

#### 23

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

#### 24

1. 11:10 - 11:25, chore(predictor): move 2x2 predictor prototype
2. 11:26 - 11:43, feat(predictor): add 10x10 predictor prototype
3. 15:25 - 18:10, feat(predictor): implement random fleet placement and utility methods for board management

- Total 197 min = 3 hours 17 minutes

#### 25

1. 06:30 - 11:55, chore(predictor): remove unused 10x10 predictor files, hard fail
2. 17:47 - 18:26
3. 20:02 - 20:36, initialize battleship-js project with core files; (filtered proj files to new repo) 

- Total 398 min = 6 hours 38 minutes

#### 26

1. 15:53 - 18:22, refactor: update AI logic and remove unused classes
2. 20:50 - 21:34, feat: enhance PlayerAI with targeted attack logic
3. 21:42 - 22:20, refactor: streamline attack logic in PlayerAI with helper methods

- Total 231 minutes = 3 hours 51 minutes

#### 27

1. 16:00 - 17:00
2. 18:47 - 19:21, refactor: PlayerAI, doc
3. 19:22 - 23:00, feat: enhance PlayerAI with preloaded targeting logic

- Total 312 minutes = 5 hours 12 minutes

#### 28

1. 14:08 - 15:18, refactor: FullScreen class for improved configuration and event handling,  
                  refactor: improve error handling and logging in FullScreen class methods
2. 16:30 - 17:25, refactor: Menu class structure and enhance error handling
3. 17:26 - 19:00, refactor: extract configuration constants for FullScreen and Menu classes

- Total 219 minutes = 3 hours 39 minutes

#### 29

1. 11:00 - 12:08, refactor: Toggle class with configuration, event handling
2. 14:45 - 15:11, refactor: centralize event configuration in FLEET_GRID_CONFIG and simplify EventHandler 
3. 15:12 - 16:30, refactor: migrate event handling to centralized configuration and enhance event management
4. 17:43 - 17:54, refactor: simplify ShipPreview class by extracting painting logic and removing config dependency
5. 17:55 - 18:36, refactor: remove config dependency from FleetService and centralize configuration for fleet and battle grids

- Total 224 minutes = 3 hours 44 minutes
- Refactoring code to make it pretty

#### 30

1. 08:52 - 09:20, refactor: centralize grid configuration in FLEET_GRID_CONFIG and simplify GridRenderer
2. 09:21 - 10:09, refactor: remove config dependency from FleetGrid and PlacementHandler, centralize configuration usage
3. 12:48 - 13:43, refactor: remove FleetGridConfig dependency, centralize grid configuration in BATTLE_GRID and HTML_CONFIG
4. 13:44 - 14:19, refactor: enhance GridRenderer and config for improved selector handling and error messages
5. 14:20 - 14:31, refactor: remove BattleGridConfig, centralize configuration in BATTLE_GRID and simplify BattleGrid initialization
6. 14:32 - 15:53, refactor: update import paths to centralize configuration usage and remove obsolete config files
7. 17:15 - 18:53, refactor: update FULL_SCREEN configuration structure and improve logging for fullscreen functionality

- Total 580 minutes = 9 hours 40 minutes
- Refactoring code to make it pretty
- Merging configs to one file

#### 31

1. 17:29 - 18:29, refactor: integrate BattleAI into GridRenderer and simplify attack handling

- Total 60 minutes = 1 hour
- When i think about it i just freeze, when i am doing, i am doing

### 2

#### 1

1. 13:41 - 14:44, refactor: modularize menu loading by introducing FleetGridLoader and ToggleLoader classes
2. 19:58 - 20:29, refactor: introduce BattleGridLoader for improved battle grid loading in Menu

- Total 94 minutes = 1 hour 34 minutes
- Refactoring, making parts smaller and SRP.

#### 2

1. 16:16 - 16:56, refactor: enhance Board class with hit tracking and win condition; simplify DataService methods
2. 17:33 - 17:47, refactor: integrate BattleGridLoader into FleetService

- Total 54 minutes

#### 3

1. 13:42 - 15:52, refactor: update PlayerAI and BattleAI to use logger for debug messages; modify GridRenderer to pass AI flag; use delay instead click to end turn
2. 16:49 - 18:00, refactor: enhance LogService with error logging; update FullScreen methods for better visibility control; rename generate to init in battle_grid

- Total 201 minutes = 3 hour 21 minutes

#### 4

1. 06:32 - 07:03, refactor: update BattleAI and GridRenderer to improve turn management and click handling
2. 07:04 - 07:14, refactor: update Board and DataServiceFactory to support configuration; add test cell functionality in Fleet
3. 07:15 - 07:29, refactor: update Board and DataServiceFactory to support configuration; add test cell functionality in Fleet
4. 09:33 - 10:01, refactor: bind console methods in LogService for improved logging functionality
5. 10:02 - 10:32, refactor: implement resetGrid functionality in BattleGrid and GridRenderer; update BattleAI for improved turn management
6. 12:20 - 13:13, refactor: implement reset functionality across Board, Fleet, Player, Turn, and PlayerAI classes; update DataService and BattleAI for improved game state management
7. 20:02 - 21:47, refactor: replace logger with format methods for improved logging consistency across FleetService, BattleGrid, FleetGridLoader, ToggleLoader, and DataService

- Total 271 minutes = 4 hour 31 minutes

#### 5

1. 08:55 - 10:39, refactor: replace LogService with LogFormatter for improved logging consistency; update imports across various components
2. 11:58 - 12:51, refactor: simplify LogFormatter methods and update toggleClass function signature for improved readability
3. 13:58 - 16:52, refactor: update GUIComponentContainer to pass context to jsModule; enhance event handling and fullscreen functionality in UI components
4. 16:52 - 17:12, refactor: rename goFullScreen to requestFullscreen for clarity; update event handler to use new method
5. 20:59 - 22:29, refactor: enhance menu initialization by utilizing MENU_BUTTON and MENU_HIDE for event handling and visibility management

- Total 441 minutes = 7 hour 21 minutes

#### 6

1. 09:43 - 10:33, refactor(menu): fix serviceContainer dependency
2. 10:52 - 11:36, refactor(toggle): fix container dependency
3. 12:31 - 13:50, refactor(toggle): use util functions
4. 14:25 - 14:43, refactor: pass guiContainer to FleetGridLoader and simplify toggle handling
5. 14:44 - 15:05, refactor(BattleAI): pass guiContainer to constructor and update instance usage

- Total 212 minutes = 3 hour 32 minutes

#### 7

1. 11:12 - 11:27, refactor(GridRenderer): simplify grid item generation and setup for player/AI
2. 11:28 - 11:54, refactor(GridRenderer): streamline grid item setup and click handling
3. 11:55 - 12:29, refactor(GridRenderer): replace grid element retrieval with selectElementOrThrow utility
4. 12:30 - 13:35, refactor(GridRenderer): introduce setEventForElement utility for event handling
5. 14:19 - 14:31, refactor(GridRenderer): enhance AI click handling and restore player turn logic
6. 14:32 - 15:05, refactor(GridRenderer): replace onVisibilityChange method with observeVisibilityChange utility
7. 15:06 - 15:35, refactor(GridRenderer): replace grid cell creation with generateElements utility
8. 17:19 - 19:21, refactor(BattleAI, GridRenderer): restructure classes for improved attack handling and turn management

- Total 336 minutes = 5 hour 36 minutes

#### 8

1. 16:25 - 17:11, refactor(BattleAI, GridRenderer, AttackHandler, BattleTurnManager, ScreenCoordinates): modularize code by extracting classes and improving attack handling
2. 17:12 - 17:45, refactor: centralize grid configuration by replacing BATTLE_GRID_CONFIG with BATTLE_GRID
3. 18:25 - 19:20, refactor(BattleAI, ScreenCoordinates, BattleLogic): improve class structure and modularity for better attack handling and screen coordinate management

- Total 134 minutes = 2 hour 14 minutes

#### 9

1. 15:02 - 16:09, refactor(ScreenCoordinates): use util functions
2. 16:28 - 18:13, refactor(AttackHandler, BattleAI): improve attack handling by modularizing element setup and coordinate calculations
3. 20:17 - 21:06, refactor(BattleTurnManager, ui): modularize grid toggling logic and improve turn management
4. 21:06 - 22:11, refactor(BattleTurnManager): update turn management to utilize hidden styles in grid toggling (fix bug)

- Total 286 minutes = 4 hour 46 minutes

#### 10

1. 11:38 - 12:11, refactor(AttackHandler, BattleAI, GridRenderer): modularize element setup and improve hit handling logic
2. 12:16 - 12:29, refactor(BattleGrid, GridRenderer): streamline grid item management and enhance event handling
3. 12:30 - 13:13, refactor(AttackHandler, BattleAI, BattleLogic): modularize element management and remove ScreenCoordinates class
4. 14:15 - 14:44, refactor(BATTLE_GRID): move configuration to separate file and update references
5. 15:15 - 15:38, refactor(BattleGrid, GridRenderer): rename GridRenderer to GridGenerator and update references
6. 16:48 - 17:26, read battle_grid component code
7. 17:37 - 17:47, refactor(BattleGridLoader, FleetGrid): pass guiContainer to constructors and update references
8. 17:48 - 17:55, refactor(BattleGridLoader): update grid visibility logic to use toggleGrid function
9. 17:56 - 18:09, refactor(BattleGridLoader, BattleTurnManager): replace toggleGrid calls with toggleGrids function for improved grid visibility management
10. 20:00 - 20:39, refactor(BattleGridLoader, BattleTurnManager, BattleAI): update grid handling to use elementIds and refactor component loading logic

- Total 236 minutes = 3 hour 56 minutes
- More commits in same time is key, also improving code quality is big (start from quality also)  
  Make util functions to abstract common tasks from the start.

#### 11

1. 20:59 - 22:30, refactor(AttackHandler): improve cell position handling and update attack logic  
   feat(script): add merge.py for merging project files and solid.py for SOLID principles prompt generation

- Total 91 minutes = 1 hour 31 minutes
- One optimization on chore day

#### 12

1. 10:27 - 10:40, refactor(BattleAI): streamline AI hit handling and improve matrix to screen conversion
2. 10:41 - 11:58, refactor(BattleAI): replace internal matrixToScreen method with shared utility function and streamline hit handling logic
3. 11:59 - 12:42, refactor(BattleAI): replace direct logging and timeout handling with handleAction utility function 
4. 12:43 - 12:57, reflection on BattleAI, list what it does, state concern
5. 15:22 - 16:06, refactor(AttackHandler): simplify attack logic by utilizing shared utility functions for coordinate calculations
6. 16:56 - 17:30, refactor(AttackHandler, GameStateService): replace data service dependency with game state service for hit logic
7. 17:31 - 17:46, refactor(BattleTurnManager, GameStateService, AttackHandler): replace data service dependency with game state service and streamline turn management
8. 21:55 - 22:39, refactor(BattleAI, GameStateService): remove AttackHandler and BattleLogic, streamline attack and turn management logic
9. 22:40 - 23:10, refactor(BattleAI): simplify hit handling and reset logic, remove redundant methods

- Total 4 hours 23 minutes (263 minutes)

#### 13

1. 20:14 - 20:58, refactor(BattleAI, ui): integrate updateColor function for improved hit indication
2. 20:59 - 21:14, refactor(BattleGrid, BattleGridLoader): streamline grid initialization and event handling, remove GridGenerator
3. 21:15 - 21:48, document drivinf battle_grid 
4. 21:48 - 22:20, refactor(BattleAI, GameStateService, CellHitService): rename playerAttack to attackCell, add CellHitService for handling cell hits 

- Total 1 hour 44 minutes (104 minutes)

#### 14

1. 12:48 - 13:13, refactor(BattleGrid, ElementService): update constructor to accept ElementService, streamline element handling logic
2. 14:32 - 17:52, refactor(BattleGrid, PlayerHitService, ActionService): introduce PlayerHitService and ActionService, streamline event handling and player actions
3. 20:55 - 23:00, refactor(BattleGrid, BattleGridLoader, EndTurnAction, WinAction): update to use elements array for improved component handling and event management

- Total 5 hours 50 minutes (350 minutes)

#### 15

1. 12:39 - 14:18, refactor(scripts SOLID principles): restructure scripts into classes for better organization and maintainability
2. 15:15 - 16:30, refactor(battle_grid): Extract GridCells class (planned for 20 min)

- Total 2 hours 54 minutes (174 minutes)

#### 16

1. 21:00 - 00:00, refactor(docs): update log and todo documentation, remove pomodoro file

- Total 3 hours (180 minutes)
- Lost entire day on ai agents. I am not able to move this since openai api is closed. Browser automation is to cumbersome.  
  Only thing i can do is generating specialized prompts using py and maybe stack them in chain for some production chain/line like factory line. 

#### 17

1. 11:34 - 12:16, 2 pomodoro, refactor(battle_grid): replace ActionService with ActionRegistry, ActionResolver, and ActionExecutor for improved action handling
2. 12:17 - 12:41, refactor(docs): prepare next SRP refactor doc
3. 13:37 - 13:58, refactor(battle_grid): remove EndTurnAction and related services, introduce GameTurnManager and TurnUIController for improved turn management
4. 13:59 - 14:15, 1 pomodoro, refactor(battle_grid): remove WinAction, introduce GameWinManager and WinUIController for improved win handling
5. 14:30 - 14:53, 1 pomodoro, refactor(docs): SRP doc, list of SPR classes
6. 14:54 - 15:51, 2 pomodoro, refactor(battle_grid): CellHitManager and CellHitUIController for SRP
7. 15:53 - 16:22, 1 pomodoro, refactor(battle_grid): introduce ToggleGridsUIController for improved grid visibility management
8. 16:24 - 17:23, 2 pomodoro, refactor(battle_grid): ensured battle_grid is SOLID

- Total 4 hours 31 minutes (271 minutes)

#### 18

1. 13:04 - 14:04, 3 pomodoro, refactor(battle_grid): restructure GridCells to make it more general
2. 14:05 - 14:19, refactor(fleet_grid): enable fleet grid and integrate ToggleGridsUIController for improved grid management  
   This was fix to battle grid showed after fllet grid, to start refactoring component
3. 14:48 - 15:09, 1 pomodoro, bookmarks to track problem, plan to generalize class as first step in solution
4. 15:10 - 16:13, 2 pomodoro, refactor(battle_grid): replace ElementService with GridMetrics for improved grid metric management
5. 18:50 - 20:00, 2 pomodoro, refactor(fleet_grid): integrate GridMetrics for enhanced grid metric management and update PlacementHandler for new cell position logic
6. 20:23 - 20:51, refactor(fleet_grid): remove GridRenderer and integrate GridCells for improved grid management

- Total 4 hours 16 minutes (256 minutes)

#### 19

1. 13:10 - 13:32, 1 pomodoro, refactor(fleet_grid): restructure FleetGrid initialization and enhance event handling
2. 12:33 - 14:15, what next ?
3. 14:15 - 16:09, refactor(full_screen): restructure FullScreen component and enhance configuration management
4. 18:00 - 20:43, refactor(full_screen): update FullScreen component to use new select and toggle functions
   refactor(constants): standardize log levels and console colors to uppercase
   refactor(select): implement new select function with improved error handling
   refactor(style): create toggle function for managing CSS class states
   refactor(translation): add language support for error messages and selectors
   refactor(content): enhance content structure for better localization

- Total 6 hours 41 minutes (401 minutes)

#### 20

1. 09:06 - 09:47, refactor(full_screen): update FullScreen component to use query and toggle object functions
2. 09:48 - 10:22, refactor(constants): remove Object.freeze from constants for improved flexibility
   refactor(FullScreen): enhance event handling and configuration structure
   feat(event): add setEvent and setEventObj functions for streamlined event management
3. 10:23 - 10:40, feat(fullscreen): implement requestFullscreen function and update imports for fullscreen handling
4. 10:41 - 11:22, refactor(FullScreen): replace loadComponents with loadComponentsObj for improved component loading
5. 11:54 - 12:57, feat(fullscreen): refactor FullScreen component to use FullscreenEventHandler for improved event management
6. 12:58 - 13:30, refactor: remove obsolete serve, solid, and time modules to streamline the codebase
   feat(fullscreen): rename to FullScreenComponent
7. 14:01 - 14:26, test chargpt refactoring, failed 
8. 15:39 - 16:06, refactor(menu): start refactoring to FullScreenComponent pattern
9. 
- Extract LoadGameEventHandler from MenuComponent class 
- 17:40 - 18:06
- feat(menu): extract LoadGameEventHandler for improved event handling and refactor Menu component
10. 
- Extract class MenuComponent from menu.js to its own file. Fix imports
- 18:10 - 18:16
- feat(menu): create MenuComponent class and refactor menu.js to use it
11. 
- Fix config. Move values from old to MENU_COMPONENT_CONFIG
- 18:18 - 18:33
- feat(menu): update LoadGameEventHandler to use MENU_COMPONENT_CONFIG and improve error handling
12. 
- Replace selectAndToggle with newer functions; Use {} for 4 dependencies to make 3 dependencies for class
- 18:34 - 18:47
- feat(menu): replace selectAndToggle with toggleObj and queryObj for improved functionality
13. 
- New log format
- 18:48 - 19:08

- Total 6 hours (360 minutes)
- Weak used time.
- Need new format for each point:
    x. 
    - todo
    - estimated time
    - real time
    - note
    - commit message
  This should promote better use of time.

#### 21

1. 
- Refactor ToogleLoader to use util method. Use config.
- 20 min
- 13:23 - 13:54
- feat(toggle): refactor ToggleLoader to use config and improve error handling
  feat(battle_grid): refactor BattleGridLoader to utilize new config structure
  feat(config): add BATTLE_GRID_COMPONENT_CONFIG and TOGGLE_COMPONENT_CONFIG for better component management
2.
- Extract component and eventHandler class from toogle.
- 20 min
- 14:56 - 15:36
- feat(toggle): extract ToggleComponent class and refactor toggle initialization
  feat(toggle): extract ToggleEventHandler class and refactor ToggleComponent for improved separation of concerns
3.
- Fix ToggleComponent config
- 20 min
- 15:45 - 17:03
- feat(toggle): refactor ToggleComponent and ToggleEventHandler to use configuration object for improved initialization and error handling
4.
- Refactor one fleet_grid event handler class
- 20 min
- 20:49 - 22:31
- feat(fleet_grid): refactor event handling by introducing EventAttacher class for improved event management and separation of concerns

- Total 4 hours 11 min (251 minutes)

#### 22

1. 
- PlacementHandler, SRP, fix config.
- 20 min
- 13:53 - 14:33
- 40
- feat(fleet_grid): refactor event handling by removing PlacementHandler and introducing FleetPaintOnHoverEventHandler and FleetPlacementClickEventHandler for improved event management and separation of concerns
2.
- Make time script more flexible
- 10 min
- 16:20 - 16:31
- 11
- feat(alarm): enhance Alarm class to accept user-defined duration and improve input validation
2.
- FleetGridComponent class fix to standard
- 10 min
- 16:32 - 16:53
- 21
- feat(fleet_grid): replace FleetGrid with FleetGridComponent and introduce FLEET_GRID_COMPONENT_CONFIG for improved structure and configuration management
3.
- fleet_grid_config.js, use it in component, remove old configs
- 30 min
- 17:28 - 18:27
- 59
- feat(fleet_grid): update FleetGrid configuration and error handling for improved clarity and structure
- 30 min
- 20:07 - 21:20
- 73
- feat(fleet_grid): refactor FleetService and PlacementValidator to use dynamic grid size and improve configuration management

- Total 3 hours 24 min (204 minutes)

#### 23

1. 
- fleet_grid_config.js, use it in component, remove old configs
- 30 min
- 16:15 - 16:47
- 32 min
- feat(fleet_grid): refactor config
2.
- FleetService class fix to standard, read, what it does
- 20 min
- 16:49 - 18:35
- 106 min
- feat(grid): enhance getCellPosition function and introduce new coordinate conversion utilities
  feat(grid): add utility functions for grid generation and coordinate conversion
  feat(fleet_grid): refactor FleetService to use new coordinate conversion utility and improve ship placement logic
  feat(fleet_grid): inverse if, order methods
- This class enables custom placing of the fleet
3. PlacementValidator class fix to standard, read, what it does
- 20 min
- 20:14 - 20:45, 21:18 - 22:00
- 73 min
- feat(fleet_grid): enhance PlacementValidator with self commenting methods
- feat(fleet_grid): refactor PlacementValidator to use new utility functions for placement validation
- This class validates if fleet placement is valid

- Total 3 hours 31 min (211 minutes)

#### 24

1. ShipPreview class fix to standard, read, what it does
- 10 min
- 12:13 - 13:11
- 58 min
- feat(fleet_grid): update ShipPreview to use new coordinate conversion utilities for improved readability
- Just read a class and tested
2. Refactor, battle grid.
- 20 min
- 19:20 - 20:12, 22:32 - 23:36
- 52 + 64 = 116 min
- feat(battle_grid): refactor to use shared_lib_2 for improved modularity and maintainability

- Total 2 hours 54 min (174 minutes)

#### 25

1. Remove shared_lib and make shared_lib_2 to shared_lib.
- 1h (estimate)
- 13:56 - 15:50, 19:10 - 19:22,
- 126 min
- feat(shared_lib): introduce new utility functions and refactor imports for improved modularity
- feat(shared_lib): migrate utilities from shared_lib_2 to shared_lib for improved consistency and modularity
2. Refactor data lib.
- 2h (estimate)
- 19:23 - 21:24
- 121 min
- refactor: remove obsolete files
- refactor: move lib to lib/data folder and update imports
- refactor: move libs to lib forlder and fix imports
- refactor(data): refactor Board and DataServiceFactory to use new configuration structure and improve grid handling

- Total 4 hours 7 min (247 minutes)

#### 26

1. Refactor data lib.
- minutes estimate: 2h
- time: 07:05 - 07:29
- minutes: 24 min
- commit: refactor(data): update Fleet and DataServiceFactory to utilize grid configuration and improve matrix handling
2. Read ai code.
- minutes estimate: 20
- time: 07:55 - 08:12
- minutes: 17 min
- Class is to big.
3. Refactor, cleaning.
- minutes estimate: 20
- time: 08:13 - 09:02
- minutes: 49 min
- commit: refactor: reorganize project structure, remove obsolete documentation

 #### 27

1. Refactor GUIComponentLoader. 
- minutes estimate: 20 min
- time: 07:48 - 08:32
- minutes: 44
- commit: refactor(loader): streamline GUIComponentLoader and GUIComponentContainer for improved configuration and loading
2. Refactor GUIComponentUnloader
- minutes estimate: 20
- time: 11:11 - 11:26, 
- minutes: 15 + 
- commit: refactor(loader): refactor GUIComponentUnloader

---

x.
- minutes estimate:
- time:
- minutes:
- commit:
