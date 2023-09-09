import { getPlayerOneGameBoardInstance, getComputerPlayerFactoryInstance, getPlayerFactoryInstance } from '../utils/instanceRegistry.js';

const playerOneGameBoard = getPlayerOneGameBoardInstance();
const playerComputerGameBoard = getComputerPlayerFactoryInstance();
const playerTwoInstance = playerComputerGameBoard.getGameBoardInstance();
const playerNameInstance = getPlayerFactoryInstance();

window.q = playerTwoInstance;

function initPlay() {
  playerComputerGameBoard.placeComputerShips();
  let isCanStartGame = false;

 if((playerNameInstance.getPlayerOne().name) && (playerTwoInstance.areShipsPlaced()) && playerOneGameBoard.areShipsPlaced()){
  isCanStartGame = true;
  return true;
 }
}

export default initPlay;