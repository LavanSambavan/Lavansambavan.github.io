// CARS CARS CARS
// Lavan
// November 12 2024
//

//Global variables
let eastbound = []; 
let westbound = [];
let Light;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 20; i++) { //makes sure only 20 cars will spawn going east or west 
    eastbound.push(new Vehicle(random(width), height / 2 + 20 + random(240), 1, 5)); //spawns cars going east giving a random variable on a specific area (bottom part of the road so they stay in their lane)
    westbound.push(new Vehicle(random(width), height / 2 - 50 + random(-225), -1, 5)); // same thing as eastbound but cars are going west
  }
  Light = new trafficLight(); //creates my traffic light which will allow me to stop the cars
}

function mouseClicked() { //assigns keys to allow me to add more cars going in a specific direction
  if (keyIsDown(SHIFT)) {
    westbound.push(new Vehicle(random(windowWidth), height / 2 - 30 + random(-250), -1, 5)); // if im pressing the shift key while left clicking it generates cars going west

  }
  else {
    eastbound.push(new Vehicle(random(windowWidth), height / 2 + 20 + random(250), 1, 5)); // if im just left clicking it generates a car going east
  }
}

function draw() {
  background(220);
  drawRoad(); // draws my road
  Light.update();
  Light.display();// generates the traffic light
  for (let i = 0; i < eastbound.length; i++) {
    eastbound[i].action(); // draws the cars
  }
  for (let i = 0; i < westbound.length; i++) {
    westbound[i].action(); //draws the cars
  }
}

function drawRoad() { // a function that draws my whole road
  fill(0);
  noStroke();
  rect(0, height / 2 - 300, width, 600);
  stroke(255);
  strokeWeight(5);
  for (let i = 0; i < width; i += 40) {
    line(i, height / 2, i + 20, height / 2);
  }
}


class Vehicle {// a class that gives characteristics for the vehicles
  constructor(x, y, dir, xSpeed) {
    this.x = x; // gives x position
    this.y = y; // gives y position
    this.dir = dir; // direction  of car
    this.c = color(random(255), random(255), random(255)); // gives an original random colour
    this.type = int(random(2)); //decides if its a truck or a car
    this.xSpeed = xSpeed; // speed
  }


  action() {
    // calls all the other functions like move, speed up etc..
    this.display();
    if (Light.state === "green") {
      this.move(); // says that if the ligt is green my cars will keep moving
    }
    if (int(random(100)) === 1) {
      this.speedDown(); //1% chance cars will slow down
    }
    if (int(random(100)) === 1) {
      this.speedUp(); //1% chance cars will speed up
    }
    if (random(1) < 0.01) {
      this.changeColor(); //1% chance cars will change colours
    }
  }

  display() { // displays the type of vehicle
    if (this.type === 0) {
      this.drawCar();
    }
    else if (this.type === 1) {
      this.drawTruck();
    }
  }

  drawCar() { // function that draws a car
    fill(this.c);
    noStroke();
    // Car body
    rect(this.x, this.y, 40, 20);
    // Wheels
    fill(60);  // Tire color
  ellipse(this.x + 10, this.y + 20, 12, 12); // Left wheel
  ellipse(this.x + 30, this.y + 20, 12, 12); // Right wheel 
}

  drawTruck() { // function that draws a truck
    fill(this.c);
    noStroke();
    // Truck body
    rect(this.x, this.y, 60, 30);
    rect(this.x + 20, this.y - 15, 20, 15);
    // Wheels
    fill(60);
    ellipse(this.x + 15, this.y + 30, 12, 12); // Left wheel
    ellipse(this.x + 45, this.y + 30, 12, 12); // Right wheel
  }

  move() { // moves the car assigning a speed
    this.x += this.xSpeed * this.dir;
    if (this.x > width) {
      this.x = 0; // Wrap around 
    }
    if (this.x < 0) {
      this.x = width; // Wrap around
    }
  }

  speedUp() { // function that speeds up the car
    if (this.xSpeed < 15 && this.xSpeed > 0) {
      this.xSpeed += 0.1;
    }
  }

  speedDown() { // function that slows down the car
    if (this.xSpeed > 0.11) {
      this.xSpeed -= 0.1;
    }
  }
  changeColor() { // function that changes the colour of the car
    this.c = color(random(255), random(255), random(255));
  }

}

class trafficLight { // assigns characteristics for my traffic light
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

  display() { //draws and shows my traffic light
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
      this.time = 120; // stops the cars for 120 frames when its red
    }
  }
}

function keyPressed() { // if space button is pressed my light switches from green to red and stops the cars
  if (key === ' ') {
    Light.toggle();
  }
}

