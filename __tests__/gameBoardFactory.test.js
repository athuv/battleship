import gameBoard from '../src/js/gameBoardFactory.js';
import ship from '../src/js/shipFactory.js';
import { GRID, CELL_STATES, SHIP, ERROR_MESSAGES, AXIS, MESSAGES } from '../src/js/config.js';

describe('Initializing 10x10 Board', () => {
  const board = gameBoard();

  test('Board rows must be 10', () => {
    expect(gameBoard().getBoard().length).toBe(GRID.ROWS);
  });

  test('Board 1st columns must be 10', () => {
    expect(gameBoard().getBoard()[0].length).toBe(GRID.COLUMNS);
  });

  test('Get specific cell status', () => {
    expect(gameBoard().getBoard(3, 6)).toBe(CELL_STATES.EMPTY);
  });

  test('Check if cell emty, true', () => {
    expect(gameBoard().isCellEmpty(3, 6)).toBe(true);
  });

  board.placeShip(SHIP.BATTLESHIP.NAME, [4, 1], AXIS.Y);
  test('Check if cell emty, false', () => {
    expect(board.isCellEmpty(4, 1)).toBe(false);
  });

  test('Board 5th Rows must be 10', () => {
    expect(gameBoard().getBoard()[4].length).toBe(GRID.ROWS);
  });

  test('Board 10th Rows must be 10', () => {
    expect(gameBoard().getBoard()[9].length).toBe(GRID.ROWS);
  });

  test('Board Values must be empty representing Empty', () => {
    expect(gameBoard().getBoard()[0][0]).toBe(CELL_STATES.EMPTY);
  });
});

describe('Get Ships in gameBoardFactory', () => {
  test('Invalid Ship Name', () => {
    expect(gameBoard().getShip('invalid')).toBe(false);
  });

  test('Carrier Ship Type', () => {
    expect(gameBoard().getShip(SHIP.CARRIER.NAME).type).toBe(SHIP.CARRIER.ABBREVIATION);
  });

  test('Battleship Type', () => {
    expect(gameBoard().getShip(SHIP.BATTLESHIP.NAME).type).toBe(SHIP.BATTLESHIP.ABBREVIATION);
  });
});

describe('Checking whether ship can be placed on X axis', () => {
  
  test('Checking ship name rather than 5 ships', () => {
    expect(gameBoard().canPlaceShip('cargo', [0,2], AXIS.X)).toBe(false);
  });

  test('placing carrier ship at 1st row 3rd column', () => {
    expect(gameBoard().canPlaceShip(SHIP.CARRIER.NAME, [0,2], AXIS.X)).toBe(true);
  });

  test('placing carrier ship at 1st row 2nd column', () => {
    expect(gameBoard().canPlaceShip(SHIP.CARRIER.NAME, [0,1], AXIS.X)).toBe(false);
  });

  test('placing battleship at 1st row 8th column', () => {
    expect(gameBoard().canPlaceShip(SHIP.BATTLESHIP.NAME, [4,2], AXIS.X)).toBe(true);
  });

  test('placing battleship at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip(SHIP.BATTLESHIP.NAME, [0,0], AXIS.X)).toBe(false);
  });

  test('placing cruiser at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip(SHIP.CRUISER.NAME, [0,0], AXIS.X)).toBe(false);
  });

  test('placing submarine at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip(SHIP.SUBMARINE.NAME, [0,0], AXIS.X)).toBe(false);
  });

  test('placing patrolBoat at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip(SHIP.PATROLBOAT.NAME, [0,0], AXIS.X)).toBe(true);
  });

  test('placing patrolBoat at 1st row 9th column', () => {
    expect(gameBoard().canPlaceShip(SHIP.PATROLBOAT.NAME, [0,8], AXIS.X)).toBe(true);
  });
});

