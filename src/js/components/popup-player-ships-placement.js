import * as domManager from '../utils/domUtils.js';
import { ERROR_MESSAGES, SHIP } from '../utils/config.js';
import generateGridCells from './generate-grid-cells.js';
import { getPlayerOneGameBoardInstance } from '../utils/instanceRegistry.js';

const playerOneGameBoardInstance = getPlayerOneGameBoardInstance();

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

  const asideGrid = domManager.createAsideElement(['popup__body__grid']);
  const span = domManager.createSpanElement(['body__grid__heading'], {innerText: 'Place Your Ships'});
  const buttonAxis = domManager.createButtonElement(['body__btn-change-axis'], {innerText: 'Axis: Y'});

  const divGridContainer = domManager.createDivElement(['popup__body__grid-container']);
  const cells = generateGridCells('popup__body__grid-cell');

  domManager.appendChildElements(divGridContainer, ...cells);
  domManager.appendChildElements(span, buttonAxis);
  domManager.appendChildElements(asideGrid, span, divGridContainer);

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

function handleShipPlacementOnClick(event) {
  const target = event.target;

  if(target.classList.contains('popup__body__grid-cell')){
    const rowIndex = target.getAttribute('data-row');
    const colIndex = target.getAttribute('data-column');
    let shipType;

    if(!playerOneGameBoardInstance.areShipsPlaced()) {
      if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.CARRIER.NAME)) {
        shipType = SHIP.CARRIER.NAME;
      }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.BATTLESHIP.NAME)) {
        shipType = SHIP.BATTLESHIP.NAME;
      }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.CRUISER.NAME)) {
        shipType = SHIP.CRUISER.NAME;
      }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.SUBMARINE.NAME)) {
        shipType = SHIP.SUBMARINE.NAME;
      }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.PATROLBOAT.NAME)) {
        shipType = SHIP.PATROLBOAT.NAME;
      }

      const results = playerOneGameBoardInstance.placeShip(shipType, [parseInt(rowIndex), parseInt(colIndex)], 'x');

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
      console.log('everything placed');
    }
  }
}

function handleShipPlacementCheckOnHover(event) {
  const target = event.target;
  if(target.classList.contains('popup__body__grid-cell')){
    const rowIndex = target.getAttribute('data-row');
    const colIndex = target.getAttribute('data-column');
    let shipType;
    console.log('att');

    if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.CARRIER.NAME)) {
      shipType = SHIP.CARRIER.NAME;
    }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.BATTLESHIP.NAME)) {
      shipType = SHIP.BATTLESHIP.NAME;
    }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.CRUISER.NAME)) {
      shipType = SHIP.CRUISER.NAME;
    }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.SUBMARINE.NAME)) {
      shipType = SHIP.SUBMARINE.NAME;
    }else if(!playerOneGameBoardInstance.areShipsPlaced(SHIP.PATROLBOAT.NAME)) {
      shipType = SHIP.PATROLBOAT.NAME;
    }else if(playerOneGameBoardInstance.areShipsPlaced()) {
     const playerOneCells =  document.querySelector('.popup__body__grid-container');
     playerOneCells.removeEventListener('mouseover', handleShipPlacementCheckOnHover);
    }

    const results = playerOneGameBoardInstance.canPlaceShip(shipType, [parseInt(rowIndex), parseInt(colIndex)], 'x');    
    if(!results) target.style.cursor = 'not-allowed';
  }
}

function popupEventListeners() {
  const popupGridContainer = document.querySelector('.popup__body__grid-container');
  popupGridContainer.addEventListener('mouseover', handleShipPlacementCheckOnHover);
  popupGridContainer.addEventListener('click', handleShipPlacementOnClick);
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