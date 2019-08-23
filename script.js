/********** FUNCTIONS **********/

function drawTV() {
  // draws the television
  ctx.beginPath();
  ctx.fillStyle = "rgb(33, 33, 33)"; // inner TV
  ctx.rect(0, 0, width, height);
  ctx.fill();
  ctx.strokeStyle = "rgb(20, 20, 20)"; // outer border
  ctx.lineWidth = tvBorder;
  ctx.stroke();
}

function drawCube() {
  ctx.fillRect(cube.px - cube.radius/2, cube.py - cube.radius/2, cube.radius, cube.radius);
}

function addFont() {
  // adds the DVD font
  ctx.fillStyle = "black";
  ctx.font = "50px Impact";
  let topText = "DVD";
  let topTextWidth = ctx.measureText(topText).width;
  ctx.fillText(topText, cube.px - topTextWidth/2, cube.py);
  // adds the video font
  ctx.fillStyle = "white";
  ctx.font = "29px Impact";
  let bottomText = "VIDEO";
  let bottomTextWidth = ctx.measureText(bottomText).width;
  ctx.fillText(bottomText, cube.px - bottomTextWidth/2, cube.py + (cube.radius/4));
}

function drawRed() {
  // draws the red square
  ctx.fillStyle = "red";
  drawCube();
  addFont();
}

function drawBlue() {
  // draws the blue square
  ctx.fillStyle = "blue";
  drawCube();
  addFont();
}

function drawGreen() {
  // draws the green square
  ctx.fillStyle = "limegreen";
  drawCube();
  addFont();
}

function mainLoop() {
  window.requestAnimationFrame(mainLoop);
  ctx.clearRect(0, 0, width, height); // eliminates "image drag"
  drawTV();
  moveCube();
  drawRed();
}

function moveCube() {
  cube.px += cube.vx; // horizontal speed based on velocity
  cube.py += cube.vy; // vertical speed based on velocity
  // left border
  if (cube.px - cube.radius/2 < tvBorder/2) {
    cube.px = tvBorder/2 + cube.radius/2;
    cube.vx *= -1;
  // right border
  } else if (cube.px + cube.radius/2 > (width - tvBorder/2)) {
    cube.px = (width - tvBorder/2) - cube.radius/2;
    cube.vx *= -1;
  }
  // top border
  if (cube.py - cube.radius/2 < tvBorder/2) {
    cube.py = tvBorder/2 + cube.radius/2;
    cube.vy *= -1;
  // bottom border
  } else if (cube.py + cube.radius/2 > (height - tvBorder/2)) {
    cube.py = (height - tvBorder/2) - cube.radius/2;
    cube.vy *= -1;
  }
}

/***********************************************/


// sets initial variables
let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");

// sets canvas size variables for use in functions
// (800:600 ratio + outside border)
let width = 960;
let height = 760;
let tvBorder = 80;

// sets cube size, random position, velocity and movement
let cube = {
  radius: 130,
  px: Math.random() * width, // cube's x position
  py: Math.random() * height, // cube's y position
  vx: 3, // cube's x velocity
  vy: 3, // cube's y velocity
};

window.requestAnimationFrame(mainLoop); // enters loop