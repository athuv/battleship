import gameBoard from "./gameBoardFactory.js";

function computerPlayer() {

  let gameBoardInstance;
  
  function setGameBoardInstance() {
    if(!gameBoardInstance) gameBoardInstance = gameBoard();
  }

  function getBoard(){
    setGameBoardInstance();
    return gameBoardInstance.getBoard();
  }

  return {
    getBoard
  }
}

export default computerPlayer;