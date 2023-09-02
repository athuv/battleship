import gameBoard from "./gameBoardFactory.js";
import { CELL_STATES, MESSAGES, SHIPS, AXIS, SHIP_RANGE } from "./config.js";

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
    const ships = [SHIPS.CARRIER_SHIP, SHIPS.BATTLE_SHIP, SHIPS.CRUISER_SHIP, SHIPS.SUBMARINE_SHIP, SHIPS.PATROL_BOAT_SHIP];

    ships.forEach((ship) => {
      let isPlaced = false;
      let range = [];

      while(!isPlaced) {
        const randomAxis = Math.random() < 0.5 ? AXIS.X : AXIS.Y;

        const gameBoardInstance = getGameBoardInstance();
        if(ship === SHIPS.CARRIER_SHIP) range = getRandomCoordInRange(SHIP_RANGE.CARRIER.MIN_RANGE, SHIP_RANGE.CARRIER.MAX_RANGE);
        if(ship === SHIPS.BATTLE_SHIP) range = getRandomCoordInRange(SHIP_RANGE.BATTLESHIP.MIN_RANGE, SHIP_RANGE.BATTLESHIP.MAX_RANGE);
        if(ship === SHIPS.CRUISER_SHIP) range = getRandomCoordInRange(SHIP_RANGE.CRUISER_SUBMARINE.MIN_RANGE, SHIP_RANGE.CRUISER_SUBMARINE.MAX_RANGE);
        if(ship === SHIPS.SUBMARINE_SHIP) range = getRandomCoordInRange(SHIP_RANGE.CRUISER_SUBMARINE.MIN_RANGE, SHIP_RANGE.CRUISER_SUBMARINE.MAX_RANGE);
        if(ship === SHIPS.PATROL_BOAT_SHIP) range = getRandomCoordInRange(SHIP_RANGE.PATROL_BOAT.MIN_RANGE, SHIP_RANGE.PATROL_BOAT.MAX_RANGE);
        
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