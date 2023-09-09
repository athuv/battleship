import { getPlayerOneGameBoardInstance, getPlayerTwoGameBoardInstance, getComputerPlayerFactoryInstance, getPlayerFactoryInstance } from '../utils/instanceRegistry.js';
import generateGridCells from '../components/generate-grid-cells.js';
import * as domManager from '../utils/domUtils.js';
import { MESSAGES } from '../utils/config.js';

const playerOneGameBoard = getPlayerOneGameBoardInstance();
const playerTwoGameBoard = getPlayerTwoGameBoardInstance();
const PlayerTwoUtils = getComputerPlayerFactoryInstance();
const playerNameInstance = getPlayerFactoryInstance();

let currentPlayer = 1;

function switchPlayer() {
  currentPlayer = (currentPlayer === 1) ? 2 : 1;
}

function playerOnePlay(event) {
  const target = event.target;
  if (target.classList.contains('grid-container__grid-right-cell')) {
    const rowIndex = target.getAttribute('data-row');
    const colIndex = target.getAttribute('data-column');

    const results = playerTwoGameBoard.receiveAttack(parseInt(rowIndex), parseInt(colIndex));

    const playerTwoGridContainer = document.querySelector('.middle-right__grid-container');
    playerTwoGridContainer.removeEventListener('click', playerOnePlay);

    playerTwoGridContainer.innerHTML = '';
    const cells = generateGridCells().playerTwoCells('grid-container__grid-right-cell', false);
    domManager.appendChildElements(
      playerTwoGridContainer,
      ...cells
    );

    switchPlayer();
    play();
  }
}

function play() {
  if(playerOneGameBoard.isGameOver() === true) return `Computer - ${MESSAGES.WIN}`;
  if(playerTwoGameBoard.isGameOver() === true) return `${playerNameInstance.getPlayerOne().name} - ${MESSAGES.WIN}`;

  if (currentPlayer === 1) {
    const playerTwoGridContainer = document.querySelector('.middle-right__grid-container');
    playerTwoGridContainer.addEventListener('click', playerOnePlay);
  }
  
  if (currentPlayer === 2) {
    const res = PlayerTwoUtils.attack();

    setTimeout(() => {
      const playerOneGridConatiner = document.querySelector('.middle-left__grid-container');
      playerOneGridConatiner.innerHTML = '';
      const cells = generateGridCells().playerOneCells('grid-container__grid-left-cell');
      domManager.appendChildElements(
        playerOneGridConatiner,
        ...cells
      );

      switchPlayer();
      play();
    }, 2000);
  }
}

function initPlay() {
  PlayerTwoUtils.placeComputerShips();
  let isCanStartGame = false;

  if (playerNameInstance.getPlayerOne().name && playerOneGameBoard.areShipsPlaced() && playerTwoGameBoard.areShipsPlaced()) {
    isCanStartGame = true;
    play();
  }

  return isCanStartGame;
}

export default initPlay;
