import player from "../src/js/playerFactory.js";

const playerOneName = 'John';
const playerTwoName = 'Kevin';

describe('creating players', () => {
  const playerInstance = player();
  const playerOne = playerInstance.createPlayer(playerOneName);
  const playerTwo = playerInstance.createPlayer(playerTwoName);
  test('Create player One', () => {
    expect(playerOne.name).toBe(playerOneName);
  });

  test('Create player Two', () => {
    expect(playerTwo.name).toBe(playerTwoName);
  });
});