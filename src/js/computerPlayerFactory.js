import gameBoard from "./gameBoardFactory.js";
import { CELL_STATES, MESSAGES, SHIP, AXIS } from "./config.js";

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

  function getRandomCoordInRange(min, max) {
    const row =  Math.floor(Math.random() * (max - min + 1)) + min;
    const col =  Math.floor(Math.random() * (max - min + 1)) + min;

    return [row, col];
  }

  function placeComputerShips() {
    getGameBoardInstance().resetBoard();
    if(getGameBoardInstance().areShipsPlaced() === true) return MESSAGES.ALREADY_PLACED;
    const ships = [SHIP.CARRIER.NAME, SHIP.BATTLESHIP.NAME, SHIP.CRUISER.NAME, SHIP.SUBMARINE.NAME, SHIP.PATROLBOAT.NAME];

    ships.forEach((ship) => {
      let isPlaced = false;
      let range = [];

      while(!isPlaced) {
        const randomAxis = Math.random() < 0.5 ? AXIS.X : AXIS.Y;

        const gameBoardInstance = getGameBoardInstance();
        if(ship === SHIP.CARRIER.NAME) range = getRandomCoordInRange(SHIP.CARRIER.MIN_RANGE, SHIP.CARRIER.MAX_RANGE);
        if(ship === SHIP.BATTLESHIP.NAME) range = getRandomCoordInRange(SHIP.BATTLESHIP.MIN_RANGE, SHIP.BATTLESHIP.MAX_RANGE);
        if(ship === SHIP.CRUISER.NAME) range = getRandomCoordInRange(SHIP.CRUISER.MIN_RANGE, SHIP.CRUISER.MAX_RANGE);
        if(ship === SHIP.SUBMARINE.NAME) range = getRandomCoordInRange(SHIP.SUBMARINE.MIN_RANGE, SHIP.SUBMARINE.MAX_RANGE);
        if(ship === SHIP.PATROLBOAT.NAME) range = getRandomCoordInRange(SHIP.PATROLBOAT.MIN_RANGE, SHIP.PATROLBOAT.MAX_RANGE);
        
        const shipPlaced = gameBoardInstance.placeShip(ship, range, randomAxis);

        if(shipPlaced === true) isPlaced = true;
       
      }
    });

  }




  // remove  possibleAttacks, generatePossibleAttacks, getPlayerOneGameBoardInstance, getRandomCoordInRange, getGameBoardInstance
  return {
    getBoard,
    getPossibleAttacks,
    randomAttack,
    setPlayerOneGameBoardInstance,
    getPlayerOneGameBoardInstance,
    placeComputerShips,
    getRandomCoordInRange,
    getGameBoardInstance
  }
}

export default computerPlayer;