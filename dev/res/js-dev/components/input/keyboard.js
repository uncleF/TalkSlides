/* jshint browser:true */

'use strict';

module.exports = catcher => {

  const sliderEvents = require('slides/sliderEvents');

  const eventManager = require('patterns/tx-event');

  const KEY_EVENTS = {
    37: sliderEvents.prev,  // Left
    39: sliderEvents.next,  // Right
    38: sliderEvents.prev,  // Up
    40: sliderEvents.next,  // Down
    33: sliderEvents.prev,  // Page Up
    34: sliderEvents.next,  // Page Down
    32: sliderEvents.next,  // Space
  };

  function onKeyDown(event) {
    const keyCode = event.keyCode;
    if (KEY_EVENTS[keyCode]) {
      event.preventDefault();
      event.stopPropagation();
      eventManager.trigger(catcher, KEY_EVENTS[keyCode], false, 'UIEvent');
    }
  }

  document.addEventListener('keydown', onKeyDown);

};
