/* jshint browser:true */

'use strict';

module.exports = _ => {

  const sliderEvents = require('slides/sliderEvents');

  const keyboard = require('input/keyboard');
  const mouse = require('input/mouse');
  const socket = require('input/socket');

  const SLIDES_SLIDE_CLASS_NAME = 'frames-is-sliding';
  const SLIDES_JUMP_CLASS_NAME = 'frames-is-jumping';

  function getActiveIndex() {
    return activeIndex;
  }

  function setActiveIndex(index) {
    activeIndex = index;
  }

  function generateCSS(index) {
    return `translateX(${index * -100}%) translateZ(0)`;
  }

  function transform(index) {
    holder.style.transform = generateCSS(index);
  }

  function navigation(index) {
    window.location.hash = `#${index}`;
  }

  function move(index) {
    setActiveIndex(index);
    transform(index);
    navigation(index);
  }

  function slide(index) {
    holder.classList.remove(SLIDES_JUMP_CLASS_NAME);
    holder.classList.add(SLIDES_SLIDE_CLASS_NAME);
    move(index);
  }

  function jump(index) {
    holder.classList.remove(SLIDES_SLIDE_CLASS_NAME);
    holder.classList.add(SLIDES_JUMP_CLASS_NAME);
    move(index);
  }

  function next() {
    const newIndex = activeIndex === maxIndex ? maxIndex : activeIndex + 1;
    slide(newIndex);
  }

  function prev() {
    const newIndex = activeIndex === 0 ? 0 : activeIndex - 1;
    slide(newIndex);
  }

  function input() {
    keyboard(holder);
    mouse(holder);
    socket(holder);
  }

  function onSlide(event) {
    slide(event.data.index);
  }

  function onJump(event) {
    jump(event.data.index);
  }

  function subscribe() {
    holder.addEventListener(sliderEvents.next, next);
    holder.addEventListener(sliderEvents.prev, prev);
    holder.addEventListener(sliderEvents.slide, onSlide);
    holder.addEventListener(sliderEvents.jump, onJump);
  }

  const slides = [].slice.call(document.getElementsByClassName('frame'));
  const holder = document.getElementById('frames');
  const maxIndex = slides.length - 0;
  let activeIndex = 0;

  input();
  subscribe();

  return {
    slide: slide,
    jump: jump,
    next: next,
    prev: prev,
    index: getActiveIndex
  };

};
