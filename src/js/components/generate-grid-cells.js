import * as domManager from '../utils/domUtils.js';
import { ERROR_MESSAGES, SHIP } from '../utils/config.js';
import { getPlayerOneGameBoardInstance, getPlayerTwoGameBoardInstance } from '../utils/instanceRegistry.js';

const playerOneGameBoardInstance = getPlayerOneGameBoardInstance();
const playerTwoGameBoardInstance = getPlayerTwoGameBoardInstance();

function generateGridCells(className) {
  const playerOneBoard = playerOneGameBoardInstance.getBoard();
  const cells = [];

  playerOneBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const divCell = domManager.createDivElement(
        [className],
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

export default generateGridCells;