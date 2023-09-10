import * as domManager from '../utils/domUtils.js';
import { ERROR_MESSAGES, SHIP, CELL_STATES } from '../utils/config.js';
import { getPlayerOneGameBoardInstance, getPlayerTwoGameBoardInstance } from '../utils/instanceRegistry.js';

const playerOneGameBoardInstance = getPlayerOneGameBoardInstance();
const playerTwoGameBoardInstance = getPlayerTwoGameBoardInstance();

function generateGridCells() {

  function playerTwoCells(className, isHighligtShips, lastHit) {
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

        if(cell === CELL_STATES.MISS) domManager.setClass(divCell, 'neon-miss');
        if(cell === CELL_STATES.HIT) domManager.setClass(divCell, 'neon-hit');

        if(lastHit && (rowIndex === lastHit[0]) && (colIndex === lastHit[1])) {
          if(cell === CELL_STATES.MISS) domManager.setClass(divCell, 'cell__last-attack--miss');
          if(cell === CELL_STATES.HIT) domManager.setClass(divCell, 'cell__last-attack--hit');
        }
        cells.push(divCell);
      });
    });
  
    return cells;
  }

  function playerOneCells(className, lastHit) {
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
        if(cell === CELL_STATES.MISS) domManager.setClass(divCell, 'neon-miss');
        if(cell === CELL_STATES.HIT) domManager.setClass(divCell, 'neon-hit');

        if(lastHit && (rowIndex === lastHit[0]) && (colIndex === lastHit[1])) {
          if(cell === CELL_STATES.MISS) domManager.setClass(divCell, 'cell__last-attack--miss');
          if(cell === CELL_STATES.HIT) domManager.setClass(divCell, 'cell__last-attack--hit');
        }
        
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