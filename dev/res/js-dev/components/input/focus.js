/* jshint browser:true */

'use strict';

module.exports = (catcher, slides) => {

  const sliderEvents = require('slides/sliderEvents');

  const eventManager = require('patterns/tx-event');

  function onForcedScroll(event) {
    event.preventDefault();
    event.stopPropagation();
    window.scrollTo(0, 0);
  }

  function onFocus(event) {
    const slide = event.path[event.path.indexOf(catcher) - 1];
    const index = slides.indexOf(slide);
    eventManager.trigger(catcher, sliderEvents.slide, false, 'UIEvent', {index: index});
  }

  catcher.addEventListener('focus', onFocus, true);
  document.addEventListener('scroll', onForcedScroll);

};
