import { ship } from './shipFactory';

function gameBoard() {
  const ROWS = 10;
  const COLS = 10;
  const EMPTY = 'E';
  const HIT = 'H';
  const MISSED = 'M';
  const SHIPS = {
    CARRIER_SHIP: 'carrier',
    BATTLE_SHIP: 'battleship',
    CRUISER_SHIP: 'cruiser',
    SUBMARINE_SHIP: 'submarine',
    PATROL_BOAT_SHIP: 'patrolBoat'
  }
    
  const BOARD = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => EMPTY)
  );

  function getBoard() {
    return BOARD;
  }

  function getShip(shipType) {
    if([SHIPS.CARRIER_SHIP, SHIPS.BATTLE_SHIP, SHIPS.CRUISER_SHIP, SHIPS.SUBMARINE_SHIP, SHIPS.PATROL_BOAT_SHIP].includes(shipType)){
      return ship()[shipType]();
    }
    return false;
  }

  function placeShip(shipType, position, axis) {
    if(canPlaceShip(shipType, position, axis)) {
      if(axis === 'x') {
        if(shipType === SHIPS.CARRIER_SHIP) {
          for (let offset = -2; offset <= 2; offset++) {
            BOARD[position[0]][position[1] + offset] = getShip(shipType).type;
          }          
        }else if(shipType === SHIPS.BATTLE_SHIP) {
          for (let offset = -1; offset <= 2; offset++) {
            BOARD[position[0]][position[1] + offset] = getShip(shipType).type;
          } 
        }else if([SHIPS.CRUISER_SHIP, SHIPS.CRUISER_SHIP].includes(shipType)) {

        }

        return BOARD;
      }
    }

    return 'Ship Cannot Be Placed Here';
  }

  function canPlaceShip(shipType, position, axis) {

    if(getShip(shipType) === false) return 'Ship Not Found!';

    if(axis === 'x') {
      if((shipType === SHIPS.CARRIER_SHIP) && (position[1] >= 2) && (position[1] <= 7)) {
        // Checking for collision
        for (let offset = -2; offset <= 2; offset++) {
          if(BOARD[position[0]][position[1] + offset] !== EMPTY) {
            return false;
          }
        }
        return true;
      }else if((shipType === SHIPS.BATTLE_SHIP)  && (position[1] >= 1) && (position[1] <= 7)) {
        // Checking for collision
        for (let offset = -1; offset <= 2; offset++) {
          if(BOARD[position[0]][position[1] + offset] !== EMPTY) {
            return false;
          }
        }
        return true;
      }else if(([SHIPS.CRUISER_SHIP, SHIPS.SUBMARINE_SHIP].includes(shipType))  && (position[1] >= 1) && (position[1] <= 8)) {

      } else if((shipType === SHIPS.PATROL_BOAT_SHIP) && (position[1] >= 0) && (position[1] <= 9)) {
        return true;
      }
    }else {
      if((shipType === SHIPS.CARRIER_SHIP) && (position[0] >= 2) && (position[0] <= 7)) {        
        return true;
      }else if(['battleship', 'cruiser', 'submarine'].includes(shipType)  && (position[0] >= 1) && (position[0] <= 8)) {
        return true;
      }else if((shipType === 'patrolBoat') && (position[0] >= 0) && (position[0] <= 9)) {
        return true;
      }
    }
    return false;
  }

  // Remove getShip, canPlaceShip
  return {
    getBoard,
    placeShip,
    getShip,
    canPlaceShip
  }
}

export {
  gameBoard
}