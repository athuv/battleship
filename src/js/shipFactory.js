import { SHIP_ABBREVIATIONS } from './config.js';

function ship() {

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
    const carrier = createShip(5, SHIP_ABBREVIATIONS.CARRIER);
    return carrier;
  }

  function battleship() {
    const battleShip = createShip(4, SHIP_ABBREVIATIONS.BATTLESHIP);
    return battleShip;
  }

  function cruiser() {
    const cruiser = createShip(3, SHIP_ABBREVIATIONS.CRUISER);
    return cruiser;
  }

  function submarine() {
    const submarine = createShip(3, SHIP_ABBREVIATIONS.SUBMARINE);
    return submarine;
  }

  function patrolBoat() {
    const patrolBoat = createShip(2, SHIP_ABBREVIATIONS.PATROL_BOAT);
    return patrolBoat;
  }

  return {
    carrier,
    battleship,
    cruiser,
    submarine,
    patrolBoat
  }

}

export default ship;