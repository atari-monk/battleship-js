# SRP Refactor

## Question 1

Analyze the following code based on the 'Single Responsibility Principle (SRP): A class should have only one reason to change.' principle:

```javascript
export class ActionService {
  constructor(gameStateService, { endTurn, win }) {
    this._gameStateService = gameStateService
    this._actions = {
      endTurn: () => endTurn.endTurn(),
      win: () => win.win(),
    }
  }

  action() {
    this._actions[this._gameStateService.nextAction()]()
  }
}
```

## Solution 1

Below is one way to refactor the original code into multiple classes, each with a single responsibility. In this example, we separate:

1. **ActionRegistry:** Responsible for registering and retrieving actions.
2. **ActionResolver:** Responsible for determining which action should be executed based on the game state.
3. **ActionExecutor:** Responsible for executing the action that’s been resolved.

### Step 1: Define the ActionRegistry

This class handles the registration and lookup of actions.

```javascript
export class ActionRegistry {
  constructor() {
    this._actions = new Map();
  }

  register(actionName, actionFn) {
    this._actions.set(actionName, actionFn);
  }

  getAction(actionName) {
    return this._actions.get(actionName);
  }
}
```

### Step 2: Define the ActionResolver

This class encapsulates the logic for determining the next action, which is delegated to the game state service.

```javascript
export class ActionResolver {
  constructor(gameStateService) {
    this._gameStateService = gameStateService;
  }

  resolve() {
    // Returns a string representing the action name (e.g., "endTurn", "win")
    return this._gameStateService.nextAction();
  }
}
```

### Step 3: Define the ActionExecutor

This class uses the registry and the resolver to execute the appropriate action.

```javascript
export class ActionExecutor {
  constructor(actionRegistry, actionResolver) {
    this._actionRegistry = actionRegistry;
    this._actionResolver = actionResolver;
  }

  execute() {
    const actionName = this._actionResolver.resolve();
    const action = this._actionRegistry.getAction(actionName);
    if (action) {
      action();
    } else {
      throw new Error(`No action registered for: ${actionName}`);
    }
  }
}
```

### Putting It All Together

Below is an example of how you might set up and use these classes:

```javascript
// Assume these are provided by other parts of your application
const gameStateService = {
  // For example, nextAction returns a string indicating the next action.
  nextAction() {
    return "endTurn"; // This could be dynamic in a real scenario.
  },
};

const endTurn = {
  endTurn() {
    console.log("Turn ended!");
  },
};

const win = {
  win() {
    console.log("You win!");
  },
};

// Create and set up the registry.
const actionRegistry = new ActionRegistry();
actionRegistry.register("endTurn", endTurn.endTurn);
actionRegistry.register("win", win.win);

// Create the resolver using the game state service.
const actionResolver = new ActionResolver(gameStateService);

// Create the executor with the registry and resolver.
const actionExecutor = new ActionExecutor(actionRegistry, actionResolver);

// Execute the resolved action.
actionExecutor.execute();  // Output: "Turn ended!"
```

### Explanation

- **ActionRegistry** is solely responsible for the mapping of action names to functions. If new actions are added or the mapping logic changes, only this class is affected.
- **ActionResolver** is responsible for extracting the next action from the game state. Changes in how the next action is determined will only impact this class.
- **ActionExecutor** ties everything together by retrieving the correct action using the resolver and registry, then executing it. Its responsibility is limited to the execution flow.

By splitting the responsibilities in this way, each class has one clear reason to change, adhering to the Single Responsibility Principle (SRP).

## Question 2

Analyze the following code based on the 'Single Responsibility Principle (SRP): A class should have only one reason to change.' principle:

