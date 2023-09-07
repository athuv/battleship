import * as domManager from '../utils/domUtils.js';
import { ERROR_MESSAGES, SHIP } from '../utils/config.js';
import { getPlayerOneGameBoardInstance, getPlayerTwoGameBoardInstance } from '../utils/instanceRegistry.js';

const playerOneGameBoardInstance = getPlayerOneGameBoardInstance();
const playerTwoGameBoardInstance = getPlayerTwoGameBoardInstance();
window.a = playerOneGameBoardInstance;

function generatePlayerOnceGridCells() {
  const playerOneBoard = playerOneGameBoardInstance.getBoard();
  const cells = [];

  playerOneBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const divCell = domManager.createDivElement(
        ['grid-container__grid-left-cell'],
        {},
        {
          'data-row': rowIndex,
          'data-column': colIndex
        }
      );
      if(cell === SHIP.CARRIER.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-left-cell--placed');
      if(cell === SHIP.BATTLESHIP.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-left-cell--placed');
      if(cell === SHIP.CRUISER.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-left-cell--placed');
      if(cell === SHIP.SUBMARINE.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-left-cell--placed');
      if(cell === SHIP.PATROLBOAT.ABBREVIATION) domManager.setClass(divCell, 'grid-container__grid-left-cell--placed');
      cells.push(divCell);
    });
  });

  return cells;
}

function createPlayerOncGrid() {
  const leftAside = domManager.createAsideElement(
    ['middle-left']
  );

  const div = domManager.createDivElement(
    ['middle-left__grid-container']
  );

  const cells = generatePlayerOnceGridCells();

  domManager.appendChildElements(
    div,
    ...cells
  );

  domManager.appendChildElements(
    leftAside,
    div
  );

  return leftAside;
}

function createPlayerTwoGrid() {
  const playerTwoBoard = playerTwoGameBoardInstance.getBoard();

  const rightAside = domManager.createAsideElement(
    ['middle-right']
  );

  const div = domManager.createDivElement(
    ['middle-right__grid-container']
  );

  playerTwoBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const divCell = domManager.createDivElement(
        ['grid-container__grid-right-cell'],
        {},
        {
          'data-row': rowIndex,
          'data-column': colIndex
        }
      );

      domManager.appendChildElements(
        div,
        divCell
      );
    });
  });

  domManager.appendChildElements(
    rightAside,
    div
  );

  return rightAside;
}

function handlePlayerOneShipPlacementCheck(event) {
  const target = event.target;
  console.log('attached');
  if(target.classList.contains('grid-container__grid-left-cell')) {
    const rowIndex = target.getAttribute('data-row');
    const colIndex = target.getAttribute('data-column');
    let shipType;

    if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.CARRIER.NAME)) {
      shipType = SHIP.CARRIER.NAME;
    }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.BATTLESHIP.NAME)) {
      shipType = SHIP.BATTLESHIP.NAME;
    }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.CRUISER.NAME)) {
      shipType = SHIP.CRUISER.NAME;
    }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.SUBMARINE.NAME)) {
      shipType = SHIP.SUBMARINE.NAME;
    }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.PATROLBOAT.NAME)) {
      shipType = SHIP.PATROLBOAT.NAME;
    }else if(playerOneGameBoardInstance.areShipsPlaced()) {
      const playerOneCells =  document.querySelector('.middle-left__grid-container');
      playerOneCells.removeEventListener('mouseover', handlePlayerOneShipPlacementCheck);
      playerOneCells.removeEventListener('click', handlePlayerOncCellClick);
    }

    const results = playerOneGameBoardInstance.canPlaceShip(shipType, [parseInt(rowIndex), parseInt(colIndex)], 'x');    
    if(!results) target.style.cursor = 'not-allowed';
    
  }
}

function handlePlayerOncCellClick(event) {
  const target = event.target;

  if(target.classList.contains('grid-container__grid-left-cell')){
    const rowIndex = target.getAttribute('data-row');
    const colIndex = target.getAttribute('data-column');
    let shipType;

    if(!playerOneGameBoardInstance.areShipsPlaced()) {
      if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.CARRIER.NAME)) {
        shipType = SHIP.CARRIER.NAME;
      }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.BATTLESHIP.NAME)) {
        shipType = SHIP.BATTLESHIP.NAME;
      }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.CRUISER.NAME)) {
        shipType = SHIP.CRUISER.NAME;
      }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.SUBMARINE.NAME)) {
        shipType = SHIP.SUBMARINE.NAME;
      }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.PATROLBOAT.NAME)) {
        shipType = SHIP.PATROLBOAT.NAME;
      }

      const results = playerOneGameBoardInstance.placeShip(shipType, [parseInt(rowIndex), parseInt(colIndex)], 'x');

      if(results === ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED) ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED;
      if(results === true) {
        const leftGridContainer = document.querySelector('.middle-left__grid-container');
        leftGridContainer.innerHTML = '';
        const cells = generatePlayerOnceGridCells();
        domManager.appendChildElements(
          leftGridContainer,
          ...cells
        );
      }
    }else {
      console.log('everything placed');
    }
  }
}

function middleSectionEventListeners() {
  const playerOneCells =  document.querySelector('.middle-left__grid-container');
  playerOneCells.addEventListener('click', handlePlayerOncCellClick);
  playerOneCells.addEventListener('mouseover', handlePlayerOneShipPlacementCheck);
}

function createMiddleSection() {
  const middleSection = domManager.createSectionElement(
    ['section-middle']
  );

  domManager.appendChildElements(
    middleSection,
    createPlayerOncGrid(),
    createPlayerTwoGrid()
  );

  return middleSection;
}

export {
  createMiddleSection,
  middleSectionEventListeners
};