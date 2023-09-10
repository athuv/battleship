import gameBoard from "../factories/gameBoardFactory.js";
import computerPlayer from "../factories/computerPlayerFactory.js";
import player from "../factories/playerFactory.js";
import shipFactory from "../factories/shipFactory.js";

const gameBoardFactoryInstance = gameBoard();
const computerPlayerFactoryInstance = computerPlayer();
const playerFactoryInstance = player();

const playerOneGameBoardInstance = gameBoard();
const playerTwoGameBoardInstance = gameBoard();



function getPlayerOneGameBoardInstance() {
  return playerOneGameBoardInstance;
}

function getPlayerTwoGameBoardInstance() {
  return playerTwoGameBoardInstance;
}

function getGameBoardFactoryInstance() {
  return gameBoardFactoryInstance;
}

function getComputerPlayerFactoryInstance() {
  return computerPlayerFactoryInstance;
}

function getPlayerFactoryInstance() {
  return playerFactoryInstance;
}

function getShipFactoryInstance() {
  return shipFactory();
}

export {
  // getGameBoardFactoryInstance,
  getComputerPlayerFactoryInstance,
  getPlayerFactoryInstance, 
  getPlayerOneGameBoardInstance,
  getPlayerTwoGameBoardInstance,
  getShipFactoryInstance
}