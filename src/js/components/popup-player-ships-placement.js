import * as domManager from '../utils/domUtils.js';
import { ERROR_MESSAGES, SHIP, AXIS } from '../utils/config.js';
import generateGridCells from './generate-grid-cells.js';
import { getPlayerOneGameBoardInstance, getPlayerFactoryInstance } from '../utils/instanceRegistry.js';

const playerOneGameBoardInstance = getPlayerOneGameBoardInstance();
const playerOneInstnace = getPlayerFactoryInstance();
window.p = playerOneInstnace;

function createPopupBody() {
  const section = domManager.createSectionElement(['popup__body']);
  const asidePlayerName = domManager.createAsideElement(['popup__body__player-name']);

  const label = domManager.createlabelElement(
    [],
    {innerText: 'Your Name:'},
    {
      'for': 'textPlayerName'
    }
  )

  const textInput = domManager.createInputElement(
    ['player-name--textbox'],
    {},
    {
      'type': 'text',
      'id': 'textPlayerName',
      'name': 'playerName',
      'placeholder': 'Enter your name'
    }
  );

  domManager.appendChildElements(
    asidePlayerName,
    label,
    textInput
  );

  const asideGrid = domManager.createAsideElement();
  const divHeading = domManager.createDivElement(['popup__body__heading']);
  const spanHeading = domManager.createSpanElement([], {innerText: 'Place Your Ships'});
  const btnDiv = domManager.createDivElement(['body__heading__btn-xy-toggle']);
  
  const spanX = domManager.createSpanElement([], {innerText: AXIS.X.toLocaleUpperCase()});
  const spanY = domManager.createSpanElement([], {innerText: AXIS.Y.toLocaleUpperCase()});
  const labelToggle = domManager.createlabelElement(['btn-xy-toggle']);
  const input = domManager.createInputElement([], {}, {type:'checkbox', value: AXIS.X, id: 'toggle-switch'});
  const spanRound = domManager.createSpanElement(['slider', 'round']);

  domManager.appendChildElements(btnDiv, spanX, labelToggle, spanY);
  domManager.appendChildElements(labelToggle, input, spanRound);

  const divGridContainer = domManager.createDivElement(['popup__body__grid-container']);
  const cells = generateGridCells('popup__body__grid-cell');

  domManager.appendChildElements(divHeading, spanHeading, btnDiv)
  domManager.appendChildElements(divGridContainer, ...cells);
  domManager.appendChildElements(asideGrid, divHeading, divGridContainer);

  domManager.appendChildElements(
    section,
    asidePlayerName,
    asideGrid
  );

  return section;
}

function createPopupHeader() {
  const section = domManager.createSectionElement(
    ['popup__header']
  );

  const span = domManager.createSpanElement(
    ['popup__header__heading'],
    {innerText: 'Battleship'}
  );

  domManager.appendChildElements(
    section,
    span
  );

  return section;
}

function createPopupFooter() {
  const section = domManager.createSectionElement(
    ['popup__footer']
  );

  const buttonStart = domManager.createButtonElement(
    ['footer__btn', 'footer__btnfooter__btn-start'],
    {innerText: 'Start'}
  );

  const buttonReset = domManager.createButtonElement(
    ['footer__btn', 'footer__btn-reset'],
    {innerText: 'Reset'}
  );

  domManager.appendChildElements(
    section,
    buttonStart,
    buttonReset
  );

  return section;
}

function handleResetButtonClick() {
  playerOneGameBoardInstance.resetBoard();
  const popupGridContainer = document.querySelector('.popup__body__grid-container');

  popupGridContainer.removeEventListener('mouseover', handleShipPlacementCheckOnHover);
  popupGridContainer.addEventListener('mouseover', handleShipPlacementCheckOnHover);

  popupGridContainer.removeEventListener('click', handleShipPlacementOnClick);
  popupGridContainer.addEventListener('click', handleShipPlacementOnClick);

  popupGridContainer.innerHTML = '';
  const cells = generateGridCells('popup__body__grid-cell');
  domManager.appendChildElements(
    popupGridContainer,
    ...cells
  );
}

function shipPlacementCheck(shipType) {
  if(!shipType) return playerOneGameBoardInstance.areShipsPlaced();
  if(shipType) return playerOneGameBoardInstance.areShipsPlaced(shipType);
}

function getAxisValue() {
  const btnValue =  document.getElementById('toggle-switch');
  return btnValue.value;
}

function handleTextNameTyped(event) {
  const textNameValue = event.target.value;
  if(textNameValue.trim() !== '') event.target.style.borderColor = 'var(--font-color)';
  if(textNameValue.trim() === '') event.target.style.borderColor = 'red';
}

function handleAxisChange(event) {
  const btnAxisValue = event.target.value;
  let axisValue;
  if(btnAxisValue === AXIS.X) axisValue = AXIS.Y;
  if(btnAxisValue === AXIS.Y) axisValue = AXIS.X;
  event.target.value = axisValue;
}

function handleBtnStartClick() {
  const playerName = document.querySelector('.player-name--textbox');

  if(playerName.value.trim() === '') playerName.style.borderColor = 'red';
  if(playerName.value.trim() !== '') playerOneInstnace.createPlayer(playerName.value.trim());
}

