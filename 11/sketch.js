// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let point = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let i = 0; i < point.length; i++) {
    point[i].move();
    point[i].display();
  }
}

function mouseClicked() {
  point.push(new MiniPoint(mouseX, mouseY));
}

class MiniPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.c = color(random(255), random(255), random(255));
    this.s = 20;
    this.noiseX = random(10);
    this.noiseY = random(10);
    this.offset = 0.01;
    this.MAX_SPEED = 5;
  }


  display() {
    fill(this.c);
    noStroke();
    ellipse(this.x, this.y, this.s, this.s);
  }

  move() {
    let xSpeed = map(noise(this.noiseX), 0.1, -this.MAX_SPEED, this.MAX_SPEED);
    let ySpeed = map(noise(this.noiseY), 0.1, -this.MAX_SPEED, this.MAX_SPEED);
    this.x += xSpeed;
    this.y += ySpeed;
    this.noiseX += this.offset;
    this.noiseY += this.offset;
  }
}