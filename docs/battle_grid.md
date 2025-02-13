# Battle Grid

## What is the point

This is a component written in js html, css.  

It produces a grid of squares visualizet by white net.  
Each square can be clicked and its color is filled red or grey.  
It is used in clasic game of 'battleship'.  
Player makes his move.  
Ai makes its move.  
Turn change till one of player wins.  
Game resets and starts over.

## Parent structure

Comoponent is used in client.  
It is a parent app.  
Client uses component_loade_lib.  
This is used to load app services and gui components.  
This means that folder name is used to load component by library.  
Files named same as folder are loaded by library as resource.  
Html has only div with component definition.  
Componennt Css file holds component style.  
Main js file is responsible to provide special function that has lib containers as input.  
It outputs instance of component.  
Rest of js files provides js classes of component.

## Component history

At first code was written with no form other then js functions.  
Then it was refactored.  
Utility functions where extracted to abstract some functionality that could be regarded as generic.  
Then classes where devised that tried to capture particular responsibilities in component.  
This process continued for some time and was quite chaotic and a struggle.  
Slowly some responsibilities started to form.

## Component structure

### ElementsService



### CellHitService

This class is should adhere to all SOLID principles.  
SRP:  
Single Responsibility of this class is to provide ability to handle click on grid cell.  
It defines responce component gives when cell is clicked.  
Only generic logic of it.
Point is to provide event data and ui cells.  
Result is updated color of cell.

Dependency:
Service is dependent on ElementsService.  
This gets gridRect, cellSize data.  

Service is dependent on GameStateService.  
This gets method that checks what is the effect on cell atack in battleship game.
