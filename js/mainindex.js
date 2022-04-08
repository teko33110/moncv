const main = () => {
  const darkMode = document.getElementById("dark-mode");
  darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    
  });

  document.body.addEventListener("scroll", () => indicateScrollBar());
};

const header = document.querySelector("header");

const div = document.createElement("div");
div.className = "loader";
header.append(div);


const bodyHeight = document.documentElement.clientHeight;



function indicateScrollBar() {
  const distanceFromPageTop =
    document.body.scrollTop || document.documentElement.scrollTop;

  const height = document.body.scrollHeight - innerHeight;

  const scrolled = (distanceFromPageTop / height) * 100;

  document.querySelector(".loader").style.width = `${scrolled}%`;

  
}

addEventListener("load", main);
