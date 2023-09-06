import gameBoard from "./gameBoardFactory.js";
import { CELL_STATES, MESSAGES, SHIP, AXIS, DIRECTIONS } from "../utils/config.js";

function computerPlayer() {

  let gameBoardInstance;
  let playerOneGameBoardInstance;
  const possibleAttacks = [];
  const possibelHitsQueue = [];
  let previousHit;
  let direction;
  let firstHit = [];
  
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
          if(cell !== CELL_STATES.MISS && cell !== CELL_STATES.HIT) possibleAttacks.push([rowIndex, colIndex]);
        });
      });
    }
    return possibleAttacks;
  }
  
  function removePossibleAttackByIndex(index) {
    possibleAttacks.splice(index, 1);
  }

  function removePossibleAttackByValue(coordValue) {
    const index = possibleAttacks.findIndex(item => JSON.stringify(item) === JSON.stringify(coordValue));
    removePossibleAttackByIndex(index);
  }

  function getCellValue(row, col) {
    const board = getPlayerOneGameBoardInstance().getBoard();
    if(row >= 0 && row <= 9 && col >= 0 && col <= 9){
      return board[row][col];
    }
    return undefined;
  }

  function randomAttack() {
    if(getPossibleAttacks().length > 0) {
      const randomIndex = Math.floor(Math.random() * getPossibleAttacks().length);
      const randomPossibleAttack = getPossibleAttacks()[randomIndex];
      // const randomPossibleAttack = [6, 8];
      const randomAttackResult = getPlayerOneGameBoardInstance().receiveAttack(randomPossibleAttack[0], randomPossibleAttack[1]);
      removePossibleAttackByIndex(randomIndex);
      return {randomAttackResult, randomPossibleAttack};
    }
    return false;
  }

  function isHitDirection(currentCell, lastHitCell) {
    const [currentRow, currentCol] = currentCell;
    const [lastHitRow, lastHitCol] = lastHitCell;

    if(currentRow === lastHitRow) {
      // Same row so, either left or right
      if(currentCol > lastHitCol) return DIRECTIONS.RIGHT;
      if(currentCol < lastHitCol) return DIRECTIONS.LEFT;
    }else if(currentCol === lastHitCol) {
      // same column so, either above or below
      if(currentRow > lastHitRow) return DIRECTIONS.BELOW;
      if(currentRow < lastHitRow) return DIRECTIONS.ABOVE;
    }
    return false;
  }

  function hitDirection() {
    if(!direction) return false;

    const directions = {
      [DIRECTIONS.RIGHT]: [0, 1],
      [DIRECTIONS.LEFT]: [0, -1],
      [DIRECTIONS.ABOVE]: [-1, 0],
      [DIRECTIONS.BELOW]: [1, 0]
    }

     if(!directions.hasOwnProperty(direction)) return false;

    const [rowOffset, colOffset] = directions[direction];
    const attackArray = [previousHit[0] + rowOffset, previousHit[1] + colOffset];

    if (attackArray[0] < 0 || attackArray[0] > 9 || attackArray[1] < 0 || attackArray[1] > 9) {
      direction = undefined;
      return false;
    }

    const result = getPlayerOneGameBoardInstance().receiveAttack(attackArray[0], attackArray[1]);
    removePossibleAttackByValue(attackArray);
    previousHit = attackArray;
  
    if(result === CELL_STATES.MISS) direction = undefined;
    // if (result === CELL_STATES.MISS || attackArray.includes(0) || attackArray.includes(9)) {
    //   direction = undefined;
    // }
  
    return result;
  }

  function pushToPossibleHitQueue(row, col) {
    const cellValue = getCellValue(row, col);
    if(cellValue !== undefined && cellValue !== CELL_STATES.HIT && cellValue !== CELL_STATES.MISS){
      possibelHitsQueue.push([row, col]);
      return true;
    }
    return false;
  }

  function generatePossibelHitQueue(attackResult, randomPossibleAttack) { 
      previousHit = randomPossibleAttack;
      firstHit = randomPossibleAttack;
      if(attackResult === CELL_STATES.HIT) {
        const [row, col] = randomPossibleAttack;
        
        //Above
        pushToPossibleHitQueue(row - 1, col);
        //below
        pushToPossibleHitQueue(row + 1, col);
        // right
        pushToPossibleHitQueue(row, col + 1);
        // left
        pushToPossibleHitQueue(row, col -1);

        return {info:attackResult, previousHit, possibelHitsQueue};
      }      
      return {info:attackResult, previousHit, possibelHitsQueue};
  }

  function attack() {
    const directionResult = hitDirection();
    if (directionResult !== false) return directionResult;

    if(possibelHitsQueue.length === 0) {
      const {randomAttackResult, randomPossibleAttack} = randomAttack();
      return generatePossibelHitQueue(randomAttackResult, randomPossibleAttack);
    }   

    const possibleHit = possibelHitsQueue.shift();
    let attackResult = getPlayerOneGameBoardInstance().receiveAttack(possibleHit[0], possibleHit[1]);
    removePossibleAttackByValue(possibleHit);

    console.log(`attack result - ${attackResult}`);
    console.log(`direction - ${direction}`);
    if(!direction){
      if(attackResult === CELL_STATES.HIT) direction = isHitDirection(possibleHit, firstHit);
      console.log(`dir def - ${direction}`);
    }
    previousHit = possibleHit;

    return {info: 'next', possibelHitsQueue, previousHit, possibleHit, attackResult};
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
  // isHitDirection, pushToPossibleHitQueue, possibelHitsQueue
  return {
    getBoard,
    getPossibleAttacks,
    randomAttack,
    setPlayerOneGameBoardInstance,
    getPlayerOneGameBoardInstance,
    placeComputerShips,
    getRandomCoordInRange,
    getGameBoardInstance,
    possibleAttacks,
    attack,
    isHitDirection,
    pushToPossibleHitQueue, 
    possibelHitsQueue
  }
}

export default computerPlayer;