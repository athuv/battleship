import * as domManager from '../utils/domUtils.js';
import { ERROR_MESSAGES, SHIP } from '../utils/config.js';
import { getPlayerOneGameBoardInstance, getPlayerTwoGameBoardInstance } from '../utils/instanceRegistry.js';
import generateGridCells from './generate-grid-cells.js';

const playerOneGameBoardInstance = getPlayerOneGameBoardInstance();
const playerTwoGameBoardInstance = getPlayerTwoGameBoardInstance();
window.p1 = playerOneGameBoardInstance;
window.p2 = playerTwoGameBoardInstance;

function createPlayerOncGrid() {
  const leftAside = domManager.createAsideElement(['middle-left']);

  const div = domManager.createDivElement(['middle-left__grid-container']);

  const cells = generateGridCells().playerOneCells('grid-container__grid-left-cell');

  domManager.appendChildElements(div, ...cells);

  domManager.appendChildElements(leftAside, div);

  return leftAside;
}

function createPlayerTwoGrid() {

  const rightAside = domManager.createAsideElement(['middle-right']);

  const div = domManager.createDivElement(['middle-right__grid-container']);

  const cells = generateGridCells().playerTwoCells('grid-container__grid-right-cell', false);

  domManager.appendChildElements(div, ...cells);
  domManager.appendChildElements(rightAside, div);

  return rightAside;
}

function createMiddleSection() {
  const middleSection = domManager.createSectionElement(['section-middle']);

  domManager.appendChildElements(
    middleSection,
    createPlayerOncGrid(),
    createPlayerTwoGrid()
  );

  return middleSection;
}

export {
  createMiddleSection
};