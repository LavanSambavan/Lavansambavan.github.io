// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let eastbound = [];
let westbound = [];
let trafficLight;

function setup() {
  createCanvas(800, 400);

  // Initialize traffic light
  trafficLight = new TrafficLight();

  // Populate eastbound and westbound arrays
  for (let i = 0; i < 20; i++) {
    eastbound.push(new Vehicle(random(50, 750), random(50, 350), 1)); // Moving right
    westbound.push(new Vehicle(random(750, 50), random(50, 350), 0)); // Moving left
  }
}

function draw() {
  background(220);
  drawRoad();

  // Update and display vehicles
  for (let vehicle of eastbound) {
    vehicle.action();
  }
  for (let vehicle of westbound) {
    vehicle.action();
  }

  // Update and display traffic light
  trafficLight.display();
}

function drawRoad() {
  fill(0); // Black road
  rect(0, 0, width, height);

  stroke(255); // White lane line
  strokeWeight(5);
  for (let i = 0; i < height; i += 40) {
    line(width / 2, i, width / 2, i + 20); // Dashed line
  }
}

// Vehicle Class
class Vehicle {
  constructor(x, y, direction) {
    this.type = floor(random(0, 2)); // 0 or 1
    this.color = color(random(255), random(255), random(255));
    this.x = x;
    this.y = y;
    this.direction = direction; // 0 for left, 1 for right
    this.xSpeed = direction === 1 ? random(2, 5) : random(-5, -2);
  }

  display() {
    fill(this.color);
    if (this.type === 0) {
      rect(this.x, this.y, 30, 15); // Car
    } else {
      rect(this.x, this.y, 40, 20); // Truck/Van
    }
  }

  move() {
    this.x += this.xSpeed;
    if (this.x > width) this.x = 0; // Wrap around
    if (this.x < 0) this.x = width; // Wrap around
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
    this.color = color(random(255), random(255), random(255));
  }

  action() {
    this.move();
    if (random(1) < 0.01) this.speedUp();
    if (random(1) < 0.01) this.speedDown();
    if (random(1) < 0.01) this.changeColor();
    this.display();
  }
}

// TrafficLight Class
class TrafficLight {
  constructor() {
    this.state = 'green'; // Initial state
    this.timer = 0; // Timer for red light duration
  }

  display() {
    fill(this.state === 'red' ? 'red' : 'green');
    rect(700, 50, 30, 60);
  }

  changeState() {
    if (this.state === 'green') {
      this.state = 'red';
      this.timer = 120; // 120 frames of red light
    }
  }

  update() {
    if (this.state === 'red') {
      this.timer--;
      if (this.timer <= 0) {
        this.state = 'green';
      }
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    trafficLight.changeState();
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    if (!keyIsDown(SHIFT)) {
      eastbound.push(new Vehicle(0, mouseY, 1));
    } else {
      westbound.push(new Vehicle(width, mouseY, 0));
    }
  }
}