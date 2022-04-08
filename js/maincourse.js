
const main = () => {
const darkMode = document.getElementById("dark-mode");
  darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    
  });
   };

   addEventListener("load", main);