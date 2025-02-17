# SRP

Classes evaluated on SRP principle and passed.

## battle_grid

### AIEventService

The single responsibility of the `AIEventService` class is to **orchestrate the AI move process in response to a visibility change event on the grid.** 

This means it is solely responsible for:

- Setting up a listener for the grid's visibility change.
- Coordinating the steps required to perform an AI move (i.e., setting elements, calculating hit positions, and executing the action).

It delegates the specifics of each step to other services, ensuring that its only reason to change is if the orchestration logic or the conditions for triggering an AI move need to be modified.

###

###

###

###