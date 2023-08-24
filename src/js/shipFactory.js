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
    const carrier = createShip(5, 'CA');
    return carrier;
  }

  function battleship() {
    const battleShip = createShip(4, 'B');
    return battleShip;
  }

  function cruiser() {
    const cruiser = createShip(3, 'CR');
    return cruiser;
  }

  function submarine() {
    const submarine = createShip(3, 'S');
    return submarine;
  }

  function patrolBoat() {
    const patrolBoat = createShip(2, 'P');
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