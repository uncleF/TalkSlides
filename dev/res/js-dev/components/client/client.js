/* jshint browser:true */

'use strict';

module.exports = _ => {

  const sliderEvents = require('slides/sliderEvents');

  const socket = require('socket.io-client')();

  const NEXT_ID = 'next';
  const PREV_ID = 'prev';

  function onNextClick(event) {
    event.preventDefault();
    socket.emit(sliderEvents.next);
  }

  function onPrevClick(event) {
    event.preventDefault();
    socket.emit(sliderEvents.prev);
  }

  function interactions() {
    next.addEventListener('click', onNextClick);
    prev.addEventListener('click', onPrevClick);
  }

  const next = document.getElementById(NEXT_ID);
  const prev = document.getElementById(PREV_ID);

  interactions();

};
