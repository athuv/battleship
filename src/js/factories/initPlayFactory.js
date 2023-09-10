import { getShipFactoryInstance, getPlayerOneGameBoardInstance, getPlayerTwoGameBoardInstance, getComputerPlayerFactoryInstance, getPlayerFactoryInstance } from '../utils/instanceRegistry.js';
import generateGridCells from '../components/generate-grid-cells.js';
import * as domManager from '../utils/domUtils.js';
import { ERROR_MESSAGES, CELL_STATES, MESSAGE_TYPE } from '../utils/config.js';

const playerOneGameBoard = getPlayerOneGameBoardInstance();
const playerTwoGameBoard = getPlayerTwoGameBoardInstance();
const PlayerTwoUtils = getComputerPlayerFactoryInstance();
const playerNameInstance = getPlayerFactoryInstance();

let currentPlayer = 1;

function switchPlayer() {
  currentPlayer = (currentPlayer === 1) ? 2 : 1;
}

function generatePlayerOneGrid(cellClass, lastHit) {
  const playerOneGridConatiner = document.querySelector('.middle-left__grid-container');
  playerOneGridConatiner.innerHTML = '';
  const cells = generateGridCells().playerOneCells(cellClass, lastHit);
  domManager.appendChildElements(playerOneGridConatiner, ...cells);  
}

function generatePlayerTwoGrid(className, isHighligtShips, lastHit) {
  const playerTwoGridContainer = document.querySelector('.middle-right__grid-container');
  playerTwoGridContainer.innerHTML = '';
  const cells = generateGridCells().playerTwoCells(className, isHighligtShips, lastHit);  
  domManager.appendChildElements(playerTwoGridContainer, ...cells);
}

function messages(message, type) {
  const spanMessagebox = document.querySelector('.section-bottom__message-box');
  spanMessagebox.innerHTML = "";
  
  if(type === 'text') spanMessagebox.innerText = message;
  if(type === 'html') spanMessagebox.innerHTML = message;
}

function determineWinner() {
  let isGameOver = false;

  if(playerOneGameBoard.isGameOver() === true) {
    isGameOver = true;
    return {
      isGameOver,
      player: 2
    }
  }

  if(playerTwoGameBoard.isGameOver() === true) {
    isGameOver = true;
    return {
      isGameOver,
      player: 1
    }
  }
  return {isGameOver};
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

    generatePlayerTwoGrid('grid-container__grid-right-cell', false, [parseInt(rowIndex), parseInt(colIndex)]);

    if(results === CELL_STATES.HIT || results === CELL_STATES.MISS) switchPlayer();
    
    play();
    if(results === ERROR_MESSAGES.ALREADY_HIT) messages(ERROR_MESSAGES.ALREADY_HIT, MESSAGE_TYPE.TEXT);
  }
}

function play() {
  const isWinner = determineWinner();
  if(isWinner.isGameOver){
    const playerName = (isWinner.player === 1) ? playerNameInstance.getPlayerOne().name : 'Computer';
    const message = `<span>${playerName} Won!</span><button class="message-box__btn-try-again">Play Again</button>`;
    messages(message, MESSAGE_TYPE.HTML);

    const btnTryAgain = document.querySelector('.message-box__btn-try-again');
    btnTryAgain.addEventListener('click', () => {
      window.location.reload();
    })
    return null
  }


  if (currentPlayer === 1) {
    messages(`<span>${playerNameInstance.getPlayerOne().name}'s Turn.</span><span><span class="message-box__orange">Orange</span> = Missed, <span class="message-box__red">Red</span> = Hit, <span class="message-box__green">Green</span> = Last attacked cell</span>`, MESSAGE_TYPE.HTML);
    const playerTwoGridContainer = document.querySelector('.middle-right__grid-container');
    playerTwoGridContainer.classList.remove('middle-right__grid-container--disabled');
    playerTwoGridContainer.addEventListener('click', playerOnePlay);
  }
  
  if (currentPlayer === 2) {
    messages(`${playerNameInstance.getPlayerOne().name} Attacked, Now Computers's Turn.`, MESSAGE_TYPE.TEXT);
    const res = PlayerTwoUtils.attack();

    setTimeout(() => {            
      generatePlayerOneGrid('grid-container__grid-left-cell', res.previousHit);

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