describe('Checking whether ship can be placed on X axis', () => {
  test('Checking ship name rather than 5 ships', () => {
    expect(gameBoard().canPlaceShip('cargo', [0,2], AXIS.X)).toBe(false);
  });

  test('placing carrier ship at 1st row 3rd column', () => {
    expect(gameBoard().canPlaceShip(SHIP.CARRIER.NAME, [2,2], AXIS.Y)).toBe(true);
  });

  test('placing carrier ship at 1st row 2nd column', () => {
    expect(gameBoard().canPlaceShip(SHIP.CARRIER.NAME, [0,1], AXIS.Y)).toBe(false);
  });

  test('placing battleship at 1st row 8th column', () => {
    expect(gameBoard().canPlaceShip(SHIP.BATTLESHIP.NAME, [4,2], AXIS.Y)).toBe(true);
  });

  test('placing battleship at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip(SHIP.BATTLESHIP.NAME, [0,0], AXIS.Y)).toBe(false);
  });

  test('placing cruiser at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip(SHIP.CRUISER.NAME, [0,0], AXIS.Y)).toBe(false);
  });

  test('placing submarine at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip(SHIP.SUBMARINE.NAME, [0,0], AXIS.Y)).toBe(false);
  });

  test('placing patrolBoat at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip(SHIP.PATROLBOAT.NAME, [0,0], AXIS.Y)).toBe(true);
  });

  test('placing patrolBoat at 1st row 9th column', () => {
    expect(gameBoard().canPlaceShip(SHIP.PATROLBOAT.NAME, [0,8], AXIS.Y)).toBe(true);
  });
});

describe('Placing Ships X axis', () => {
  const board = gameBoard();
  // Carrier Ship
  board.placeShip(SHIP.CARRIER.NAME, [2, 4], AXIS.X);
  test('Place carrier ship on X axis', () => {
    expect(board.getBoard()[2][2]).toBe(SHIP.CARRIER.ABBREVIATION);
  });
  test('Place carrier ship on X axis', () => {
    expect(board.getBoard()[2][3]).toBe(SHIP.CARRIER.ABBREVIATION);
  });
  test('Place carrier ship on X axis', () => {
    expect(board.getBoard()[2][4]).toBe(SHIP.CARRIER.ABBREVIATION);
  });
  test('Place carrier ship on X axis', () => {
    expect(board.getBoard()[2][5]).toBe(SHIP.CARRIER.ABBREVIATION);
  });
  test('Place carrier ship on X axis', () => {
    expect(board.getBoard()[2][6]).toBe(SHIP.CARRIER.ABBREVIATION);
  });
 
  // BattleShip
  board.placeShip(SHIP.BATTLESHIP.NAME, [3, 1], AXIS.X);
  test('Place BattleShip on X axis', () => {
    expect(board.getBoard()[3][0]).toBe(SHIP.BATTLESHIP.ABBREVIATION);
  });
  test('Place BattleShip on X axis', () => {
    expect(board.getBoard()[3][1]).toBe(SHIP.BATTLESHIP.ABBREVIATION);
  });
  test('Place BattleShip on X axis', () => {
    expect(board.getBoard()[3][2]).toBe(SHIP.BATTLESHIP.ABBREVIATION);
  });
  test('Place BattleShip on X axis', () => {
    expect(board.getBoard()[3][3]).toBe(SHIP.BATTLESHIP.ABBREVIATION);
  });

  // Cruiser Ship
  board.placeShip(SHIP.CRUISER.NAME, [5, 1], AXIS.X);
  test('Place cruiser ship on X axis', () => {
    expect(board.getBoard()[5][0]).toBe(SHIP.CRUISER.ABBREVIATION);
  });
  test('Place cruiser ship on X axis', () => {
    expect(board.getBoard()[5][1]).toBe(SHIP.CRUISER.ABBREVIATION);
  });
  test('Place cruiser ship on X axis', () => {
    expect(board.getBoard()[5][2]).toBe(SHIP.CRUISER.ABBREVIATION);
  });

  // Submarine Ship
  board.placeShip(SHIP.SUBMARINE.NAME, [7, 1], AXIS.X);
  test('Place submarine ship on X axis', () => {
    expect(board.getBoard()[7][0]).toBe(SHIP.SUBMARINE.ABBREVIATION);
  });
  test('Place submarine ship on X axis', () => {
    expect(board.getBoard()[7][1]).toBe(SHIP.SUBMARINE.ABBREVIATION);
  });
  test('Place submarine ship on X axis', () => {
    expect(board.getBoard()[7][2]).toBe(SHIP.SUBMARINE.ABBREVIATION);
  });

  // Patrol Boat
  board.placeShip(SHIP.PATROLBOAT.NAME, [8, 0], AXIS.X);
  test('Place submarine ship on X axis', () => {
    expect(board.getBoard()[8][0]).toBe(SHIP.PATROLBOAT.ABBREVIATION);
  });
  test('Place submarine ship on X axis', () => {
    expect(board.getBoard()[8][1]).toBe(SHIP.PATROLBOAT.ABBREVIATION);
  });
});

