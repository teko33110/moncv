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

let selectedBullet = 1;

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
  removeBullets();
  const moveRight = () =>
    moveScroll(ul, liWidth, SCROLL_DIRECTION.RIGHT, ELEMENT_TO_SHOW);
  const moveLeft = () =>
    moveScroll(ul, liWidth, SCROLL_DIRECTION.LEFT, ELEMENT_TO_SHOW);

  const arrowRight = createArrow(CLASSES.RIGHT, moveRight);
  const arrowLeft = createArrow(CLASSES.LEFT, moveLeft);

  const bullets = createBullets(slider, ELEMENT_TO_SHOW, ul, liWidth);

  listenKeyboard(moveLeft, moveRight);

  const onScroll = () => checkScroll(ul, totalUlWidth, arrowRight, arrowLeft);
  onScroll();
  ul.addEventListener("scroll", onScroll);

  container.append(arrowRight);
  container.append(arrowLeft);
  container.append(bullets);
  setLiWidth(ul, liWidth);
};

const listenKeyboard = (moveLeft, moveRight) => {
  addEventListener("keydown", (event) => event.preventDefault());
  addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight") moveRight();
    if (event.key === "ArrowLeft") moveLeft();
  });
};

const removeBullets = () => {
  const bullets = document.querySelector(".bullets");
  if (!bullets) return;
  bullets.remove();
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

const getSlider = (el, elementToShow) => {
  return {
    gap: getPropertyValue(el, "gap"),
    nbrOfGap: elementToShow + 1,
    nbrOfLi: el.childElementCount,
    ulWidth: el.offsetWidth,
  };
};

const getLiWidth = (slider, elementToShow) => {
  return (slider.ulWidth - slider.nbrOfGap * slider.gap) / elementToShow;
};

const getTotalWidth = (slider, liWidth) => {
  const totalGap = slider.nbrOfLi * slider.gap;
  const totalLi = slider.nbrOfLi * liWidth;
  return totalGap + totalLi;
};

const createArrow = (direction, movement) => {
  const arrow = document.createElement("div");
  arrow.classList.add(CLASSES.ARROW, direction);
  arrow.addEventListener("click", movement);
  return arrow;
};

const createBullets = (slider, elementToShow, ul, width) => {
  const nbr = Math.ceil(slider.nbrOfLi / elementToShow);
  const div = document.createElement("div");
  div.classList.add("bullets");
  for (let i = 1; i <= nbr; i++) {
    const bullet = document.createElement("a");
    bullet.id = i;
    bullet.href = `#slider-page-${i}`;
    bullet.addEventListener("click", (event) =>
      onBulletClick(event, i, ul, width, elementToShow)
    );
    div.append(bullet);
  }
  return div;
};

const onBulletClick = (event, bulletId, ul, width, elementToShow) => {
  event.preventDefault();
  if (selectedBullet === bulletId) return;
  const diff = bulletId - selectedBullet;
  moveScroll(ul, width, diff, elementToShow);
  selectedBullet = bulletId;
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

const getPropertyValue = (el, property) => {
  const style = getComputedStyle(el);
  const val = parseFloat(style.getPropertyValue(property));
  return val;
};

addEventListener("load", main);
