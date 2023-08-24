import { gameBoard } from '../src/js/gameBoardFactory';

describe('Initializing 10x10 Board', () => {
  test('Board Columns must be 10', () => {
    expect(gameBoard().getBoard().length).toBe(10);
  });

  test('Board 1st Rows must be 10', () => {
    expect(gameBoard().getBoard()[0].length).toBe(10);
  });

  test('Board 5th Rows must be 10', () => {
    expect(gameBoard().getBoard()[4].length).toBe(10);
  });

  test('Board 10th Rows must be 10', () => {
    expect(gameBoard().getBoard()[9].length).toBe(10);
  });

  test('Board Values must be empty representing E', () => {
    expect(gameBoard().getBoard()[0][0]).toBe('E');
  });
});

describe('Get Ships in gameBoardFactory', () => {
  test('Invalid Ship Name', () => {
    expect(gameBoard().getShip('invalid')).toBe(false);
  });

  test('Carrier Ship Type', () => {
    expect(gameBoard().getShip('carrier').type).toBe('CA');
  });

  test('Battleship Type', () => {
    expect(gameBoard().getShip('battleship').type).toBe('B');
  });
});

describe('Checking whether ship can be placed on X axis', () => {

  test('Checking ship name rather than 5 ships', () => {
    expect(gameBoard().canPlaceShip('cargo', [0,2], 'x')).toBe('Ship Not Found!');
  });

  test('placing carrier ship at 1st row 3rd column', () => {
    expect(gameBoard().canPlaceShip('carrier', [0,2], 'x')).toBe(true);
  });

  test('placing carrier ship at 1st row 2nd column', () => {
    expect(gameBoard().canPlaceShip('carrier', [0,1], 'x')).toBe(false);
  });

  test('placing battleship at 1st row 8th column', () => {
    expect(gameBoard().canPlaceShip('battleship', [4,2], 'x')).toBe(true);
  });

  test('placing battleship at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip('battleship', [0,0], 'x')).toBe(false);
  });

  // test('placing cruiser at 1st row 8th column', () => {
  //   expect(gameBoard().canPlaceShip('cruiser', [0,8], 'x')).toBe(true);
  // });

  test('placing cruiser at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip('cruiser', [0,0], 'x')).toBe(false);
  });

  // test('placing submarine at 1st row 8th column', () => {
  //   expect(gameBoard().canPlaceShip('submarine', [0,8], 'x')).toBe(true);
  // });

  test('placing submarine at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip('submarine', [0,0], 'x')).toBe(false);
  });

  test('placing patrolBoat at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip('patrolBoat', [0,0], 'x')).toBe(true);
  });

  test('placing patrolBoat at 1st row 9th column', () => {
    expect(gameBoard().canPlaceShip('patrolBoat', [0,9], 'x')).toBe(true);
  });

});

describe('Checking whether ship can be placed on Y axis', () => {

  test('Checking ship name rather than 5 ships', () => {
    expect(gameBoard().canPlaceShip('cargo', [0,2], 'y')).toBe('Ship Not Found!');
  });

  test('placing carrier ship at 2nd row 5th column', () => {
    expect(gameBoard().canPlaceShip('carrier', [2,5], 'y')).toBe(true);
  });

  test('placing carrier ship at 1st row 2nd column', () => {
    expect(gameBoard().canPlaceShip('carrier', [0,1], 'y')).toBe(false);
  });

  test('placing battleship at 8th row 2nd column', () => {
    expect(gameBoard().canPlaceShip('battleship', [8,2], 'y')).toBe(true);
  });

  test('placing battleship at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip('battleship', [0,0], 'y')).toBe(false);
  });

  test('placing cruiser at 8th row 2nd column', () => {
    expect(gameBoard().canPlaceShip('cruiser', [8,2], 'y')).toBe(true);
  });

  test('placing cruiser at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip('cruiser', [0,0], 'y')).toBe(false);
  });

  test('placing submarine at 8th row 2nd column', () => {
    expect(gameBoard().canPlaceShip('submarine', [8,2], 'y')).toBe(true);
  });

  test('placing submarine at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip('submarine', [0,0], 'y')).toBe(false);
  });

  test('placing patrolBoat at 1st row 1st column', () => {
    expect(gameBoard().canPlaceShip('patrolBoat', [0,0], 'y')).toBe(true);
  });

  test('placing patrolBoat at 1st row 9th column', () => {
    expect(gameBoard().canPlaceShip('patrolBoat', [0,9], 'y')).toBe(true);
  });

});

describe('Placing Ships', () => {
  const board = gameBoard();

  // Carrier Ship
  board.placeShip('carrier', [2, 4], 'x');
  test('Place carrier ship on X axis', () => {
    expect(board.getBoard()[2][2]).toBe('CA');
  });
  test('Place carrier ship on X axis', () => {
    expect(board.getBoard()[2][3]).toBe('CA');
  });
  test('Place carrier ship on X axis', () => {
    expect(board.getBoard()[2][4]).toBe('CA');
  });
  test('Place carrier ship on X axis', () => {
    expect(board.getBoard()[2][5]).toBe('CA');
  });
  test('Place carrier ship on X axis', () => {
    expect(board.getBoard()[2][6]).toBe('CA');
  });
 
  // BattleShip
  board.placeShip('battleship', [3, 1], 'x');
  test('Place BattleShip on X axis', () => {
    expect(board.getBoard()[3][0]).toBe('B');
  });
  test('Place BattleShip on X axis', () => {
    expect(board.getBoard()[3][1]).toBe('B');
  });
  test('Place BattleShip on X axis', () => {
    expect(board.getBoard()[3][2]).toBe('B');
  });
  test('Place BattleShip on X axis', () => {
    expect(board.getBoard()[3][3]).toBe('B');
  });

 
});

describe('Ship placement collisions', () => {
  const board = gameBoard();

  board.placeShip('carrier', [2, 4], 'x');  
  test('placing carrier ship above previously placed ship', () => {
    expect(board.placeShip('carrier', [2, 7], 'x')).toBe('Ship Cannot Be Placed Here');
  });

  board.placeShip('battleship', [3, 1], 'x');
  test('placing battleship above previously placed ship', () => {
    expect(board.placeShip('battleship', [3, 4], 'x')).toBe('Ship Cannot Be Placed Here');
  });
});