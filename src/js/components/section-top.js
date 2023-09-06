import * as domManager from '../utils/domUtils.js';

function createPlayerOne() {
  const playerOneP = domManager.createParagraphElement(['player-one']);
  const playerOneSpan = domManager.createSpanElement(
    ['player-one__name'],
    {innerText: 'You'}    
  );

  domManager.appendChildElements(playerOneP, playerOneSpan);
  return playerOneP;
}

function createHeadingP() {
  const headingP = domManager.createParagraphElement(
    ['top-heading'],
    {innerText: 'Battleship'}
  );

  return headingP;
}

function createPlayerTwo() {
  const playerTwoP = domManager.createParagraphElement(['player-two']);
  const playerTwoSpan = domManager.createSpanElement(
    ['player-two__name'],
    {innerText: 'Computer'}    
  );

  domManager.appendChildElements(playerTwoP, playerTwoSpan);
  return playerTwoP;
}

function createTopSection() {
  const sectionTop = domManager.createSectionElement(
    ['section-top']
  );

  domManager.appendChildElements(sectionTop, createPlayerOne(), createHeadingP(), createPlayerTwo());
  return sectionTop;
}

export default createTopSection;