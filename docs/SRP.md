# SRP

Classes with SRP.

## battle_grid

### AIEventService

The single responsibility of the `AIEventService` class is to **orchestrate the AI move process in response to a visibility change event on the grid.** 

This means it is solely responsible for:

- Setting up a listener for the grid's visibility change.
- Coordinating the steps required to perform an AI move (i.e., setting elements, calculating hit positions, and executing the action).

It delegates the specifics of each step to other services, ensuring that its only reason to change is if the orchestration logic or the conditions for triggering an AI move need to be modified.

### AIHitService

Class adheres to the Single Responsibility Principle. It acts as a coordinator for an AI hit action, with a single reason to change: if the process of handling an AI hit changes. The actual implementation details of computing the attack, converting coordinates, and processing the hit are all delegated to other services or functions, ensuring that each component has a clear and isolated responsibility.

### BattleGrid

Responsibility of the BattleGrid component is defined as managing the entire lifecycle of the battle grid—including grid generation, event setup, and logging—then it indeed fulfills a single, cohesive responsibility.

### CellHitManager

### CellHitUIController