describe('Placing Ships Y axis', () => {
  const board = gameBoard();
  // Carrier Ship
  board.placeShip(SHIP.CARRIER.NAME, [2, 4], AXIS.Y);
  test('Place carrier ship on Y axis', () => {
    expect(board.getBoard()[0][4]).toBe(SHIP.CARRIER.ABBREVIATION);
  });
  test('Place carrier ship on Y axis', () => {
    expect(board.getBoard()[1][4]).toBe(SHIP.CARRIER.ABBREVIATION);
  });
  test('Place carrier ship on Y axis', () => {
    expect(board.getBoard()[2][4]).toBe(SHIP.CARRIER.ABBREVIATION);
  });
  test('Place carrier ship on Y axis', () => {
    expect(board.getBoard()[3][4]).toBe(SHIP.CARRIER.ABBREVIATION);
  });
  test('Place carrier ship on Y axis', () => {
    expect(board.getBoard()[4][4]).toBe(SHIP.CARRIER.ABBREVIATION);
  });
 
  // BattleShip
  board.placeShip(SHIP.BATTLESHIP.NAME, [3, 1], AXIS.Y);
  test('Place BattleShip on Y axis', () => {
    expect(board.getBoard()[2][1]).toBe(SHIP.BATTLESHIP.ABBREVIATION);
  });
  test('Place BattleShip on Y axis', () => {
    expect(board.getBoard()[3][1]).toBe(SHIP.BATTLESHIP.ABBREVIATION);
  });
  test('Place BattleShip on Y axis', () => {
    expect(board.getBoard()[4][1]).toBe(SHIP.BATTLESHIP.ABBREVIATION);
  });
  test('Place BattleShip on Y axis', () => {
    expect(board.getBoard()[5][1]).toBe(SHIP.BATTLESHIP.ABBREVIATION);
  });

  // Cruiser Ship
  board.placeShip(SHIP.CRUISER.NAME, [5, 7], AXIS.Y);
  test('Place cruiser ship on Y axis', () => {
    expect(board.getBoard()[4][7]).toBe(SHIP.CRUISER.ABBREVIATION);
  });
  test('Place cruiser ship on Y axis', () => {
    expect(board.getBoard()[5][7]).toBe(SHIP.CRUISER.ABBREVIATION);
  });
  test('Place cruiser ship on Y axis', () => {
    expect(board.getBoard()[6][7]).toBe(SHIP.CRUISER.ABBREVIATION);
  });

  // Submarine Ship
  board.placeShip(SHIP.SUBMARINE.NAME, [7, 9], AXIS.Y);
  test('Place submarine ship on Y axis', () => {
    expect(board.getBoard()[6][9]).toBe(SHIP.SUBMARINE.ABBREVIATION);
  });
  test('Place submarine ship on Y axis', () => {
    expect(board.getBoard()[7][9]).toBe(SHIP.SUBMARINE.ABBREVIATION);
  });
  test('Place submarine ship on Y axis', () => {
    expect(board.getBoard()[8][9]).toBe(SHIP.SUBMARINE.ABBREVIATION);
  });

  // Patrol Boat
  board.placeShip(SHIP.PATROLBOAT.NAME, [8, 5], AXIS.Y);
  test('Place submarine ship on Y axis', () => {
    expect(board.getBoard()[8][5]).toBe(SHIP.PATROLBOAT.ABBREVIATION);
  });
  test('Place submarine ship on Y axis', () => {
    expect(board.getBoard()[9][5]).toBe(SHIP.PATROLBOAT.ABBREVIATION);
  });
});

describe('Ship placement collisions X axis', () => {
  const board = gameBoard();

  board.placeShip(SHIP.CARRIER.NAME, [2, 4], AXIS.X);  
  test('placing carrier ship above previously placed ship', () => {
    expect(board.placeShip(SHIP.CARRIER.NAME, [2, 7], AXIS.X)).toBe(ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED);
  });

  board.placeShip(SHIP.BATTLESHIP.NAME, [3, 1], AXIS.X);
  test('placing battleship above previously placed ship', () => {
    expect(board.placeShip(SHIP.BATTLESHIP.NAME, [3, 4], AXIS.X)).toBe(ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED);
  });

  board.placeShip(SHIP.CRUISER.NAME, [4, 1], AXIS.X);
  test('placing cruiser ship above previously placed ship', () => {
    expect(board.placeShip(SHIP.CRUISER.NAME, [3, 4], AXIS.X)).toBe(ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED);
  });

  board.placeShip(SHIP.CRUISER.NAME, [5, 1], AXIS.X);
  test('placing cruiser ship above previously placed ship', () => {
    expect(board.placeShip(SHIP.CRUISER.NAME, [5, 2], AXIS.X)).toBe(ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED);
  });

  board.placeShip(SHIP.SUBMARINE.NAME, [6, 1], AXIS.X);
  test('placing cruiser ship above previously placed ship', () => {
    expect(board.placeShip(SHIP.SUBMARINE.NAME, [6, 2], AXIS.X)).toBe(ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED);
  });
});

