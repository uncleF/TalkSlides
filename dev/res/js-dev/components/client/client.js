/* jshint browser:true */

'use strict';

module.exports = _ => {

  const sliderEvents = require('slides/sliderEvents');

  const socket = require('socket.io-client')();

  const TRACK_ACTIVE_CLASS_LIST = 'trackpad-is-active';

  const NEXT_ID = 'next';
  const PREV_ID = 'prev';
  const TOGGLE_ID = 'toggle';
  const TRACK_ID = 'trackpad';

  let status = false;
  let start;

  function calculateDifference(touch) {
    return {
      x: touch.clientX - start.x,
      y: touch.clientY - start.y
    }
  }

  function onTrackMove(event) {
    event.preventDefault();
    socket.emit(sliderEvents.track, { distance: calculateDifference(event.touches[0]) });
  }

  function onTrackTouch(event) {
    event.preventDefault();
    event.stopPropagation();
    start = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    }
    socket.emit(sliderEvents.snap);
  }

  function enableTrackpad() {
    status = true;
    track.classList.add(TRACK_ACTIVE_CLASS_LIST);
    track.addEventListener('touchstart', onTrackTouch);
    track.addEventListener('touchmove', onTrackMove);
    socket.emit(sliderEvents.enable);
  }

  function disableTrackpad() {
    status = false;
    track.classList.remove(TRACK_ACTIVE_CLASS_LIST);
    track.removeEventListener('touchstart', onTrackTouch);
    track.removeEventListener('touchmove', onTrackMove);
    socket.emit(sliderEvents.disable);
  }

  function onNextClick(event) {
    event.preventDefault();
    socket.emit(sliderEvents.next);
  }

  function onPrevClick(event) {
    event.preventDefault();
    socket.emit(sliderEvents.prev);
  }

  function onToggleClick(event) {
    event.preventDefault();
    if (status) {
      disableTrackpad()
    } else {
      enableTrackpad();
    }
  }

  function interactions() {
    next.addEventListener('click', onNextClick);
    prev.addEventListener('click', onPrevClick);
    toggle.addEventListener('click', onToggleClick);
  }

  const next = document.getElementById(NEXT_ID);
  const prev = document.getElementById(PREV_ID);
  const toggle = document.getElementById(TOGGLE_ID);
  const track = document.getElementById(TRACK_ID);

  interactions();

};
