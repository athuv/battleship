import { getPlayerOneGameBoardInstance, getComputerPlayerFactoryInstance, getPlayerFactoryInstance } from '../utils/instanceRegistry.js';

const playerOneGameBoard = getPlayerOneGameBoardInstance();
const playerComputerGameBoard = getComputerPlayerFactoryInstance();
const playerTwoInstance = playerComputerGameBoard.getGameBoardInstance();
const playerNameInstance = getPlayerFactoryInstance();

const currentPlayer = 1;
window.q = playerTwoInstance;

function switchPlayer() {
  currentPlayer = (currentPlayer === 1) ? 2 : 1;
}

function play() {
  if(currentPlayer === 1){
    console.log(playerNameInstance.getPlayerOne().name);
  }
}

function initPlay() {
  playerComputerGameBoard.placeComputerShips();
  let isCanStartGame = false;

 if((playerNameInstance.getPlayerOne().name) && (playerTwoInstance.areShipsPlaced()) && playerOneGameBoard.areShipsPlaced()){
  isCanStartGame = true;
  play();
  return true;
 }

}

export default initPlay;