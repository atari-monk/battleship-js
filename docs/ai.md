# AI

## Properties

- board
- hits
- potentialTargets
- visited
- orientation

## Main method

- attack

Returns board hit coordinates.

## Algorithm

### Random attack

When there is no targets or hits it does random attack.
Gets random cell coordinates.  
Checks hit result at this cell.  
If it is a hit it adds it to hits and targets.
Returns coordinates. 

Methods:

- noTargetsOrHits
- randomAttack

### Targeted Attack

Takes first target in array.  
It board is empty at target.  
Board is hit.  
If there is a hit it is added to hits array.  
If there is 2 hits orientation of ship is determined.  
When axis value changes for 2 hits, that is the orientation of the ship.  
After orientation is determined, remove potential targets in other orientations.  
Returns coordinates.  

## TODO
Fleet placing, broken battle grid in it
Fleet random placment, ship should not toutch