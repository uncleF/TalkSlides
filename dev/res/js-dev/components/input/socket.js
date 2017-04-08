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

  function onTrack(distance) {
    eventManager.trigger(catcher, sliderEvents.track, false, 'UIEvent', distance);
  }

  function onSnap(event) {
    eventManager.trigger(catcher, sliderEvents.snap, false, 'UIEvent');
  }

  function onEnable() {
    eventManager.trigger(catcher, sliderEvents.enable, false, 'UIEvent');
  }

  function onDisable() {
    eventManager.trigger(catcher, sliderEvents.disable, false, 'UIEvent');
  }

  socket.on(sliderEvents.prev, onPrev);
  socket.on(sliderEvents.next, onNext);
  socket.on(sliderEvents.track, onTrack);
  socket.on(sliderEvents.snap, onSnap);
  socket.on(sliderEvents.enable, onEnable);
  socket.on(sliderEvents.disable, onDisable);

};
