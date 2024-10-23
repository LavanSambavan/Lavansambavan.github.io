// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let eastbound = [];
let westbound = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 20; i++) {
    eastbound.push(new Vehicle(random(windowWidth), random(600, 800), 1, 5));
    westbound.push(new Vehicle(random(windowWidth), random(300, 550), -1, 5));
  }
}

function draw() {
  background(220);
  drawRoad();
  for (let i = 0; i < eastbound.length; i++) {
    eastbound[i].action();
  }
  for (let i = 0; i < westbound.length; i++) {
    westbound[i].action();
  }
}

function mouseClicked(){
  eastbound.push(new Vehicle(random(windowWidth), random(600,800), 1, 5));
}

function drawRoad() {
  fill(0);
  noStroke();
  rect(0, height / 2 - 300, width, 600);
  stroke(255);
  strokeWeight(5);
  for (let i = 0; i < width; i += 40) {
    line(i, height / 2, i + 20, height / 2);
  }
}

class Vehicle {
  constructor(x, y, dir, xSpeed) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.c = color(random(255), random(255), random(255));
    this.type = int(random(2));
    this.xSpeed = xSpeed;
  }


  action() {
    // call the other functions like move, speed up etc..
    this.display();
    this.move();
    if (int(random(100)) === 1){
      this.speedDown();
    }
    if(int(random(100)) === 1){
      this.speedUp();
    }
  }

  display() {
    if (this.type === 0) {
      this.drawCar();
    }
    else if (this.type === 1) {
      this.drawTruck();
    }
  }

  drawCar() {
    fill(this.c);
    noStroke();
    rect(this.x, this.y, 30, 15);
  }

  drawTruck() {
    fill(this.c);
    noStroke();
    rect(this.x, this.y, 40, 20);
  }

  move() {
    this.x += this.xSpeed * this.dir;
    if (this.x > width) {
      this.x = 0; // Wrap around 
    }
    if (this.x < 0) {
      this.x = width; // Wrap around
    }
  }

  speedUp() {
    if (this.xSpeed < 15 && this.xSpeed > 0) {
      this.xSpeed += 0.1;
    }
  }

  speedDown() {
    if (this.xSpeed > 0) {
      this.xSpeed -= 0.1;
    }
  }
}
