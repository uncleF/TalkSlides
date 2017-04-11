/* jshint browser:true */

'use strict';

module.exports = _ => {

  const sliderEvents = require('slides/sliderEvents');

  const keyboard = require('input/keyboard');
  const mouse = require('input/mouse');
  const socket = require('input/socket');
  const focus = require('input/focus');

  const PAGE_POINTER_CLASS_NAME = 'page-is-pointer';
  const SLIDES_SLIDE_CLASS_NAME = 'frames-is-sliding';
  const SLIDES_JUMP_CLASS_NAME = 'frames-is-jumping';

  const VELOCITY = 2.75;

  let start;

  function getActiveIndex() {
    return activeIndex;
  }

  function setActiveIndex(index) {
    activeIndex = index;
  }

  function generateCSS(index) {
    return `translateX(${index * -100}%) translateZ(0)`;
  }

  function calculateIndexFromPosition(position) {
    const width = window.innerWidth;
    const scroll = width * activeIndex + position;
    return Math.floor(scroll / width);
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
    focus(holder, slides);
  }

  function onSlide(event) {
    slide(event.data.index);
  }

  function onJump(event) {
    jump(event.data.index);
  }

  function onTrack(event) {
    const distance = event.data.distance;
    const position = {
      x: start.left + (distance.x * VELOCITY),
      y: start.top + (distance.y * VELOCITY)
    }
    pointer.style.transform = `translate(${position.x}px, ${position.y}px) translateZ(0)`
  }

  function onSnap() {
    start = pointer.getBoundingClientRect();
  }

  function onEnable() {
    document.body.classList.add(PAGE_POINTER_CLASS_NAME);
  }

  function onDisable() {
    document.body.classList.remove(PAGE_POINTER_CLASS_NAME);
  }

  function subscribe() {
    holder.addEventListener(sliderEvents.next, next);
    holder.addEventListener(sliderEvents.prev, prev);
    holder.addEventListener(sliderEvents.slide, onSlide);
    holder.addEventListener(sliderEvents.jump, onJump);
    holder.addEventListener(sliderEvents.track, onTrack);
    holder.addEventListener(sliderEvents.snap, onSnap);
    holder.addEventListener(sliderEvents.enable, onEnable);
    holder.addEventListener(sliderEvents.disable, onDisable);
  }

  function opening() {
    let index = parseInt(window.location.hash.replace('#', ''), 10);
    if (index && typeof index === 'number') {
      jump(index);
    }
  }

  const holder = document.getElementById('frames');
  const slides = [].slice.call(document.getElementsByClassName('frame'));
  const maxIndex = slides.length - 1;
  const pointer = document.getElementById('pointer');
  let activeIndex = 0;

  input();
  subscribe();
  opening();

  return {
    slide: slide,
    jump: jump,
    next: next,
    prev: prev,
    index: getActiveIndex
  };

};
