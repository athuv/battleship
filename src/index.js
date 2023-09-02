import './css/styles.css';
import gameBoard from './js/gameBoardFactory.js';
import player from './js/playerFactory.js';
import computerPlayer from './js/computerPlayerFactory.js';
            
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