```javascript
import { BATTLE_GRID } from './config.js'
import { handleAction, toggleGrids } from './../../shared_lib/ui.js'

export class EndTurnAction {
  constructor(gameStateService) {
    this._gameStateService = gameStateService
  }

  endTurn() {
    const { waitOnTurn, waitMsg, elements, hiddenStyle } = BATTLE_GRID

    handleAction({
      logMessages: [waitMsg(waitOnTurn)],
      waitTime: waitOnTurn,
      callback: () => {
        const { currentPlayer, player1Name } = this._gameStateService.nextTurn()

        toggleGrids(
          currentPlayer,
          player1Name,
          elements.map((element) => element.elementId),
          hiddenStyle
        )
      },
    })
  }
}
```

## Solution 2

Below is one way to refactor the code so that the game‐logic (domain layer) is separated from the UI (presentation layer). In this example, a simple event emitter is used so that the domain layer can emit a turn change event and the UI layer can listen to that event and perform its UI updates. This keeps each class focused on a single responsibility.

---

**1. Create a Simple Event Emitter (or use an existing library):**

```javascript
// EventEmitter.js
export class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
}
```

---

**2. Domain Layer: GameTurnManager**

This class handles the game logic for ending a turn. It updates the game state and emits a `turnChanged` event with the updated turn information. Notice that no UI code appears here.

```javascript
// GameTurnManager.js
import { EventEmitter } from './EventEmitter.js';

export class GameTurnManager extends EventEmitter {
  constructor(gameStateService) {
    super();
    this._gameStateService = gameStateService;
  }

  endTurn() {
    // Update the game state (domain logic)
    const turnInfo = this._gameStateService.nextTurn();
    // Emit an event to notify listeners that the turn has changed
    this.emit('turnChanged', turnInfo);
  }
}
```

---

**3. UI Layer: TurnUIController**

This class is solely responsible for updating the UI when the turn changes. It subscribes to the `turnChanged` event from the `GameTurnManager` and, when triggered, performs the UI updates (e.g., showing wait messages and toggling grids).

```javascript
// TurnUIController.js
import { BATTLE_GRID } from './config.js';
import { handleAction, toggleGrids } from './../../shared_lib/ui.js';

export class TurnUIController {
  constructor(turnManager) {
    this.turnManager = turnManager;
    // Subscribe to the turn change event
    this.turnManager.on('turnChanged', this.handleTurnChange.bind(this));
  }

  handleTurnChange(turnInfo) {
    const { waitOnTurn, waitMsg, elements, hiddenStyle } = BATTLE_GRID;
    
    handleAction({
      logMessages: [waitMsg(waitOnTurn)],
      waitTime: waitOnTurn,
      callback: () => {
        const { currentPlayer, player1Name } = turnInfo;
        toggleGrids(
          currentPlayer,
          player1Name,
          elements.map((element) => element.elementId),
          hiddenStyle
        );
      },
    });
  }
}
```

---

**4. Using the Refactored Classes**

Now, your code that triggers the end turn action simply calls the domain logic. The UI updates automatically because the UI controller is subscribed to the turn change event.

```javascript
// main.js (or wherever you trigger the end turn action)
import { GameTurnManager } from './GameTurnManager.js';
import { TurnUIController } from './TurnUIController.js';
import { gameStateService } from './gameStateService.js'; // Your existing game state service

// Initialize the domain manager and UI controller
const turnManager = new GameTurnManager(gameStateService);
const turnUIController = new TurnUIController(turnManager);

// Trigger the end turn action (for example, on a button click)
document.getElementById('endTurnButton').addEventListener('click', () => {
  turnManager.endTurn();
});
```

---

### Explanation

- **GameTurnManager:**  
  Handles the game state update via `nextTurn()` and then emits a `turnChanged` event. This class has one reason to change: changes in game turn logic.

- **TurnUIController:**  
  Listens for the `turnChanged` event and then handles all UI-related actions such as displaying wait messages and toggling the grids. This class will only change if the UI behavior changes.

By splitting the responsibilities, each class now adheres to the **Single Responsibility Principle (SRP)**.
