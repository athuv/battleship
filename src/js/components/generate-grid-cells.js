import * as domManager from '../utils/domUtils.js';
import { ERROR_MESSAGES, SHIP } from '../utils/config.js';
import { getPlayerOneGameBoardInstance, getPlayerTwoGameBoardInstance } from '../utils/instanceRegistry.js';

const playerOneGameBoardInstance = getPlayerOneGameBoardInstance();
const playerTwoGameBoardInstance = getPlayerTwoGameBoardInstance();
window.p2c = playerTwoGameBoardInstance;
function generateGridCells() {

  function playerTwoCells(className, isHighligtShips) {
    const playerTwoBoard = playerTwoGameBoardInstance.getBoard();
    const cells = [];
  
    playerTwoBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const divCell = domManager.createDivElement(
          [`${className}`, `${rowIndex}-${colIndex}`],
          {},
          {
            'data-row': rowIndex,
            'data-column': colIndex
          }
        );

        if(isHighligtShips){
          if(cell === SHIP.CARRIER.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-cell--placed');
          if(cell === SHIP.BATTLESHIP.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-cell--placed');
          if(cell === SHIP.CRUISER.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-cell--placed');
          if(cell === SHIP.SUBMARINE.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-cell--placed');
          if(cell === SHIP.PATROLBOAT.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-cell--placed');
        }

        cells.push(divCell);
      });
    });
  
    return cells;
  }

  function playerOneCells(className) {
    const playerOneBoard = playerOneGameBoardInstance.getBoard();
    const cells = [];
  
    playerOneBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const divCell = domManager.createDivElement(
          [`${className}`, `${rowIndex}-${colIndex}`],
          {},
          {
            'data-row': rowIndex,
            'data-column': colIndex
          }
        );
        if(cell === SHIP.CARRIER.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-cell--placed');
        if(cell === SHIP.BATTLESHIP.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-cell--placed');
        if(cell === SHIP.CRUISER.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-cell--placed');
        if(cell === SHIP.SUBMARINE.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-cell--placed');
        if(cell === SHIP.PATROLBOAT.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-cell--placed');
        cells.push(divCell);
      });
    });
  
    return cells;
  }

  return {
    playerOneCells,
    playerTwoCells
  }
}


export default generateGridCells;