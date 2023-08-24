import { ship } from './shipFactory';

function gameBoard() {
  const ROWS = 10;
  const COLS = 10;
  const EMPTY = 'E';
  const HIT = 'H';
  const MISSED = 'M';
  // const SHIP_TYPE = {
  //   CARRIER_SHIP: 'CA',
  //   BATTLE_SHIP: 'B',
  //   CRUISER_SHIP: 'CR',
  //   SUBMARINE_SHIP: 'S',
  //   PATROL_BOAT_SHIP: 'P'
  // }
    
  const BOARD = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => EMPTY)
  );

  function getBoard() {
    return BOARD;
  }

  function getShip(shipType) {
    if(['carrier', 'battleship', 'cruiser', 'submarine', 'patrolBoat'].includes(shipType)){
      return ship()[shipType]();
    }
    return false;
  }

  function placeShip(shipType, position, axis) {
    if((shipType === CARRIER_SHIP) && (axis === 'x') && (position[1] >= 2) && (position[1] <= 7) ){
      BOARD[position[0]][position[1] - 2] = CARRIER_SHIP;
      BOARD[position[0]][position[1] - 1] = CARRIER_SHIP;
      BOARD[position[0]][position[1]] = CARRIER_SHIP;
      BOARD[position[0]][position[1] + 1] = CARRIER_SHIP;
      BOARD[position[0]][position[1] + 2] = CARRIER_SHIP;
      return getBoard();
    }else{
      return 'cannot be placed here'
    }
  }

  function canPlaceShip(shipType, position, axis) {

    if(getShip(shipType) === false) return 'Ship Not Found!';

    if(axis === 'x') {
      if((shipType === 'carrier') && (position[1] >= 2) && (position[1] <= 7)) {
        return true;
      }else if(['battleship', 'cruiser', 'submarine'].includes(shipType)  && (position[1] >= 1) && (position[1] <= 8)) {
        return true;
      }else if((shipType === 'patrolBoat') && (position[1] >= 0) && (position[1] <= 9)) {
        return true;
      }

      return false;
    }else {

    }


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