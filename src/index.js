import './css/styles.css';
import gameBoard from './js/factories/gameBoardFactory.js';
import player from './js/factories/playerFactory.js';
import computerPlayer from './js/factories/computerPlayerFactory.js';
            
function component() {
  const gameBoardInstance = gameBoard();
  const playerInstance = player();
  const computerPlayerInstance = computerPlayer();

  const playerOne = playerInstance.createPlayer('John');
  const playerTwo = playerInstance.createPlayer('Kevin');

  const gameBoardPlayerOne = gameBoardInstance;
  const gameBoardPlayerTwo = computerPlayerInstance;
  
  computerPlayerInstance.setPlayerOneGameBoardInstance(gameBoardPlayerOne);

  window.p1gb = gameBoardPlayerOne;
  window.p2gb = gameBoardPlayerTwo;

  const element = document.createElement('div');
  return element;
}
            
document.body.appendChild(component());