describe('Ship placement collisions Y axis', () => {
  const board = gameBoard();

  board.placeShip(SHIP.CARRIER.NAME, [2, 4], AXIS.Y);  
  test('placing carrier ship above previously placed ship', () => {
    expect(board.placeShip(SHIP.CARRIER.NAME, [3, 2], AXIS.X)).toBe(ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED);
  });

  board.placeShip(SHIP.BATTLESHIP.NAME, [3, 1], AXIS.Y);
  test('placing battleship above previously placed ship', () => {
    expect(board.placeShip(SHIP.BATTLESHIP.NAME, [5, 1], AXIS.Y)).toBe(ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED);
  });

  board.placeShip(SHIP.CRUISER.NAME, [4, 1], AXIS.Y);
  test('placing cruiser ship above previously placed ship', () => {
    expect(board.placeShip(SHIP.CRUISER.NAME, [3, 4], AXIS.Y)).toBe(ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED);
  });

  board.placeShip(SHIP.SUBMARINE.NAME, [5, 1], AXIS.Y);
  test('placing submarine ship above previously placed ship', () => {
    expect(board.placeShip(SHIP.SUBMARINE.NAME, [6, 1], AXIS.Y)).toBe(ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED);
  });

  board.placeShip(SHIP.PATROLBOAT.NAME, [6, 1], AXIS.Y);
  test('placing cruiser patrol boat above previously placed ship', () => {
    expect(board.placeShip(SHIP.PATROLBOAT.NAME, [5, 1], AXIS.Y)).toBe(ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED);
  });
});

describe('Placing same boat more than once', () => {
  const board = gameBoard();
  board.placeShip(SHIP.CARRIER.NAME, [2, 4], AXIS.Y);
  test('Placing carrier boat twice', () => {
    expect(board.placeShip(SHIP.CARRIER.NAME, [9, 4], AXIS.Y)).toBe(ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED);
  });
});

describe('Receiving attacks', () => {
  const board = gameBoard();

  test('Attacking on empty cell', () => {
    board.receiveAttack(1, 3);
    expect(board.getBoard(1, 3)).toBe(CELL_STATES.MISS);
  });

  test('Attacking on already hit cell', () => {
    board.receiveAttack(1, 3)
    expect(board.receiveAttack(1, 3)).toBe(ERROR_MESSAGES.ALREADY_HIT);
  });


  test('Attacking on carrier ship', () => {    
    board.placeShip(SHIP.CARRIER.NAME, [2, 4], AXIS.Y);
    // board.receiveAttack(1, 4);
    board.receiveAttack(0, 4);
    expect(board.getShipInstance(SHIP.CARRIER.NAME).life).toBe(5 - 1);
    board.receiveAttack(1, 4)
    expect(board.getShipInstance(SHIP.CARRIER.NAME).life).toBe(5 - 2);
    board.receiveAttack(2, 4)
    expect(board.getShipInstance(SHIP.CARRIER.NAME).life).toBe(5 - 3);
    board.receiveAttack(3, 4)
    expect(board.getShipInstance(SHIP.CARRIER.NAME).life).toBe(5 - 4);
    board.receiveAttack(4, 4)
    expect(board.getShipInstance(SHIP.CARRIER.NAME).life).toBe(5 - 5);

    expect(board.receiveAttack(4, 4)).toBe(ERROR_MESSAGES.ALREADY_HIT);
    expect(board.receiveAttack(4, 6)).toBe(CELL_STATES.MISS);
    expect(board.getBoard(4, 6)).toBe(CELL_STATES.MISS);
  });

  test('Attacking on battle ship', () => {    
    board.placeShip(SHIP.BATTLESHIP.NAME, [5, 2], AXIS.X);

    board.receiveAttack(5, 1);
    expect(board.getShipInstance(SHIP.BATTLESHIP.NAME).life).toBe(4 - 1);
    board.receiveAttack(5, 2)
    expect(board.getShipInstance(SHIP.BATTLESHIP.NAME).life).toBe(4 - 2);
    board.receiveAttack(5, 3)
    expect(board.getShipInstance(SHIP.BATTLESHIP.NAME).life).toBe(4 - 3);
    board.receiveAttack(5, 4)
    expect(board.getShipInstance(SHIP.BATTLESHIP.NAME).life).toBe(4 - 4);

  });

  test('Attacking on cruiser ship', () => {    
    board.placeShip(SHIP.CRUISER.NAME, [8, 2], AXIS.Y);

    board.receiveAttack(7, 2);
    expect(board.getShipInstance(SHIP.CRUISER.NAME).life).toBe(3 - 1);
    board.receiveAttack(8, 2);
    expect(board.getShipInstance(SHIP.CRUISER.NAME).life).toBe(3 - 2);
    board.receiveAttack(9, 2);
    expect(board.getShipInstance(SHIP.CRUISER.NAME).life).toBe(3 - 3);
  });

  test('Attacking on submarine ship', () => {    
    board.placeShip(SHIP.SUBMARINE.NAME, [8, 1], AXIS.Y);

    board.receiveAttack(7, 1);
    expect(board.getShipInstance(SHIP.SUBMARINE.NAME).life).toBe(3 - 1);
    board.receiveAttack(8, 1);
    expect(board.getShipInstance(SHIP.SUBMARINE.NAME).life).toBe(3 - 2);
    board.receiveAttack(9, 1);
    expect(board.getShipInstance(SHIP.SUBMARINE.NAME).life).toBe(3 - 3);
  });

  test('Attacking on patrol boat', () => {    
    board.placeShip(SHIP.PATROLBOAT.NAME, [8, 0], AXIS.Y);

    board.receiveAttack(8, 0);
    expect(board.getShipInstance(SHIP.PATROLBOAT.NAME).life).toBe(2 - 1);
    board.receiveAttack(9, 0);
    expect(board.getShipInstance(SHIP.PATROLBOAT.NAME).life).toBe(2 - 2);
  });
});

