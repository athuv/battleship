import { SHIP } from './config.js';

function shipFactory() {

  function createShip(size, type) {
    return {
      type: type,
      size: size,
      life: size,
      isSunked: false,
      hit: function() {
        if(this.life !== 0) this.life -= 1;
        if(this.life === 0) this.isSunked = true;
      }
    }
  }

  function carrier() {
    const carrier = createShip(5, SHIP.CARRIER.ABBREVIATION);
    return carrier;
  }

  function battleship() {
    const battleShip = createShip(4, SHIP.BATTLESHIP.ABBREVIATION);
    return battleShip;
  }

  function cruiser() {
    const cruiser = createShip(3, SHIP.CRUISER.ABBREVIATION);
    return cruiser;
  }

  function submarine() {
    const submarine = createShip(3, SHIP.SUBMARINE.ABBREVIATION);
    return submarine;
  }

  function patrolboat() {
    const patrolBoat = createShip(2, SHIP.PATROLBOAT.ABBREVIATION);
    return patrolBoat;
  }

  return {
    carrier,
    battleship,
    cruiser,
    submarine,
    patrolboat
  }

}

export default shipFactory;