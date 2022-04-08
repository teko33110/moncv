"use strict";
 
/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
 
const RocketStatus = {
  START: "images/rocket2.gif",
  FLY: "images/rocket3.gif",
};
 
const StarSize = {
  TINY: "tiny",
  NORMAL: "normal",
  BIG: "big",
};
 
let btn;
let rocket;
let billboard;
let counter = 10;
let disabled = false;
 
/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/
 
const main = () => {
  rocket = document.getElementById("rocket");
  btn = document.getElementById("firing-button");
  billboard = document.querySelector("#billboard span");
 
  btn.addEventListener("click", handleStart);
  generateAllStars();
};
 
const handleStart = () => {
  if (counter < 10) return;
  disableBtn();
  changeRocketStatus(RocketStatus.START);
  startCounter();
};
 
const startCounter = () => {
  billboard.innerText = counter;
  counter--;
  counter >= 0 ? setTimeout(startCounter, 1000) : letsGOO();
};
 
const letsGOO = () => {
  changeRocketStatus(RocketStatus.FLY);
  rocket.classList.add("tookOff");
};
 
const disableBtn = () => btn.classList.add("disabled");
const changeRocketStatus = (status) => (rocket.src = status);
 
// GENERATE STARS
 
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
 
const generatePosition = (max) => {
  const rdm = getRndInteger(0, max);
  return rdm;
};
 
const getStarSize = () => {
  const rdm = generatePosition(2);
  if (rdm === 0) {
    return StarSize.TINY;
  } else if (rdm === 1) {
    return StarSize.NORMAL;
  } else {
    return StarSize.BIG;
  }
};
 
const generateStar = () => {
  const xPosition = generatePosition(innerWidth);
  const yPosition = generatePosition(innerHeight);
  const starSize = getStarSize();
  const star = {
    x: xPosition,
    y: yPosition,
    size: starSize,
  };
  return star;
};
 
const generateAllStars = () => {
  for (let i = 0; i < 150; i++) {
    const star = generateStar();
    const starDiv = document.createElement("div");
    starDiv.classList.add(star.size, "star");
    starDiv.style.left = `${star.x}px`;
    starDiv.style.top = `${star.y}px`;
 
    document.body.append(starDiv);
  }
};
 
/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/
 
addEventListener("load", main);