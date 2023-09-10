import { getPlayerOneGameBoardInstance, getPlayerTwoGameBoardInstance, getComputerPlayerFactoryInstance, getPlayerFactoryInstance } from '../utils/instanceRegistry.js';
import generateGridCells from '../components/generate-grid-cells.js';
import * as domManager from '../utils/domUtils.js';
import { MESSAGES, CELL_STATES, MESSAGE_TYPE } from '../utils/config.js';

const playerOneGameBoard = getPlayerOneGameBoardInstance();
const playerTwoGameBoard = getPlayerTwoGameBoardInstance();
const PlayerTwoUtils = getComputerPlayerFactoryInstance();
const playerNameInstance = getPlayerFactoryInstance();

let currentPlayer = 1;

function switchPlayer() {
  currentPlayer = (currentPlayer === 1) ? 2 : 1;
}

function messages(message, type) {
  const spanMessagebox = document.querySelector('.section-bottom__message-box');
  spanMessagebox.innerHTML = "";
  
  if(type === 'text') spanMessagebox.innerText = message;
  if(type === 'html') spanMessagebox.innerHTML = message;
}

function playerOnePlay(event) {
  const target = event.target;
  if (target.classList.contains('grid-container__grid-right-cell')) {

    const rowIndex = target.getAttribute('data-row');
    const colIndex = target.getAttribute('data-column');

    const results = playerTwoGameBoard.receiveAttack(parseInt(rowIndex), parseInt(colIndex));

    const playerTwoGridContainer = document.querySelector('.middle-right__grid-container');
    playerTwoGridContainer.removeEventListener('click', playerOnePlay);
    playerTwoGridContainer.classList.add('middle-right__grid-container--disabled');

    playerTwoGridContainer.innerHTML = '';
    const cells = generateGridCells().playerTwoCells('grid-container__grid-right-cell', false, [parseInt(rowIndex), parseInt(colIndex)]);
    
    domManager.appendChildElements(
      playerTwoGridContainer,
      ...cells
    );

  //  if(results === CELL_STATES.HIT) target.classList.add('cell__last-attack--hit');
  //  if(results === CELL_STATES.MISS) target.classList.add('cell__last-attack--miss');
    switchPlayer();
    play();
  }
}

function play() {
  if(playerOneGameBoard.isGameOver() === true) return `Computer - ${MESSAGES.WIN}`;
  if(playerTwoGameBoard.isGameOver() === true) return `${playerNameInstance.getPlayerOne().name} - ${MESSAGES.WIN}`;

  if (currentPlayer === 1) {
    messages(`<span>${playerNameInstance.getPlayerOne().name}'s Turn.</span><span><span class="message-box__orange">Orange</span> = Missed, <span class="message-box__red">Red</span> = Hit, <span class="message-box__green">Green</span> = Last attacked cell</span>`, MESSAGE_TYPE.HTML);
    const playerTwoGridContainer = document.querySelector('.middle-right__grid-container');
    playerTwoGridContainer.classList.remove('middle-right__grid-container--disabled');
    playerTwoGridContainer.addEventListener('click', playerOnePlay);
  }
  
  if (currentPlayer === 2) {
    messages(`${playerNameInstance.getPlayerOne().name} Attacked, Now Computers's Turn.`, MESSAGE_TYPE.TEXT);
    const res = PlayerTwoUtils.attack();
    console.log(res.previousHit);
    setTimeout(() => {            
      const playerOneGridConatiner = document.querySelector('.middle-left__grid-container');
      playerOneGridConatiner.innerHTML = '';
      const cells = generateGridCells().playerOneCells('grid-container__grid-left-cell', res.previousHit);
      domManager.appendChildElements(
        playerOneGridConatiner,
        ...cells
      );

      switchPlayer();
      play();
    }, 1000);
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
