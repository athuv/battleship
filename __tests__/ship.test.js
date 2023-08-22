import {ship} from '../src/js/ship';

describe('Ship factory functions', () => {
  test('carrier function - return carrier ship object', () => {
    const carrierShip = ship().carrier();
    expect(carrierShip.size).toBe(5);
  });
  test('Battleship function - return battleship object', () => {
    const battleShip = ship().battleship();
    expect(battleShip.size).toBe(4);
  });
  test('Cruiser function - return cruiser ship object', () => {
    const cruiser = ship().cruiser();
    expect(cruiser.size).toBe(3);
  });
  test('Submarine function - return submarine ship object', () => {
    const submarine = ship().submarine();
    expect(submarine.size).toBe(3);
  });
  test('Patrol Boat function - return patrolBoat ship object', () => {
    const patrolBoat = ship().patrolBoat();
    expect(patrolBoat.size).toBe(2);
  });
});

describe('hit() should decrease life and when life is 0 sunked should become true', () => {
  
  test('Carrier Boat hit()', () => {
    const carrierShip = ship().carrier();
    carrierShip.hit();
    expect(carrierShip.life).toBe(4);
    expect(carrierShip.isSunked).toBe(false);

    carrierShip.hit();
    carrierShip.hit();
    carrierShip.hit();
    carrierShip.hit();
    expect(carrierShip.life).toBe(0);
    expect(carrierShip.isSunked).toBe(true);
  });

  test('Battle Ship hit()', () => {
    const battleShip = ship().battleship();
    battleShip.hit();
    expect(battleShip.life).toBe(3);
    expect(battleShip.isSunked).toBe(false);

    battleShip.hit();
    battleShip.hit();
    battleShip.hit();
    expect(battleShip.life).toBe(0);
    expect(battleShip.isSunked).toBe(true);
  });

  test('Cruiser Ship hit()', () => {
    const cruiserShip = ship().cruiser();
    cruiserShip.hit();
    expect(cruiserShip.life).toBe(2);
    expect(cruiserShip.isSunked).toBe(false);

    cruiserShip.hit();
    cruiserShip.hit();
    expect(cruiserShip.life).toBe(0);
    expect(cruiserShip.isSunked).toBe(true);
  });

  test('Submarine Ship hit()', () => {
    const submarine = ship().submarine();
    submarine.hit();
    expect(submarine.life).toBe(2);
    expect(submarine.isSunked).toBe(false);

    submarine.hit();
    submarine.hit();
    expect(submarine.life).toBe(0);
    expect(submarine.isSunked).toBe(true);
  });

  test('Patrol Boat hit()', () => {
    const patrolBoat = ship().patrolBoat();
    patrolBoat.hit();
    expect(patrolBoat.life).toBe(1);
    expect(patrolBoat.isSunked).toBe(false);

    patrolBoat.hit();
    expect(patrolBoat.life).toBe(0);
    expect(patrolBoat.isSunked).toBe(true);
  });
});