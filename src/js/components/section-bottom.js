import * as domManager from '../utils/domUtils.js';

function createBottomSection() {
  const bottomSection = domManager.createSectionElement(
    ['section-bottom']
  );

  const span = domManager.createSpanElement(
    [],
    {innerText: 'Place Your Carrier Ship'}
  );

  domManager.appendChildElements(
    bottomSection,
    span
  );
  return bottomSection;
}

export default createBottomSection;