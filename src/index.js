import './css/normalize.css'
import './css/styles.css';
import * as domManager from './js/utils/domUtils.js';
import createTopSection from './js/components/section-top.js';
import {createMiddleSection} from './js/components/section-middle.js';
import createBottomSection from './js/components/section-bottom.js';
import { createPopup, popupEventListeners } from './js/components/popup-player-ships-placement.js';

console.log(process.env.NODE_ENV);

function component() {
  const bodyElement = document.body;
  domManager.appendChildElements(
    bodyElement,
    createTopSection(),
    createMiddleSection(),
    createBottomSection(),
    createPopup()
  );

  popupEventListeners();
  return bodyElement;
}
            
document.documentElement.appendChild(component());