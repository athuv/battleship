function player() {
  function createPlayer(name) {
    return {
      name: name
    }
  }

  return {
    createPlayer
  }
}

export default player;