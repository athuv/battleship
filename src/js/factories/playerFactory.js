function player() {
  let playerName;

  function createPlayer(name) {
    playerName = name;
  }


  function getPlayerName() {
    return playerName;
  }

  return {
    createPlayer,
    getPlayerName
  }
}

export default player;