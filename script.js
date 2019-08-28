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
  // draws the square of the cube with the current color
  ctx.fillStyle = cube.colors[c];
  ctx.fillRect(cube.px - cube.radius/2, cube.py - cube.radius/2, cube.radius, cube.radius);
}

function addFont() {
  // adds the DVD font
  ctx.fillStyle = "black";
  ctx.font = "40px Impact";
  let topText = "DVD";
  let topTextWidth = ctx.measureText(topText).width;
  ctx.fillText(topText, cube.px - topTextWidth/2, cube.py);
  // adds the video font
  ctx.fillStyle = "white";
  ctx.font = "22px Impact";
  let bottomText = "VIDEO";
  let bottomTextWidth = ctx.measureText(bottomText).width;
  ctx.fillText(bottomText, cube.px - bottomTextWidth/2, cube.py + (cube.radius/4));
}

function moveCube() {
  cube.px += cube.vx; // horizontal speed based on velocity
  cube.py += cube.vy; // vertical speed based on velocity
  // left border
  if (cube.px - cube.radius/2 < tvBorder/2) {
    cube.px = tvBorder/2 + cube.radius/2;
    cube.vx *= -1;
    if ( c < 2 ) { c += 1; } else if ( c == 2 ) { c = 0; } // cycles color
  // right border
  } else if (cube.px + cube.radius/2 > (width - tvBorder/2)) {
    cube.px = (width - tvBorder/2) - cube.radius/2;
    cube.vx *= -1;
    if ( c < 2 ) { c += 1; } else if ( c == 2 ) { c = 0; } // cycles color
  }
  // top border
  if (cube.py - cube.radius/2 < tvBorder/2) {
    cube.py = tvBorder/2 + cube.radius/2;
    cube.vy *= -1;
    if ( c < 2 ) { c += 1; } else if ( c == 2 ) { c = 0; } // cycles color
  // bottom border
  } else if (cube.py + cube.radius/2 > (height - tvBorder/2)) {
    cube.py = (height - tvBorder/2) - cube.radius/2;
    cube.vy *= -1;
    if ( c < 2 ) { c += 1; } else if ( c == 2 ) { c = 0; } // cycles color
  }
}

function mainLoop() {
  window.requestAnimationFrame(mainLoop);
  ctx.clearRect(0, 0, width, height); // eliminates "image drag"
  drawTV();
  moveCube();
  drawCube();
  addFont();
}

/***********************************************/


// sets initial variables
let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");

// sets canvas size variables for use in functions
let width = 800;
let height = 600;
let tvBorder = 100;
let c = 0;

// sets cube size, random position, velocity and movement
let cube = {
  colors: ["red", "limegreen", "blue"],
  radius: 100,
  px: Math.random() * width, // cube's x position
  py: Math.random() * height, // cube's y position
  vx: 1.5, // cube's x velocity
  vy: 1.5, // cube's y velocity
};

window.requestAnimationFrame(mainLoop); // enters loop