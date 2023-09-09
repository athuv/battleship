import player from "../src/js/factories/playerFactory.js";

describe('creating players', () => {
  const playerInstance = player();
  const playerOne = playerInstance;
  const playerTwo = playerInstance;


  test('Create player One', () => {
    playerOne.createPlayer('Ahamed');
    expect(playerOne.getPlayerName()).toBe('Ahamed');
  });
});