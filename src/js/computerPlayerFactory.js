import gameBoard from "./gameBoardFactory.js";
import { CELL_STATES, MESSAGES, SHIP, AXIS } from "./config.js";

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
  
  function removePossibleAttack(index) {
    possibleAttacks.splice(index, 1);
  }

  function randomAttack() {
    if(getPossibleAttacks().length > 0) {
      const randomIndex = Math.floor(Math.random() * getPossibleAttacks().length);
      const randomPossibleAttack = getPossibleAttacks()[randomIndex];
      // const randomPossibleAttack = [2, 9];
      const attackResult = getPlayerOneGameBoardInstance().receiveAttack(randomPossibleAttack[0], randomPossibleAttack[1]);
      removePossibleAttack(randomIndex);
      return {attackResult, randomPossibleAttack};
    }
    return false;
  }

  function isHitDirection(currentCell, lastHitCell) {
    const [currentRow, currentCol] = currentCell;
    const [lastHitRow, lastHitCol] = lastHitCell;

    if(currentRow === lastHitRow) {
      // Same row so, either left or right
      if(currentCol > lastHitCol) return 'right';
      if(currentCol < lastHitCol) return 'left';
    }else if(currentCol === lastHitCol) {
      // same column so, either above or below
      if(currentRow > lastHitRow) return 'below';
      if(currentRow < lastHitRow) return 'above';
    }
    return false;
  }

  function hitDirection() {
    if(direction){
      let attackArray = [];

      if(direction === 'right') attackArray = [previousHit[0], previousHit[1] + 1];
      if(direction === 'left') attackArray = [previousHit[0], previousHit[1] - 1];
      if(direction === 'above') attackArray = [previousHit[0] - 1, previousHit[1]];
      if(direction === 'below') attackArray = [previousHit[0] + 1, previousHit[1]];

      if(attackArray[0] > 9 || attackArray[0] < 0) return false;
      if(attackArray[1] > 9 || attackArray[1] < 0) return false;

      const result = getPlayerOneGameBoardInstance().receiveAttack(attackArray[0], attackArray[1]);
      previousHit = attackArray;

      if(result === CELL_STATES.MISS) direction = undefined;
      if((attackArray[0] === 0) || (attackArray[0] === 9) ) direction = undefined;
      if((attackArray[1] === 0) || (attackArray[1] === 9) ) direction = undefined;


      return result;
    }
    return false;
  }

  function attack() {
    //debugger;
    let above;
    let below;
    let left;
    let right;
    console.log(`prev hit ${previousHit}`);

    const directionResult = hitDirection();
    if (directionResult !== false) {
      return directionResult;
    }

    if(possibelHitsQueue.length === 0) {
      const {attackResult, randomPossibleAttack} = randomAttack();
      previousHit = randomPossibleAttack;
      firstHit = randomPossibleAttack;
      if(attackResult === CELL_STATES.HIT) {
        above = [randomPossibleAttack[0] - 1, randomPossibleAttack[1]];
        const abovCellValue = getPlayerOneGameBoardInstance().getBoard()[above[0]][above[1]];
        if(above[0] >= 0 && (abovCellValue !== CELL_STATES.HIT) && (abovCellValue !== CELL_STATES.MISS)) possibelHitsQueue.push(above);

        below = [randomPossibleAttack[0] + 1, randomPossibleAttack[1]];
        const belowCellValue = getPlayerOneGameBoardInstance().getBoard()[below[0]][below[1]];
        if(below[0] <= 9 && (belowCellValue !== CELL_STATES.HIT) && (belowCellValue !== CELL_STATES.MISS)) possibelHitsQueue.push(below);

        left = [randomPossibleAttack[0], randomPossibleAttack[1] - 1];
        const leftCellValue = getPlayerOneGameBoardInstance().getBoard()[left[0]][left[1]];
        if(left[1] >= 0 && (leftCellValue !== CELL_STATES.HIT) && (leftCellValue !== CELL_STATES.MISS)) possibelHitsQueue.push(left);

        right = [randomPossibleAttack[0], randomPossibleAttack[1] + 1];
        const rightCellValue = getPlayerOneGameBoardInstance().getBoard()[right[0]][right[1]];
        if(right[1] <= 9 && (rightCellValue !== CELL_STATES.HIT) && (rightCellValue !== CELL_STATES.MISS)) possibelHitsQueue.push(right);

        // possibelHitsQueue.push(above, below, left, right);
        return {info:'hit', previousHit, possibelHitsQueue};
      }      
      return {info:attackResult, previousHit, possibelHitsQueue};
    }
    const possibleHit = possibelHitsQueue.shift();
    let attackResult = getPlayerOneGameBoardInstance().receiveAttack(possibleHit[0], possibleHit[1]);
    

    console.log(`attack result - ${attackResult}`);
    console.log(`direction - ${direction}`);
    if(!direction){
      if(attackResult === CELL_STATES.HIT) direction = isHitDirection(possibleHit, firstHit);
      // if((possibleHit[0] === 0) || (possibleHit[0] === 9) ) direction = undefined;
      // if((possibleHit[1] === 0) || (possibleHit[1] === 9) ) direction = undefined;
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
  // isHitDirection
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
    isHitDirection
  }
}

export default computerPlayer;