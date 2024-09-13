// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rY = 50;
let rX = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);


  if (keyIsPressed) {
    if (key === "a") {
      rY += 10;
      if (rY > height) rY = 0;
    }


  }
  fill(50, 150, 225);
  rect(rX, rY, 70, 25, 10, 0);
}

function keyPressed() {
  if (keyCode == DOWN_ARROW) {
    rY += 100;
  }
}