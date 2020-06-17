// initialisation du canevas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// résolution adaptée pour retina
var cSize = canvas.offsetWidth * 2;
canvas.width = cSize;
canvas.height = cSize;
var canvasX = canvas.offsetLeft;
var canvasY = canvas.offsetTop;

// les valeurs des pixels
var maxPixels = 20;
var pixelSize = 4;
var pixelColor = "#aaa";

var myTimer;


// le code pour dessiner

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // dessiner un nombre de pixels:
  nbrPixels = getRandom(5, maxPixels);

  var i;
  for (i = 0; i < nbrPixels; i++) {
    // draw pixel
    ctx.fillStyle = pixelColor;
    ctx.fillRect(
      randn_bm(0, cSize, 1), // position X
      randn_bm(0, cSize, 1.25), // position Y
      pixelSize, pixelSize);
  }

}

// Démarrer
window.addEventListener("load", function (event) {
  myTimer = setInterval(draw, 60);

});

// Intercepter le clic
document.getElementById("button").addEventListener("mousedown", function (event) {
  maxPixels = 100;
  pixelSize = 6;
  pixelColor = "#000";
});

// Lâcher le clic
document.getElementById("button").addEventListener("mouseup", function () {
  maxPixels = 20;
  pixelSize = 4;
  pixelColor = "#777";
});

// Fonctions utilitaires

// Pour produire des valeurs aléatoires
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pour produire des valeurs aléatoires modifiées
// source: https://stackoverflow.com/questions/25582882/

function randn_bm(min, max, skew) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
  num = Math.pow(num, skew); // Skew
  num *= max - min; // Stretch to fill range
  num += min; // offset to min
  return num;
}
