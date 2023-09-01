import gameBoard from "./gameBoardFactory.js";
import { CELL_STATES } from "./config.js";

function computerPlayer() {

  let gameBoardInstance;
  const possibleAttacks = [];
  
  function setGameBoardInstance() {
    if(!gameBoardInstance) gameBoardInstance = gameBoard();
  }

  function getBoard(){
    setGameBoardInstance();
    return gameBoardInstance.getBoard();
  }

  function getPossibleAttacks() {
    if(possibleAttacks.length === 0){
      getBoard().forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if(cell === CELL_STATES.EMPTY) possibleAttacks.push([rowIndex, colIndex])
        });
      });
    }
    return possibleAttacks;
  }
  
  function removePossibleAttack(index) {
    possibleAttacks.splice(index, 1);
  }

  function randomAttack() {
    if(getPossibleAttacks().length > 0) {
      const randomIndex = Math.floor(Math.random() * getPossibleAttacks().length);
      const randomPossibleAttack = getPossibleAttacks()[randomIndex];
      gameBoardInstance.receiveAttack(randomPossibleAttack[0], randomPossibleAttack[1]);
      removePossibleAttack(randomIndex);
      return getPossibleAttacks();
    }
    return false;
  }




  // remove  possibleAttacks, generatePossibleAttacks
  return {
    getBoard,
    getPossibleAttacks,
    randomAttack
  }
}

export default computerPlayer;