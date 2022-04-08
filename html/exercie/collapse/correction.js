"use strict";

const DELAY = 1;
const PADDING = 32;

// const hide = (el) => changeHeighAndPadding(el, 0, `0 ${PADDING}px`);
// const pListener = (p) => p.addEventListener("click", () => handleClick(p));

const main = () => {
  const pFirst = document.querySelectorAll("p:first-child");
  const pLast = document.querySelectorAll("p:last-child");
  // pFirst.forEach(pListener);

  for (let i = 0; i < pFirst.length; i++) {
    const el = pFirst[i];
    el.addEventListener("click", () => handleClick(el, pLast));
  }
};

const handleClick = (el, pLast) => {
  hideAll(pLast);
  showContent(el.nextElementSibling);
};

const showContent = (el) => {
  if (el.clientHeight > 0) return;
  changeHeighAndPadding(el, `${el.scrollHeight}px`, `${PADDING}px`);
};

const hideAll = (arr) => {
  // arr.forEach(hide);

  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    changeHeighAndPadding(el, 0, `0 ${PADDING}px`);
  }
};

const changeHeighAndPadding = (el, height, padding = null) => {
  el.style.height = height;
  if (!padding) return;
  el.style.padding = padding;
};

addEventListener("load", main);