describe('Is game over', () => {
  const board = gameBoard();

  test('Is game over - true or false', () => {
    board.placeShip(SHIP.CARRIER.NAME, [2, 4], AXIS.Y);
    board.placeShip(SHIP.BATTLESHIP.NAME, [5, 2], AXIS.X);
    board.placeShip(SHIP.CRUISER.NAME, [8, 2], AXIS.Y);
    board.placeShip(SHIP.SUBMARINE.NAME, [8, 1], AXIS.Y);
    board.placeShip(SHIP.PATROLBOAT.NAME, [8, 0], AXIS.Y);
  
    expect(board.isGameOver()).toBe(false);

    board.receiveAttack(0, 4);
    board.receiveAttack(1, 4);
    board.receiveAttack(2, 4);
    board.receiveAttack(3, 4);
    board.receiveAttack(4, 4);

    board.receiveAttack(5, 1);
    board.receiveAttack(5, 2);
    board.receiveAttack(5, 3);
    board.receiveAttack(5, 4);

    board.receiveAttack(7, 2);
    board.receiveAttack(8, 2);
    board.receiveAttack(9, 2);

    board.receiveAttack(7, 1);
    board.receiveAttack(8, 1);
    board.receiveAttack(9, 1);

    board.receiveAttack(8, 0);
    board.receiveAttack(9, 0);

    console.log(board.getBoard());
    expect(board.isGameOver()).toBe(true);
  });
});

describe('Are all 5 ships placed?', () => {
  const board = gameBoard();

  test('5 ships not placed', () => {
    board.placeShip(SHIP.CARRIER.NAME, [2, 4], AXIS.Y);
    // board.placeShip(SHIP.BATTLESHIP.NAME, [5, 2], AXIS.X);
    // board.placeShip(SHIP.CRUISER.NAME, [8, 2], AXIS.Y);
    board.placeShip(SHIP.SUBMARINE.NAME, [8, 1], AXIS.Y);
    board.placeShip(SHIP.PATROLBOAT.NAME, [8, 0], AXIS.Y);

    expect(board.areShipsPlaced()).toBe(false);
  });

  test('All 5 ships are placed', () => {
    board.placeShip(SHIP.CARRIER.NAME, [2, 4], AXIS.Y);
    board.placeShip(SHIP.BATTLESHIP.NAME, [5, 2], AXIS.X);
    board.placeShip(SHIP.CRUISER.NAME, [8, 2], AXIS.Y);
    board.placeShip(SHIP.SUBMARINE.NAME, [8, 1], AXIS.Y);
    board.placeShip(SHIP.PATROLBOAT.NAME, [8, 0], AXIS.Y);

    expect(board.areShipsPlaced()).toBe(true);   
  });
});