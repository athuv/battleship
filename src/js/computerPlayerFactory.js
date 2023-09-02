import gameBoard from "./gameBoardFactory.js";
import { CELL_STATES, MESSAGES, SHIPS, AXIS } from "./config.js";

function computerPlayer() {

  let gameBoardInstance;
  let playerOneGameBoardInstance;
  const possibleAttacks = [];
  
  function setGameBoardInstance() {
    if(!gameBoardInstance) gameBoardInstance = gameBoard();
  }

  function getGameBoardInstance() {
    setGameBoardInstance();
    return gameBoardInstance;
  }

  function getBoard(){
    setGameBoardInstance();
    return gameBoardInstance.getBoard();
  }

  function setPlayerOneGameBoardInstance(playerOneGameBoard) {
    if(!playerOneGameBoardInstance) playerOneGameBoardInstance = playerOneGameBoard;
  }

  function getPlayerOneGameBoardInstance() {
    setPlayerOneGameBoardInstance();
    return playerOneGameBoardInstance;
  }

  function getPossibleAttacks() {
    if(possibleAttacks.length === 0){
      getPlayerOneGameBoardInstance().getBoard().forEach((row, rowIndex) => {
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
      getPlayerOneGameBoardInstance().receiveAttack(randomPossibleAttack[0], randomPossibleAttack[1]);
      removePossibleAttack(randomIndex);
      return getPossibleAttacks();
    }
    return false;
  }

  function placeComputerShips() {
    if(getGameBoardInstance().areShipsPlaced() === true) return MESSAGES.ALREADY_PLACED;
    
    getGameBoardInstance().placeShip(SHIPS.CARRIER_SHIP, [2, 4], AXIS.Y);
    getGameBoardInstance().placeShip(SHIPS.BATTLE_SHIP, [5, 2], AXIS.X);
    getGameBoardInstance().placeShip(SHIPS.CRUISER_SHIP, [8, 2], AXIS.Y);
    getGameBoardInstance().placeShip(SHIPS.SUBMARINE_SHIP, [8, 1], AXIS.Y);
    getGameBoardInstance().placeShip(SHIPS.PATROL_BOAT_SHIP, [8, 0], AXIS.Y);
  }




  // remove  possibleAttacks, generatePossibleAttacks, getPlayerOneGameBoardInstance
  return {
    getBoard,
    getPossibleAttacks,
    randomAttack,
    setPlayerOneGameBoardInstance,
    getPlayerOneGameBoardInstance,
    placeComputerShips
  }
}

export default computerPlayer;