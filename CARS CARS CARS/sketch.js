// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let eastbound = [];
let westbound = [];
let Light;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 20; i++) {
    eastbound.push(new Vehicle(random(width), height / 2 + 20 + random(250), 1, 5));
    westbound.push(new Vehicle(random(width), height / 2 - 50 + random(-250), -1, 5));
  }
  Light = new trafficLight();
}

function mouseClicked() {
  if (keyIsDown(SHIFT)) {
    // Left click for eastbound car
    eastbound.push(new Vehicle(random(windowWidth), height / 2 + 20 + random(250), 1, 5));

  }
  else {
    // Shift + left click for westbound car
    westbound.push(new Vehicle(random(windowWidth), height / 2 - 30 + random(-250), -1, 5));
  }
}

function draw() {
  background(220);
  drawRoad();
  Light.update();
  Light.display();
  for (let i = 0; i < eastbound.length; i++) {
    eastbound[i].action();
  }
  for (let i = 0; i < westbound.length; i++) {
    westbound[i].action();
  }
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
    if (Light.state === "green") {
      this.move();
    }
    if (int(random(100)) === 1) {
      this.speedDown();
    }
    if (int(random(100)) === 1) {
      this.speedUp();
    }
    if (random(1) < 0.01) {
      this.changeColor();
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
    rect(this.x, this.y, 40, 20); // car body
    fill(60);
    ellipse(this.x + 15, this.y + 20, 10, 10); // left wheel
    ellipse(this.x + 25, this.y + 15, 10, 10); // right wheel
  }

  drawTruck() {
    fill(this.c);
    noStroke();
    rect(this.x, this.y, 60, 30);
    fill(60);
    ellipse(this.x + 10, this.y + 30, 15, 15);
    ellipse(this.x + 50, this.y + 30, 15, 15);
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
  changeColor() {
    this.c = color(random(255), random(255), random(255));
  }

}

class trafficLight {
  constructor() {
    this.state = "green";
    this.time = 0;
  }

  update() {
    if (this.time > 0) {
      this.time--;
      if (this.time === 0) {
        this.state = "green"; //resets the light to greem
      }
    }
  }

  display() {
    if (this.state === "green") {
      fill("green");
    }
    else {
      fill("red");
    }
    noStroke();
    rect(width / 2 - 25, height / 2 - 450, 100, 50);
  }
  toggle() {
    if (this.state === "green") {
      this.state = "red";
      this.time = 120;
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    Light.toggle();
  }
}