function handleShipPlacementOnClick(event) {
  const target = event.target;

  if(target.classList.contains('popup__body__grid-cell')){
    const rowIndex = target.getAttribute('data-row');
    const colIndex = target.getAttribute('data-column');
    let shipType;

    if(!shipPlacementCheck()){
      
      if(!shipPlacementCheck(SHIP.PATROLBOAT.NAME)) shipType = SHIP.PATROLBOAT.NAME;
      if(!shipPlacementCheck(SHIP.SUBMARINE.NAME)) shipType = SHIP.SUBMARINE.NAME;
      if(!shipPlacementCheck(SHIP.CRUISER.NAME)) shipType = SHIP.CRUISER.NAME;
      if(!shipPlacementCheck(SHIP.BATTLESHIP.NAME)) shipType = SHIP.BATTLESHIP.NAME;
      if(!shipPlacementCheck(SHIP.CARRIER.NAME)) shipType = SHIP.CARRIER.NAME;

      const results = playerOneGameBoardInstance.placeShip(shipType, [parseInt(rowIndex), parseInt(colIndex)], getAxisValue());

      if(results === ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED) ERROR_MESSAGES.SHIP_CANNOT_BE_PLACED;
      if(results === true) {
        const popupGridContainer = document.querySelector('.popup__body__grid-container');
        popupGridContainer.innerHTML = '';
        const cells = generateGridCells('popup__body__grid-cell');
        domManager.appendChildElements(
          popupGridContainer,
          ...cells
        );
      }
    }else {
      const playerGridContainer = document.querySelector('.popup__body__grid-container');
      playerGridContainer.removeEventListener('mouseover', handleShipPlacementOnClick);
    }
  }
}

function handleShipPlacementCheckOnHover(event) {
  const target = event.target;
  let possiblePlacementCells = [];
  const playerGridContainer = document.querySelector('.popup__body__grid-container');
  const playerOnceCells = playerGridContainer.querySelectorAll('.popup__body__grid-cell');
  if(target.classList.contains('popup__body__grid-cell')){
    const rowIndex = target.getAttribute('data-row');
    const colIndex = target.getAttribute('data-column');
    let shipType;
    console.log('att');


    if(!shipPlacementCheck()) {
      if(!shipPlacementCheck(SHIP.PATROLBOAT.NAME)) shipType = SHIP.PATROLBOAT.NAME;
      if(!shipPlacementCheck(SHIP.SUBMARINE.NAME)) shipType = SHIP.SUBMARINE.NAME;
      if(!shipPlacementCheck(SHIP.CRUISER.NAME)) shipType = SHIP.CRUISER.NAME;
      if(!shipPlacementCheck(SHIP.BATTLESHIP.NAME)) shipType = SHIP.BATTLESHIP.NAME;
      if(!shipPlacementCheck(SHIP.CARRIER.NAME)) shipType = SHIP.CARRIER.NAME;

      const results = playerOneGameBoardInstance.canPlaceShip(shipType, [parseInt(rowIndex), parseInt(colIndex)], getAxisValue());
      const possibleCells = playerOneGameBoardInstance.possiblePlacementCells(shipType, [parseInt(rowIndex), parseInt(colIndex)], getAxisValue());
      
      if(possibleCells) {
        possibleCells.forEach((cell) => {
          possiblePlacementCells.push(`${cell[0]}-${cell[1]}`);
        });
      }
  
      if(!results) target.style.cursor = 'not-allowed';
    }else {
      playerGridContainer.removeEventListener('mouseover', handleShipPlacementCheckOnHover);
    }
  }


  if(possiblePlacementCells.length > 0){
    playerOnceCells.forEach((cell) => {
      const classList = cell.classList;
      cell.classList.remove('popup__body__grid-cell--placed');
      if (possiblePlacementCells.some((className) => classList.contains(className))) {
        cell.classList.add('popup__body__grid-cell--placed');
      }
    });
  }

}

function popupEventListeners() {
  const popupGridContainer = document.querySelector('.popup__body__grid-container');
  const btnReset = document.querySelector('.footer__btn-reset');
  const btnAxisToggle = document.getElementById('toggle-switch');
  const btnStart = document.querySelector('.footer__btnfooter__btn-start');
  const textName = document.querySelector('.player-name--textbox');

  popupGridContainer.addEventListener('mouseover', handleShipPlacementCheckOnHover);
  popupGridContainer.addEventListener('click', handleShipPlacementOnClick);
  btnReset.addEventListener('click', handleResetButtonClick);
  btnAxisToggle.addEventListener('change', handleAxisChange);
  btnStart.addEventListener('click', handleBtnStartClick);
  textName.addEventListener('input', handleTextNameTyped)
}

function createPopup() {
  const divOverlay = domManager.createDivElement(
    ['popup-overlay']
  );

  const popup = domManager.createDivElement(
    ['popup']
  );

  domManager.appendChildElements(
    popup,
    createPopupHeader(),
    createPopupBody(),
    createPopupFooter()
  );

  domManager.appendChildElements(
    divOverlay,
    popup
  );
  return divOverlay
}

export {
  createPopup,
  popupEventListeners
}; 