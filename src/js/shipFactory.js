function ship() {

  function createShip(size) {
    return {
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
    const carrier = createShip(5);
    return carrier;
  }

  function battleship() {
    const battleShip = createShip(4);
    return battleShip;
  }

  function cruiser() {
    const cruiser = createShip(3);
    return cruiser;
  }

  function submarine() {
    const submarine = createShip(3);
    return submarine;
  }

  function patrolBoat() {
    const patrolBoat = createShip(2);
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

export {
  ship
}