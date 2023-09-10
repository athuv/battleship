import { GRID, CELL_STATES, SHIP, ERROR_MESSAGES, AXIS, MESSAGES } from '../utils/config.js';
import { getShipFactoryInstance } from '../utils/instanceRegistry.js';
function gameBoard() {
  // Make sure ships only placed once
  let placedShips = new Set(); 
  const shipInstance = getShipFactoryInstance();

  function createShipInstances() {
    const shipInstances = {
      [SHIP.CARRIER.NAME]: shipInstance.carrier(),
      [SHIP.BATTLESHIP.NAME]: shipInstance.battleship(),
      [SHIP.CRUISER.NAME]: shipInstance.cruiser(),
      [SHIP.SUBMARINE.NAME]: shipInstance.submarine(),
      [SHIP.PATROLBOAT.NAME]: shipInstance.patrolboat()
    };

    return shipInstances;
  }

  const shipTypeInstances = createShipInstances();

  let BOARD = Array.from({ length: GRID.ROWS }, () =>
    Array.from({ length: GRID.COLUMNS }, () => CELL_STATES.EMPTY)
  );

  function resetBoard() {
    BOARD.length = 0;
    BOARD = Array.from({ length: GRID.ROWS }, () =>
              Array.from({ length: GRID.COLUMNS }, () => CELL_STATES.EMPTY)
            );
    placedShips = new Set();
  }

  function getBoard(row, col) {
    if(row !== undefined && col !== undefined) return BOARD[row][col];
    return BOARD;
  }

  function getShipInstance(shipType) {
    if(shipTypeInstances.hasOwnProperty(shipType)){
      return shipTypeInstances[shipType];
    }else {
      return false;
    }
  }

  function getShip(shipType) {
    if([SHIP.CARRIER.NAME, SHIP.BATTLESHIP.NAME, SHIP.CRUISER.NAME, SHIP.SUBMARINE.NAME, SHIP.PATROLBOAT.NAME].includes(shipType)){
      return shipInstance[shipType]();
    }
    return false;
  }

  function areShipsPlaced(shipType) {
    if(placedShips.size === 5) return true;
    if(placedShips.has(shipType)) return true;
    return false;
  }

  function isGameOver() {
    if((getShipInstance(SHIP.CARRIER.NAME).isSunked === true) && (getShipInstance(SHIP.BATTLESHIP.NAME).isSunked === true) && 
    (getShipInstance(SHIP.CRUISER.NAME).isSunked === true) && (getShipInstance(SHIP.SUBMARINE.NAME).isSunked === true) && 
    (getShipInstance(SHIP.PATROLBOAT.NAME).isSunked === true)) {
      return true;
    }

    return false;
  }

  function isCellEmpty(row, col) {
    if(getBoard(row, col) === CELL_STATES.EMPTY) return true;
    return false;
  }

  function updateBoard(row, col, status) {
    BOARD[row][col] = status;
    if(getBoard(row, col) === status) return true;
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
    if((shipType === SHIP.CARRIER.NAME) && (position[1] >= SHIP.CARRIER.MIN_RANGE) && (position[1] <= SHIP.CARRIER.MAX_RANGE)) {
      return isCollision(position, AXIS.X, SHIP.CARRIER.MIN_OFFSET, SHIP.CARRIER.MAX_OFFSET);

    }else if((shipType === SHIP.BATTLESHIP.NAME)  && (position[1] >= SHIP.BATTLESHIP.MIN_RANGE) && (position[1] <= SHIP.BATTLESHIP.MAX_RANGE)) {
      return isCollision(position, AXIS.X, SHIP.BATTLESHIP.MIN_OFFSET, SHIP.BATTLESHIP.MAX_OFFSET);

    }else if((shipType === SHIP.CRUISER.NAME)  && (position[1] >= SHIP.CRUISER.MIN_RANGE) && (position[1] <= SHIP.CRUISER.MAX_RANGE)) {
      return isCollision(position, AXIS.X, SHIP.CRUISER.MIN_OFFSET, SHIP.CRUISER.MAX_OFFSET);

    } else if((shipType === SHIP.SUBMARINE.NAME)  && (position[1] >= SHIP.SUBMARINE.MIN_RANGE) && (position[1] <= SHIP.SUBMARINE.MAX_RANGE)){
      return isCollision(position, AXIS.X, SHIP.SUBMARINE.MIN_OFFSET, SHIP.SUBMARINE.MAX_OFFSET);

    }else if((shipType === SHIP.PATROLBOAT.NAME)  && (position[1] >= SHIP.PATROLBOAT.MIN_RANGE) && (position[1] <= SHIP.PATROLBOAT.MAX_RANGE)) {
      return isCollision(position, AXIS.X, SHIP.PATROLBOAT.MIN_OFFSET, SHIP.PATROLBOAT.MAX_OFFSET);
    }

    return false;
  }

  // Y axis
  function canPlaceShipVertically(shipType, position) {
    if((shipType === SHIP.CARRIER.NAME) && (position[0] >= SHIP.CARRIER.MIN_RANGE) && (position[0] <= SHIP.CARRIER.MAX_RANGE)) {
      return isCollision(position, AXIS.Y, SHIP.CARRIER.MIN_OFFSET, SHIP.CARRIER.MAX_OFFSET);

    }else if((shipType === SHIP.BATTLESHIP.NAME) && (position[0] >= SHIP.BATTLESHIP.MIN_RANGE) && (position[0] <= SHIP.BATTLESHIP.MAX_RANGE)) {
      return isCollision(position, AXIS.Y, SHIP.BATTLESHIP.MIN_OFFSET, SHIP.BATTLESHIP.MAX_OFFSET);

    }else if((shipType === SHIP.CRUISER.NAME) && (position[0] >= SHIP.CRUISER.MIN_RANGE) && (position[0] <= SHIP.CRUISER.MAX_RANGE)) {
      return isCollision(position, AXIS.Y, SHIP.CRUISER.MIN_OFFSET, SHIP.CRUISER.MAX_OFFSET);

    } else if((shipType === SHIP.SUBMARINE.NAME) && (position[0] >= SHIP.SUBMARINE.MIN_RANGE) && (position[0] <= SHIP.SUBMARINE.MAX_RANGE)) {
      return isCollision(position, AXIS.Y, SHIP.SUBMARINE.MIN_OFFSET, SHIP.SUBMARINE.MAX_OFFSET);

    }else if((shipType === SHIP.PATROLBOAT.NAME) && (position[0] >= SHIP.PATROLBOAT.MIN_RANGE) && (position[0] <= SHIP.PATROLBOAT.MAX_RANGE)) {
      return isCollision(position, AXIS.Y, SHIP.PATROLBOAT.MIN_OFFSET, SHIP.PATROLBOAT.MAX_OFFSET);

    }

    return false;
  }

  function placeShip(shipType, position, axis) {
    if(canPlaceShip(shipType, position, axis)) {
      if(axis === AXIS.X) {
        if(shipType === SHIP.CARRIER.NAME) {
          for (let offset = SHIP.CARRIER.MIN_OFFSET; offset <= SHIP.CARRIER.MAX_OFFSET; offset++) {
            updateBoard(position[0], position[1] + offset, getShip(shipType).type);
          }          
        }else if(shipType === SHIP.BATTLESHIP.NAME) {
          for (let offset = SHIP.BATTLESHIP.MIN_OFFSET; offset <= SHIP.BATTLESHIP.MAX_OFFSET; offset++) {
            updateBoard(position[0], position[1] + offset, getShip(shipType).type);
          } 
        }else if(shipType === SHIP.CRUISER.NAME) {
          for (let offset = SHIP.CRUISER.MIN_OFFSET; offset <= SHIP.CRUISER.MAX_OFFSET; offset++) {
            updateBoard(position[0], position[1] + offset, getShip(shipType).type);
          } 
        }else if(shipType === SHIP.SUBMARINE.NAME){
          for (let offset = SHIP.SUBMARINE.MIN_OFFSET; offset <= SHIP.SUBMARINE.MAX_OFFSET; offset++) {
            updateBoard(position[0], position[1] + offset, getShip(shipType).type);
          } 
        }else if(shipType === SHIP.PATROLBOAT.NAME) {
          for (let offset = SHIP.PATROLBOAT.MIN_OFFSET; offset <= SHIP.PATROLBOAT.MAX_OFFSET; offset++) {
            updateBoard(position[0], position[1] + offset, getShip(shipType).type);
          } 
        }
      }
      
      if(axis === AXIS.Y) {
        if(shipType === SHIP.CARRIER.NAME) {
          for (let offset = SHIP.CARRIER.MIN_OFFSET; offset <= SHIP.CARRIER.MAX_OFFSET; offset++) {
            updateBoard(position[0] + offset, position[1], getShip(shipType).type);
          }          
        }else if(shipType === SHIP.BATTLESHIP.NAME) {
          for (let offset = SHIP.BATTLESHIP.MIN_OFFSET; offset <= SHIP.BATTLESHIP.MAX_OFFSET; offset++) {
            updateBoard(position[0] + offset, position[1], getShip(shipType).type);
          } 
        }else if(shipType === SHIP.CRUISER.NAME) {
          for (let offset = SHIP.CRUISER.MIN_OFFSET; offset <= SHIP.CRUISER.MAX_OFFSET; offset++) {
            updateBoard(position[0] + offset, position[1], getShip(shipType).type);
          } 
        }else if(shipType === SHIP.SUBMARINE.NAME) {
          for (let offset = SHIP.SUBMARINE.MIN_OFFSET; offset <= SHIP.SUBMARINE.MAX_OFFSET; offset++) {
            updateBoard(position[0] + offset, position[1], getShip(shipType).type);
          } 
        }else if(shipType === SHIP.PATROLBOAT.NAME) {
          for (let offset = SHIP.PATROLBOAT.MIN_OFFSET; offset <= SHIP.PATROLBOAT.MAX_OFFSET; offset++) {
            updateBoard(position[0] + offset, position[1], getShip(shipType).type);
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
    if(isGameOver()) return  MESSAGES.WIN;
    if((getBoard(row, col) === CELL_STATES.HIT) || (getBoard(row, col) === CELL_STATES.MISS)) return ERROR_MESSAGES.ALREADY_HIT;
    if(isCellEmpty(row, col)){
      updateBoard(row, col, CELL_STATES.MISS);
      return CELL_STATES.MISS;
    }

    if(getBoard(row, col) === SHIP.CARRIER.ABBREVIATION) {      
      updateBoard(row, col, CELL_STATES.HIT);
      getShipInstance(SHIP.CARRIER.NAME).hit();
      return CELL_STATES.HIT;
    }

    if(getBoard(row, col) === SHIP.BATTLESHIP.ABBREVIATION) {      
      updateBoard(row, col, CELL_STATES.HIT);      
      getShipInstance(SHIP.BATTLESHIP.NAME).hit();
      return CELL_STATES.HIT;
    }

    if(getBoard(row, col) === SHIP.CRUISER.ABBREVIATION) {      
      updateBoard(row, col, CELL_STATES.HIT);      
      getShipInstance(SHIP.CRUISER.NAME).hit();
      return CELL_STATES.HIT;
    }

    if(getBoard(row, col) === SHIP.SUBMARINE.ABBREVIATION) {      
      updateBoard(row, col, CELL_STATES.HIT);      
      getShipInstance(SHIP.SUBMARINE.NAME).hit();
      return CELL_STATES.HIT;
    }

    if(getBoard(row, col) === SHIP.PATROLBOAT.ABBREVIATION) {      
      updateBoard(row, col, CELL_STATES.HIT);      
      getShipInstance(SHIP.PATROLBOAT.NAME).hit();
      return CELL_STATES.HIT;
    }
  }

  function possiblePlacementCells(shipType, position, axis) {
    const possilbeCells = [];

    if(canPlaceShip(shipType, position, axis)) {
      if(axis === AXIS.X) {
        if(shipType === SHIP.CARRIER.NAME) {
          for (let offset = SHIP.CARRIER.MIN_OFFSET; offset <= SHIP.CARRIER.MAX_OFFSET; offset++) {
            possilbeCells.push([position[0], position[1] + offset]);
          }          
        }else if(shipType === SHIP.BATTLESHIP.NAME) {
          for (let offset = SHIP.BATTLESHIP.MIN_OFFSET; offset <= SHIP.BATTLESHIP.MAX_OFFSET; offset++) {
            possilbeCells.push([position[0], position[1] + offset]);
          } 
        }else if(shipType === SHIP.CRUISER.NAME) {
          for (let offset = SHIP.CRUISER.MIN_OFFSET; offset <= SHIP.CRUISER.MAX_OFFSET; offset++) {
            possilbeCells.push([position[0], position[1] + offset]);
          } 
        }else if(shipType === SHIP.SUBMARINE.NAME){
          for (let offset = SHIP.SUBMARINE.MIN_OFFSET; offset <= SHIP.SUBMARINE.MAX_OFFSET; offset++) {
            possilbeCells.push([position[0], position[1] + offset]);
          } 
        }else if(shipType === SHIP.PATROLBOAT.NAME) {
          for (let offset = SHIP.PATROLBOAT.MIN_OFFSET; offset <= SHIP.PATROLBOAT.MAX_OFFSET; offset++) {
            possilbeCells.push([position[0], position[1] + offset]);
          } 
        }
      }
      
      if(axis === AXIS.Y) {
        if(shipType === SHIP.CARRIER.NAME) {
          for (let offset = SHIP.CARRIER.MIN_OFFSET; offset <= SHIP.CARRIER.MAX_OFFSET; offset++) {
            possilbeCells.push([position[0] + offset, position[1]]);
          }          
        }else if(shipType === SHIP.BATTLESHIP.NAME) {
          for (let offset = SHIP.BATTLESHIP.MIN_OFFSET; offset <= SHIP.BATTLESHIP.MAX_OFFSET; offset++) {
            possilbeCells.push([position[0] + offset, position[1]]);
          } 
        }else if(shipType === SHIP.CRUISER.NAME) {
          for (let offset = SHIP.CRUISER.MIN_OFFSET; offset <= SHIP.CRUISER.MAX_OFFSET; offset++) {
            possilbeCells.push([position[0] + offset, position[1]]);
          } 
        }else if(shipType === SHIP.SUBMARINE.NAME) {
          for (let offset = SHIP.SUBMARINE.MIN_OFFSET; offset <= SHIP.SUBMARINE.MAX_OFFSET; offset++) {
            possilbeCells.push([position[0] + offset, position[1]]);
          } 
        }else if(shipType === SHIP.PATROLBOAT.NAME) {
          for (let offset = SHIP.PATROLBOAT.MIN_OFFSET; offset <= SHIP.PATROLBOAT.MAX_OFFSET; offset++) {
            possilbeCells.push([position[0] + offset, position[1]]);
          } 
        }
      }
      
      return possilbeCells;
    }

    return false;
  }

  // Remove getShip, canPlaceShip, isCellEmpty, updateBoard
  return {
    getBoard,
    placeShip,
    getShip,
    canPlaceShip,
    isCellEmpty,
    isCollision,
    updateBoard,
    receiveAttack,
    isGameOver,
    areShipsPlaced,
    resetBoard,
    getShipInstance,
    possiblePlacementCells
  }
}

export default gameBoard;