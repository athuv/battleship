import './css/styles.css';
import * as domManager from './js/utils/domUtils.js';
import { createTopSection } from './js/components/section-top.js';

function component() {
  const bodyElement = document.body;
  domManager.appendChildElements(bodyElement, createTopSection())

  return bodyElement;
}
            
document.documentElement.appendChild(component());