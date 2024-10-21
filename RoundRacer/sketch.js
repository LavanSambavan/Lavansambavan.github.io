// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let racer1, racer2, racer3;


function setup() {
  createCanvas(windowWidth, windowHeight);
 
  // Initialize the racers
  racer1 = new RoundRacer(200, color(255, 0, 0)); // Red racer
  racer2 = new RoundRacer(400, color(0, 255, 0)); // Green racer
  racer3 = new RoundRacer(600, color(0, 0, 255)); // Blue racer
}


function draw() {
  background(0);
 
  // Move and display each racer
  racer1.move();
  racer1.display();
 
  racer2.move();
  racer2.display();
 
  racer3.move();
  racer3.display();
}


// RoundRacer Class
class RoundRacer {
  constructor(yPosition, color) {
    this.xPosition = 0;                    // Start at x = 0
    this.yPosition = yPosition;            // Set yPosition based on input
    this.xSpeed = random(3, 15);           // Random speed between 3 and 15
    this.color = color;                    // Set color based on input
  }
 
  // Move the racer by its speed, reset to 0 if it goes off the screen
  move() {
    this.xPosition += this.xSpeed;
    if (this.xPosition > width) {
      this.xPosition = 0;
    }
  }
 
  // Display the racer as a circle
  display() {
    fill(this.color);
    noStroke();
    ellipse(this.xPosition, this.yPosition, 50, 50);
  }
}
