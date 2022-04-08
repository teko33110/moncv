// const ELEMENT_TO_SHOW = 3;
const CLASSES = {
  DISABLED: "disabled",
  ARROW: "arrow",
  LEFT: "left",
  RIGHT: "right",
};
const SCROLL_DIRECTION = {
  LEFT: -1,
  RIGHT: 1,
};

const main = () => {
  const container = document.getElementById("slider");
  const ul = document.querySelector("#slider ul");
  const ELEMENT_TO_SHOW = parseInt(container.getAttribute("data-elToShow"));

  initSlider(container, ul, ELEMENT_TO_SHOW);
  addEventListener("resize", () => initSlider(container, ul, ELEMENT_TO_SHOW));
};

const initSlider = (container, ul, ELEMENT_TO_SHOW) => {
  const slider = getSlider(ul, ELEMENT_TO_SHOW);
  const liWidth = getLiWidth(slider, ELEMENT_TO_SHOW);
  const totalUlWidth = getTotalWidth(slider, liWidth);

  removeArrows();
  const moveRight = () =>
    moveScroll(ul, liWidth, SCROLL_DIRECTION.RIGHT, ELEMENT_TO_SHOW);
  const moveLeft = () =>
    moveScroll(ul, liWidth, SCROLL_DIRECTION.LEFT, ELEMENT_TO_SHOW);
  const arrowRight = createArrow(CLASSES.RIGHT, moveRight);
  const arrowLeft = createArrow(CLASSES.LEFT, moveLeft);

  const onScroll = () => checkScroll(ul, totalUlWidth, arrowRight, arrowLeft);
  onScroll();
  ul.addEventListener("scroll", onScroll);

  container.append(arrowRight);
  container.append(arrowLeft);
  setLiWidth(ul, liWidth);
};

const removeArrows = () => {
  const arrows = document.querySelectorAll(`.${CLASSES.ARROW}`);
  arrows.forEach((arrow) => arrow.remove());
};

const setLiWidth = (el, width) => {
  for (let i = 0; i < el.children.length; i++) {
    const li = el.children[i];
    li.style.minWidth = `${width}px`;
  }
};

const getSlider = (ul, elementToShow) => {
  return {
    gap: getPropertyValue(ul, "gap"), // 16
    nbrOfGap: elementToShow + 1, // 3 + 1 = 4
    nbrOfLi: ul.childElementCount, // 12
    ulWidth: ul.offsetWidth, // 972px
  };
};

const getLiWidth = (slider, elementToShow) => {
  return (slider.ulWidth - slider.nbrOfGap * slider.gap) / elementToShow;
};

const getTotalWidth = (slider, liWidth) => {
  const totalGap = (slider.nbrOfLi + 1) * slider.gap;
  const totalLi = slider.nbrOfLi * liWidth;
  return totalGap + totalLi;
};

const createArrow = (direction, movement) => {
  const arrow = document.createElement("div");
  arrow.classList.add(CLASSES.ARROW, direction);
  arrow.addEventListener("click", movement);
  return arrow;
};

const checkScroll = (el, totalWidth, arrowRight, arrowLeft) => {
  const elWidth = el.offsetWidth;
  const elScrollLeft = el.scrollLeft;
  const maxScrollLeft = totalWidth - elWidth;
  setEnabled(arrowLeft);
  setEnabled(arrowRight);
  if (elScrollLeft >= maxScrollLeft) setDisabled(arrowRight);
  if (elScrollLeft <= 0) setDisabled(arrowLeft);
};

const setDisabled = (el) => {
  el.classList.add(CLASSES.DISABLED);
};

const setEnabled = (el) => {
  el.classList.remove(CLASSES.DISABLED);
};

const moveScroll = (el, distance, direction, multiplicator) => {
  el.scrollLeft += distance * direction * multiplicator;
};

const getPropertyValue = (ul, property) => {
  const style = getComputedStyle(ul);
  const val = parseFloat(style.getPropertyValue(property));
  return val;
};

addEventListener("load", main);
