import { ship } from './shipFactory';
import { GRID, CELL_STATES, SHIPS, ERROR_MESSAGES, SHIP_ABBREVIATIONS, AXIS, SHIP_OFFSET_VALUES } from './config';

function gameBoard() {

  // Make sure ships only placed once
  const placedShips = new Set();  

  const BOARD = Array.from({ length: GRID.ROWS }, () =>
    Array.from({ length: GRID.COLUMNS }, () => CELL_STATES.EMPTY)
  );

  function getBoard(row, col) {
    if(row !== undefined && col !== undefined) return BOARD[row][col];
    return BOARD;
  }

  function getShip(shipType) {
    if([SHIPS.CARRIER_SHIP, SHIPS.BATTLE_SHIP, SHIPS.CRUISER_SHIP, SHIPS.SUBMARINE_SHIP, SHIPS.PATROL_BOAT_SHIP].includes(shipType)){
      return ship()[shipType]();
    }
    return false;
  }

  function isCellEmpty(row, col) {
    if(getBoard(row, col) === CELL_STATES.EMPTY) return true;
    return false;
  }

  function isCollision(position, axis, minOffset, maxOffset) {
    if(axis === AXIS.X) {
      for (let offset = minOffset; offset <= maxOffset; offset++) {
        if(!isCellEmpty(position[0], position[1] + offset)) {
          return false;
        }   
      }
    }

    if(axis === AXIS.Y) {
      for (let offset = minOffset; offset <= maxOffset; offset++) {
        if(!isCellEmpty(position[0] + offset, position[1])) {
          return false;
        }   
      }
    }

    return true;
  }

  // X axis
  function canPlaceShipHorizontally(shipType, position) {
    if((shipType === SHIPS.CARRIER_SHIP) && (position[1] >= 2) && (position[1] <= 7)) {
      return isCollision(position, AXIS.X, SHIP_OFFSET_VALUES.CARRIER.MIN_OFFSET, SHIP_OFFSET_VALUES.CARRIER.MAX_OFFSET_OFFSET);

    }else if((shipType === SHIPS.BATTLE_SHIP)  && (position[1] >= 1) && (position[1] <= 7)) {
      return isCollision(position, AXIS.X, SHIP_OFFSET_VALUES.BATTLESHIP.MIN_OFFSET, SHIP_OFFSET_VALUES.BATTLESHIP.MAX_OFFSET);

    }else if(([SHIPS.CRUISER_SHIP, SHIPS.SUBMARINE_SHIP].includes(shipType))  && (position[1] >= 1) && (position[1] <= 8)) {
      return isCollision(position, AXIS.X, SHIP_OFFSET_VALUES.CRUISER_SUBMARINE.MIN_OFFSET, SHIP_OFFSET_VALUES.CRUISER_SUBMARINE.MAX_OFFSET);

    } else if((shipType === SHIPS.PATROL_BOAT_SHIP) && (position[1] >= 0) && (position[1] <= 8)) {
      return isCollision(position, AXIS.X, SHIP_OFFSET_VALUES.PATROL_BOAT.MIN_OFFSET, SHIP_OFFSET_VALUES.PATROL_BOAT.MAX_OFFSET);
    }

    return false;
  }

  // Y axis
  function canPlaceShipVertically(shipType, position) {
    if((shipType === SHIPS.CARRIER_SHIP) && (position[0] >= 2) && (position[0] <= 7)) {
      return isCollision(position, AXIS.Y, SHIP_OFFSET_VALUES.CARRIER.MIN_OFFSET, SHIP_OFFSET_VALUES.CARRIER.MAX_OFFSET);

    }else if((shipType === SHIPS.BATTLE_SHIP)  && (position[0] >= 1) && (position[0] <= 7)) {
      return isCollision(position, AXIS.Y, SHIP_OFFSET_VALUES.BATTLESHIP.MIN_OFFSET, SHIP_OFFSET_VALUES.BATTLESHIP.MAX_OFFSET);

    }else if(([SHIPS.CRUISER_SHIP, SHIPS.SUBMARINE_SHIP].includes(shipType))  && (position[0] >= 1) && (position[0] <= 8)) {
      return isCollision(position, AXIS.Y, SHIP_OFFSET_VALUES.CRUISER_SUBMARINE.MIN_OFFSET, SHIP_OFFSET_VALUES.CRUISER_SUBMARINE.MAX_OFFSET);

    } else if((shipType === SHIPS.PATROL_BOAT_SHIP) && (position[1] >= 0) && (position[1] <= 8)) {
      return isCollision(position, AXIS.Y, SHIP_OFFSET_VALUES.PATROL_BOAT.MIN_OFFSET, SHIP_OFFSET_VALUES.PATROL_BOAT.MAX_OFFSET);

    }

    return false;
  }

  function placeShip(shipType, position, axis) {
    if(canPlaceShip(shipType, position, axis)) {
      if(axis === AXIS.X) {
        if(shipType === SHIPS.CARRIER_SHIP) {
          for (let offset = -2; offset <= 2; offset++) {
            BOARD[position[0]][position[1] + offset] = getShip(shipType).type;
          }          
        }else if(shipType === SHIPS.BATTLE_SHIP) {
          for (let offset = -1; offset <= 2; offset++) {
            BOARD[position[0]][position[1] + offset] = getShip(shipType).type;
          } 
        }else if([SHIPS.CRUISER_SHIP, SHIPS.SUBMARINE_SHIP].includes(shipType)) {
          for (let offset = -1; offset <= 1; offset++) {
            BOARD[position[0]][position[1] + offset] = getShip(shipType).type;
          } 
        }else if(shipType === SHIPS.PATROL_BOAT_SHIP) {
          for (let offset = 0; offset <= 1; offset++) {
            BOARD[position[0]][position[1] + offset] = getShip(shipType).type;
          } 
        }
      }
      
      if(axis === AXIS.Y) {
        if(shipType === SHIPS.CARRIER_SHIP) {
          for (let offset = -2; offset <= 2; offset++) {
            BOARD[position[0] + offset][position[1]] = getShip(shipType).type;
          }          
        }else if(shipType === SHIPS.BATTLE_SHIP) {
          for (let offset = -1; offset <= 2; offset++) {
            BOARD[position[0] + offset][position[1]] = getShip(shipType).type;
          } 
        }else if([SHIPS.CRUISER_SHIP, SHIPS.SUBMARINE_SHIP].includes(shipType)) {
          for (let offset = -1; offset <= 1; offset++) {
            BOARD[position[0] + offset][position[1]] = getShip(shipType).type;
          } 
        }else if(shipType === SHIPS.PATROL_BOAT_SHIP) {
          for (let offset = 0; offset <= 1; offset++) {
            BOARD[position[0] + offset][position[1]] = getShip(shipType).type;
          } 
        }
      }
      placedShips.add(shipType);
      return true;
    }

    return ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED;
  }

  // Check whether ship can be placed on board
  function canPlaceShip(shipType, position, axis) {

    if(getShip(shipType) === false) return false;
    if(placedShips.has(shipType)) return false;

    if(axis === AXIS.X) return canPlaceShipHorizontally(shipType, position);
    if(axis === AXIS.Y) return canPlaceShipVertically(shipType, position);

    return false;
  }

  function receiveAttack(row, col) {

  }



  // Remove getShip, canPlaceShip, isCellEmpty
  return {
    getBoard,
    placeShip,
    getShip,
    canPlaceShip,
    isCellEmpty,
    isCollision
  }
}

export {
  gameBoard
}