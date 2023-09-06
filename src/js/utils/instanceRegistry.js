import gameBoard from "../factories/gameBoardFactory";
import computerPlayer from "../factories/computerPlayerFactory.js";
import player from "../factories/playerFactory.js";
import shipFactory from "../factories/shipFactory.js";

const gameBoardFactoryInstance = gameBoard();
const computerPlayerFactoryInstance = computerPlayer();
const playerFactoryInstance = player();
const shipFactoryInstance = shipFactory();

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
  return shipFactoryInstance;
}

export {
  getGameBoardFactoryInstance,
  getComputerPlayerFactoryInstance,
  getPlayerFactoryInstance,
  getShipFactoryInstance
}