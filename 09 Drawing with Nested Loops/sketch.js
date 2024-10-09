// Drawing with Nested Loops
// Lavan
// October 9 2024

// Global Variables
let gridSpacing = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //loopReview();
}

function loopReview() {
  // quick nested loop practice (x,y)
  for (let x = 0; x < 4; x++) { // x: 0, 1, 2, 3
    for (let y = 0; y < 4; y++) { // y: 0, 1, 2, 3
      print(x, y);
    }
  }
}
function draw() {
  background(220);
  // renderGrid();
  topLineCirlce();
 
}


function circleDistance(x1, y1, x2, y2) {
  let a = abs(x1 - x2);
  let b = abs(y1 - y2);
  let c = sqrt(pow(a, 2) + pow(b, 2));
  return round(c);
}

function renderGrid() {
  // use nested loops to create a grid of shapes
  for (let x = 0; x < width; x = x + gridSpacing) {
    for (let y = 0; y < height; y = y + gridSpacing) {
      let d = circleDistance(x, y, mouseX, mouseY);
      if (d > 150) {
        fill(0);
      }
      else {
        fill(200, 50, 120);
      }
      circle(x, y, gridSpacing);

      fill(200);
      textSize(gridSpacing / 2);
      text(d, x, y)
    }
  }
}

function topLineCirlce() {
  for (let x = 0; x < width; x += 20) {
    circle(x, 0, 10);
    line(x, 0, mouseX, mouseY);
  }
  for (let x = 0; x < width; x += 20) {
    circle(x, height, 10);
    line(x, height, mouseX, mouseY);
  }
  for (let y = 0; y < height; y += 20) {
    circle(0, y, 10);
    line(0, y, mouseX, mouseY);
  }
  for (let y = 0; y < height; y += 20) {
    circle(width, y, 10);
    line(width, y, mouseX, mouseY);
  }
}

