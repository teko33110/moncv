"use strict";
 
const CHRONO_STATUS = {
  START: 1,
  PAUSE: 2,
  RESET: 3,
  NOT_START: 4,
};
 
// CHRONO OBJECT
const chrono = {
  HUNDREDTH_SECONDS: 0,
  SECONDS: 0,
  MINUTES: 0,
  HOURS: 0,
  HUNDREDTH_SECONDS_MAX: 100,
  SECONDS_MAX: 60,
  MINUTES_MAX: 60,
  HOURS_MAX: 24,
  STATUS: CHRONO_STATUS.NOT_START,
};
 
// CHRONO DE L'HTML
let chronoHtml;
 
// MAIN
const main = () => {
  chronoHtml = document.getElementById("chrono");
 
  updateView();
  insertButtons();
};
 
const startTimer = () => {
  chrono.STATUS = CHRONO_STATUS.START;
  timer();
};
 
// FONCTION TIMER
const timer = () => {
  if (chrono.STATUS === CHRONO_STATUS.START) {
    hundredthSecondsCalculator();
    updateView();
    setTimeout(timer, 10);
  }
};
 
// VIEW
const updateView = () => {
  const hours = numberToString(chrono.HOURS);
  const minutes = numberToString(chrono.MINUTES);
  const seconds = numberToString(chrono.SECONDS);
  const hundred = numberToString(chrono.HUNDREDTH_SECONDS);
  chronoHtml.innerText = `${hours} : ${minutes} : ${seconds} : ${hundred}`;
};
 
// SYNTAXE
const numberToString = (number) => {
  // return number < 10 ? `0${number}` : `${number}`;
 
  let stringNumber = "";
 
  if (number < 10) {
    stringNumber = `0${number}`;
  } else {
    stringNumber = `${number}`;
  }
 
  return stringNumber;
};
 
// HEURES
const hoursCalculator = () => {
  ++chrono.HOURS;
  if (chrono.HOURS === chrono.HOURS_MAX) {
    chrono.HOURS = 0;
  }
};
 
// MINUTES
const minutesCalculator = () => {
  ++chrono.MINUTES;
  if (chrono.MINUTES === chrono.MINUTES_MAX) {
    chrono.MINUTES = 0;
    hoursCalculator();
  }
};
 
// SECONDS
const secondsCalculator = () => {
  ++chrono.SECONDS;
  if (chrono.SECONDS === chrono.SECONDS_MAX) {
    chrono.SECONDS = 0;
    minutesCalculator();
  }
};
 
//  HUNDRED SECONDS
const hundredthSecondsCalculator = () => {
  ++chrono.HUNDREDTH_SECONDS;
  if (chrono.HUNDREDTH_SECONDS === chrono.HUNDREDTH_SECONDS_MAX) {
    chrono.HUNDREDTH_SECONDS = 0;
    secondsCalculator();
  }
};
 
// INSERTION DES BOUTONS
const insertButtons = () => {
  const div = createDiv();
  const startButton = createButton("Start", startTimer);
  const pauseButton = createButton("Pause", pauseTimer);
  const resetButton = createButton("Reset", resetTimer);
 
  div.append(startButton);
  div.append(pauseButton);
  div.append(resetButton);
  document.body.append(div);
};
 
// CREATION D'UN BOUTON
const createButton = (text, action) => {
  const button = document.createElement("button");
  button.innerText = text;
  button.addEventListener("click", action);
  return button;
};
 
// CREATION D'UNE DIV
const createDiv = () => {
  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.gap = "8px";
  return div;
};
 
// PAUSE
const pauseTimer = () => {
  chrono.STATUS = CHRONO_STATUS.PAUSE;
};
 
// RESET
const resetTimer = () => {
  chrono.STATUS = CHRONO_STATUS.RESET;
  chrono.HOURS = 0;
  chrono.MINUTES = 0;
  chrono.SECONDS = 0;
  chrono.HUNDREDTH_SECONDS = 0;
  updateView();
};
 
addEventListener("load", main);