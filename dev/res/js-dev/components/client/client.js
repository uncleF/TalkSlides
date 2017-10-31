/* jshint browser:true */

'use strict';

module.exports = _ => {

  const sliderEvents = require('slides/sliderEvents');

  const socket = require('socket.io-client')();

  const NEXT_ID = 'next';
  const PREV_ID = 'prev';
  const PLAY_ID = 'play';

  function onNextClick(event) {
    event.preventDefault();
    socket.emit(sliderEvents.next);
  }

  function onPrevClick(event) {
    event.preventDefault();
    socket.emit(sliderEvents.prev);
  }

  function onPlayClick() {
    event.preventDefault();
    console.log('!!!');
    socket.emit(sliderEvents.play);
  }

  function interactions() {
    next.addEventListener('touchstart', onNextClick);
    prev.addEventListener('touchstart', onPrevClick);
    play.addEventListener('touchstart', onPlayClick);
  }

  const next = document.getElementById(NEXT_ID);
  const prev = document.getElementById(PREV_ID);
  const play = document.getElementById(PLAY_ID);

  console.log(play);

  interactions();

};
