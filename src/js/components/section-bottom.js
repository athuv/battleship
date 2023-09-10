import * as domManager from '../utils/domUtils.js';

function createBottomSection() {
  const bottomSection = domManager.createSectionElement(
    ['section-bottom']
  );

  const span = domManager.createSpanElement(
    ['section-bottom__message-box'],
    {innerText: 'Place Your Ships'}
  );

  domManager.appendChildElements(
    bottomSection,
    span
  );
  return bottomSection;
}

export default createBottomSection;