"use strict";
 
// On défini le propriété de notre carré que l'on va dessiner dans un objet
let square = {
  color: "#FF0000",
  length: 20,
  x: 10,
  y: 10,
};
 
// Notre context et notre Canvas sont définis dans le Scope global pour un accès par nos fonctions
let canvasDom;
let ctx;
 
// Dès que le DOM est chargé on commence
document.addEventListener("DOMContentLoaded", function () {
  // L'objet du DOM Canvas
  canvasDom = document.querySelector("#canvas");
 
  // Le context utilisé avec Canvas qui donne accès aux librairies de manipulation 2D
  ctx = canvasDom.getContext("2d");
 
  // On dessine notre carré la première fois
  displaySquare();
 
  //Maintenant on met un évent pour savoir si l'utilisateur apuie sur une flèche du clavier
  document.addEventListener("keydown", moveSquare);
});
 
/** Gestionnaire dévènement clavier
 * @param {event} e l'évènement keydow
 */
function moveSquare(e) {
  // on détecte la touche et la direction puis on change les coordonnées
  switch (e.key) {
    case "ArrowRight":
      if (square.x + square.length < canvasDom.width) square.x++;
      break;
    case "ArrowLeft":
      if (square.x > 0) square.x--;
      break;
    case "ArrowUp":
      if (square.y > 0) square.y--;
      break;
    case "ArrowDown":
      if (square.y + square.length < canvasDom.height) square.y++;
      break;
  }
 
  // On dessine notre carré
  displaySquare();
}
 
/** Fonction qui affiche le carré avec ces coordonnées et la couleur défini dans le contexte
 *
 */
function displaySquare() {
  // On vide le Canvas avant de redessiner
  ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
 
  // On dit au contexte que la couleur de remplissage est gris
  ctx.fillStyle = "#DDDDDD";
  // On rempli le Canvas de gris
  ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);
 
  // On dit au contexte que la couleur de remplissage est rouge
  ctx.fillStyle = square.color;
 
  // On trace un nouveau carré rempli (fill) avec cette couleur
  ctx.fillRect(square.x, square.y, square.length, square.length);
}