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

const SHIPS = {
  CARRIER_SHIP: 'carrier',
  BATTLE_SHIP: 'battleship',
  CRUISER_SHIP: 'cruiser',
  SUBMARINE_SHIP: 'submarine',
  PATROL_BOAT_SHIP: 'patrolBoat'
}

const SHIP_ABBREVIATIONS = {
  CARRIER: 'CA',
  BATTLESHIP: 'B',
  CRUISER: 'CR',
  SUBMARINE: 'S',
  PATROL_BOAT: 'P'
};

const ERROR_MESSAGES = {
  SHIP_CANNOT_BE_PLACED: 'Ship Cannot Be Placed Here!',
  SHIP_NOT_FOUND: 'Ship Not Found!',
  ALREADY_HIT: 'You cannot hit this cell again because it has already been attacked.'
};

const MESSAGES = {
  GAME_OVER: 'Game Over'
};

const SHIP_OFFSET_VALUES = {
  CARRIER: {
    MIN_OFFSET: -2,
    MAX_OFFSET: 2
  },
  BATTLESHIP: {
    MIN_OFFSET: -1,
    MAX_OFFSET: 2
  },
  CRUISER_SUBMARINE: {
    MIN_OFFSET: -1,
    MAX_OFFSET: 1
  },
  PATROL_BOAT: {
    MIN_OFFSET: 0,
    MAX_OFFSET: 1
  }
};

export {
  GRID,
  CELL_STATES,
  SHIPS,
  ERROR_MESSAGES,
  SHIP_ABBREVIATIONS,
  AXIS,
  SHIP_OFFSET_VALUES,
  MESSAGES
}