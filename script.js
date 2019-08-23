/********** FUNCTIONS **********/

function drawTV() {
  // draws the television
  ctx.fillStyle = "rgb(33, 33, 33)"; // inner TV
  ctx.rect(0, 0, width, height);
  ctx.fill();
  ctx.strokeStyle = "rgb(20, 20, 20)"; // outer border
  ctx.lineWidth = tvBorder;
  ctx.stroke();
}

function drawRect() {
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
  drawRect();
  addFont();
}

function drawBlue() {
  // draws the blue square
  ctx.fillStyle = "blue";
  drawRect();
  addFont();
}

function drawGreen() {
  // draws the green square
  ctx.fillStyle = "limegreen";
  drawRect();
  addFont();
}

function mainLoop() {
  ctx.clearRect(0, 0, width, height); // eliminates "image drag"
  drawTV();
  moveCube();
  drawRed();
  window.requestAnimationFrame(mainLoop);
}

function moveCube() {
  cube.px += cube.vx; // horizontal speed based on velocity
  cube.py += cube.vy; // vertical speed based on velocity
  // left border
  if (cube.px - cube.radius < 0) {
    cube.px = cube.radius + cube.movement;
    cube.vx *= -1;
  // right border
  } else if (cube.px + cube.radius > width) {
    cube.px = width - cube.radius - cube.movement;
    cube.vx *= -1;
  }
  // top border
  if (cube.py - cube.radius < 0) {
    cube.py = cube.radius + cube.movement;
    cube.vy *= -1;
  // bottom border
  } else if (cube.py + cube.radius > height) {
    cube.py = height - cube.radius - cube.movement;
    cube.vy *= -1;
  }
}

/***********************************************/


// sets initial variables
let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");

// sets canvas size variables for use in functions
// (800:600 ratio + outside border)
let width = 966;
let height = 766;
let tvBorder = 83;

// sets cube size, random position, velocity and movement
let cube = {
  radius: 135,
  px: width/2,
  py: height/2,
  // px: Math.random() * width, // cube's x position
  // py: Math.random() * height, // cube's y position
  vx: 5, // cube's x velocity
  vy: 5, // cube's y velocity
  movement: .001
};

window.requestAnimationFrame(mainLoop); // enters loop