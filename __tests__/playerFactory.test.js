import player from "../src/js/factories/playerFactory.js";

describe('creating players', () => {
  const playerInstance = player();
  const playerOne = playerInstance;
  const playerTwo = playerInstance;


  test('Create player One', () => {
    playerOne.createPlayer('Ahamed', 1);
    expect(playerOne.getPlayerOne().name).toBe('Ahamed');
    expect(playerOne.getPlayerOne().position).toBe(1);
  });

  test('Create player Two', () => {
    playerOne.createPlayer('Ahamed2', 2);
    expect(playerTwo.getPlayerTwo().name).toBe('Ahamed2');
    expect(playerTwo.getPlayerTwo().position).toBe(2);
  });
});