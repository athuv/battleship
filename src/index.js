import './css/styles.css';
import * as domManager from './js/utils/domUtils.js';
import createTopSection from './js/components/section-top.js';
import createMiddleSection from './js/components/section-middle.js';

function component() {
  const bodyElement = document.body;
  domManager.appendChildElements(
    bodyElement,
    createTopSection(),
    createMiddleSection()
  );
  
  return bodyElement;
}
            
document.documentElement.appendChild(component());