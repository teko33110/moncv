const main = () => {
  const hamburger = document.querySelector(".menu");
  const header = document.querySelector("header");
  const shadow = document.querySelector(".shadow");

  hamburger.addEventListener("click", () => switchMenu(header, shadow));
  shadow.addEventListener("click", () => {
    switchMenu(header, shadow);
  });
};

const switchMenu = (head, shad) => {
  head.classList.toggle("translate");
  shad.classList.toggle("show");
};

addEventListener("load", main);
