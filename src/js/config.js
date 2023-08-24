const GRID = {
  ROWS: 10,
  COLUMNS: 10
};

const CELL_STATES = {
  EMPTY: 'Empty',
  HIT: 'Hit',
  MISS: 'Miss'
};

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
  SHIP_NOT_FOUND: 'Ship Not Found!'
};

export {
  GRID,
  CELL_STATES,
  SHIPS,
  ERROR_MESSAGES,
  SHIP_ABBREVIATIONS
}