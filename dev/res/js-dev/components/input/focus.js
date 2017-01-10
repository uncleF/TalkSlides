/* jshint browser:true */

'use strict';

module.exports = catcher => {

  const sliderEvents = require('slides/sliderEvents');

  const eventManager = require('patterns/tx-event');

  function onForcedScroll(event) {
    event.preventDefault();
    event.stopPropagation();
    window.scrollTo(0, 0);
  }

  function onFocus(event) {
    // eventManager.trigger(catcher, sliderEvents.position, false, 'UIEvent', {position: });
  }

  document.addEventListener('scroll', onForcedScroll);
  catcher.addEventListener('focus', onFocus, true);

};
