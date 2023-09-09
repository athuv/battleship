function player() {
  let playerOneName;
  let playerTwoName;

  function createPlayer(name, playerPosition) {
    if(playerPosition === 1) playerOneName = name;
    if(playerPosition === 2) playerTwoName = name;
  }


  function getPlayerOne() {
    return {
      name: playerOneName,
      position: 1
    };
  }

  function getPlayerTwo() {
    return {
      name: playerTwoName,
      position: 2
    };
  }

  return {
    createPlayer,
    getPlayerOne,
    getPlayerTwo
  }
}

export default player;