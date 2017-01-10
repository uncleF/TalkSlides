/* jshint browser:true */

'use strict';

module.exports = catcher => {

  const sliderEvents = require('slides/sliderEvents');

  const socket = require('socket.io-client')();
  const eventManager = require('patterns/tx-event');

  function onPrev() {
    eventManager.trigger(catcher, sliderEvents.prev, false, 'UIEvent');
  }

  function onNext() {
    eventManager.trigger(catcher, sliderEvents.next, false, 'UIEvent');
  }

  socket.on(sliderEvents.prev, onPrev);
  socket.on(sliderEvents.next, onNext);

};
