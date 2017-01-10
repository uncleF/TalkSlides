/* jshint browser:true */

'use strict';

module.exports = catcher => {

  const sliderEvents = require('slides/sliderEvents');

  const eventManager = require('patterns/tx-event');

  const WHEEL_DELAY = 1250;

  function onWheelAlways(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function onWheel(event) {
    catcher.removeEventListener('wheel', onWheel, false);
    if (event.deltaY > 0) {
      eventManager.trigger(catcher, sliderEvents.next, false, 'UIEvent');
    } else if (event.deltaY < 0) {
      eventManager.trigger(catcher, sliderEvents.prev, false, 'UIEvent');
    }
    setTimeout(_ => catcher.addEventListener('wheel', onWheel, false), WHEEL_DELAY);
  }

  catcher.addEventListener('wheel', onWheelAlways, false);
  catcher.addEventListener('wheel', onWheel, false);

};
