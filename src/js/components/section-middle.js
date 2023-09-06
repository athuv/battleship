import * as domManager from '../utils/domUtils.js';
import { getPlayerOneGameBoardInstance, getPlayerTwoGameBoardInstance } from '../utils/instanceRegistry.js';

const playerOneGameBoardInstance = getPlayerOneGameBoardInstance();
const playerTwoGameBoardInstance = getPlayerTwoGameBoardInstance();

function createPlayerOncGrid() {
  const playerOneBoard = playerOneGameBoardInstance.getBoard();

  const leftAside = domManager.createAsideElement(
    ['middle-left']
  );

  const div = domManager.createDivElement(
    ['middle-left__grid-container']
  );

  playerOneBoard.forEach((row, rowIndex) => {
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
        ['grid-container__grid-left-cell'],
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

function handlePlayerOncCellClick(event) {
  const target = event.target;

  if(target.classList.contains('grid-container__grid-right-cell')){
    const rowIndex = target.getAttribute('data-row');
    const colIndex = target.getAttribute('data-column');
    
    console.log(`Cell clicked: Row ${rowIndex}, Column ${colIndex}`);
  }else{
    console.log('here');
  }
}

function middleSectionEventListeners() {
  const playerOneCells =  document.querySelector('.middle-left__grid-container');
  playerOneCells.addEventListener('click', handlePlayerOncCellClick);
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