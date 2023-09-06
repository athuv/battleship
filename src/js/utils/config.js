const GRID = {
  ROWS: 10,
  COLUMNS: 10
};

const CELL_STATES = {
  EMPTY: 'Empty',
  HIT: 'Hit',
  MISS: 'Miss'
};

const AXIS = {
  X: 'x',
  Y: 'y'
}

const DIRECTIONS = {
  RIGHT: 'right',
  LEFT: 'left',
  ABOVE: 'above',
  BELOW: 'below'
}

const SHIP = {
  CARRIER: {
    NAME: 'carrier',
    ABBREVIATION: 'CA',
    MIN_OFFSET: -2,
    MAX_OFFSET: 2,
    MIN_RANGE: 2,
    MAX_RANGE: 7 
  },
  BATTLESHIP: {
    NAME: 'battleship',
    ABBREVIATION: 'B',
    MIN_OFFSET: -1,
    MAX_OFFSET: 2,
    MIN_RANGE: 1,
    MAX_RANGE: 7 
  },  
  CRUISER: {
    NAME: 'cruiser',
    ABBREVIATION: 'CR',
    MIN_OFFSET: -1,
    MAX_OFFSET: 1,
    MIN_RANGE: 1,
    MAX_RANGE: 8 
  },
  SUBMARINE: {
    NAME: 'submarine',
    ABBREVIATION: 'S',
    MIN_OFFSET: -1,
    MAX_OFFSET: 1,
    MIN_RANGE: 1,
    MAX_RANGE: 8 
  }, 
  PATROLBOAT: {
    NAME: 'patrolboat',
    ABBREVIATION: 'P',
    MIN_OFFSET: 0,
    MAX_OFFSET: 1,
    MIN_RANGE: 0,
    MAX_RANGE: 8 
  }, 
}

const ERROR_MESSAGES = {
  SHIP_CANNOT_BE_PLACED: 'Ship Cannot Be Placed Here!',
  SHIP_NOT_FOUND: 'Ship Not Found!',
  ALREADY_HIT: 'You cannot hit this cell again because it has already been attacked.',
  NO_POSSIBLE_ATTACKS: 'No more possible attacks'
};

const MESSAGES = {
  WIN: 'You Won!',
  GAME_OVER: 'Game Over',
  ALREADY_PLACED: 'Ships are already placed'
};



export {
  GRID,
  CELL_STATES,
  SHIP,
  ERROR_MESSAGES,
  AXIS,
  MESSAGES,
  DIRECTIONS
}