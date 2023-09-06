import './css/styles.css';
import * as domManager from './js/utils/domUtils.js';
import createTopSection from './js/components/section-top.js';
import {createMiddleSection, middleSectionEventListeners} from './js/components/section-middle.js';
import createBottomSection from './js/components/section-bottom.js';

function component() {
  const bodyElement = document.body;
  domManager.appendChildElements(
    bodyElement,
    createTopSection(),
    createMiddleSection(),
    createBottomSection()
  );

  middleSectionEventListeners();
  return bodyElement;
}
            
document.documentElement.appendChild(component());