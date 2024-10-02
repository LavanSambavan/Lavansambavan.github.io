// Interactive Scene
// Lavan
// September 16, 2024

// Creates an interactive scene


// Global variables
let bgColors;
let currentBack;

let rocketX = 0; // Rocket's horizontal position
let rocketY = 0; // Rocket's vertical position


function setup() {
  createCanvas(windowWidth, windowHeight);

  // Array of backgroud colors
  bgColors = [
    color(10, 10, 50), // blue 
    color(50, 0, 100), // purple
    color(0),   // black
    color(192, 192, 192) // gray
  ];
  currentBack = 0

}


// Changes background colours
function mousePressed() {
  // Act only when center button is clicked
  if (mouseButton === CENTER) {
    // Ensure we reset the index to 
    // the begining of the array
    if (currentBack == 3) {
      currentBack = 0;
    }
    else {
      // Increment the index position by one
      currentBack = currentBack + 1;
    }
  }
}

// Function to draw the plannet at any given time
function drawPlanet(distance, radius, plannetColor, speed) {

  let angle = frameCount * speed;

  // X position using cosin for orbit
  let x = distance * cos(angle);

  //Y position using sin for orbit
  let y = distance * sin(angle);

  fill(plannetColor);

  // Draw the plannet in ellipse
  ellipse(x, y, radius * 2);


}

function asteroid() {
  fill(50, 20, 20);// draws a asteroid
  circle(mouseX, mouseY, 40);

}

function solarSystem() {
  //Sun Color
  fill(255, 204, 0);
  ellipse(0, 0, 60); // Sun in the center


  // Draw plannets in the elliptical orbits
  //Mercury
  drawPlanet(50, 5, 'gray', 0.05);

  // Venus
  drawPlanet(80, 10, 'yellow', 0.03);

  //Earth
  drawPlanet(110, 12, 'blue', 0.02);

  //Mars
  drawPlanet(150, 9, 'red', 0.01);
}


function rocketShip() {
  fill('lightgray');
  rect(-15 + rocketX, -40 + rocketY, 30, 80); // Rocket body

  // Rocket tip (triangle)
  fill('red');
  triangle(-25 + rocketX, -40 + rocketY, 25 + rocketX, -40 + rocketY, 0 + rocketX, -70 + rocketY); // Rocket tip

  // Draw the boosters (triangles)
  fill('orange');
  triangle(-15 + rocketX, 40 + rocketY, -35 + rocketX, 70 + rocketY, -5 + rocketX, 40 + rocketY); // Left booster
  triangle(15 + rocketX, 40 + rocketY, 35 + rocketX, 70 + rocketY, 5 + rocketX, 40 + rocketY);     // Right booster

  // Rocket windows (circles)
  fill('blue');
  ellipse(0 + rocketX, -20 + rocketY, 10, 10); // Window
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    rocketY -= 10; // Move up
  }
  else if (keyCode === DOWN_ARROW) {
    rocketY += 10; // Move down
  }
  else if (keyCode === LEFT_ARROW) {
    rocketX -= 10; // Move left
  }
  else if (keyCode === RIGHT_ARROW) {
    rocketX += 10; // Move right
  }
}
// Moves the rocket based on arrow key input



function draw() {
  //background(100, 180, 220);
  // Set the background to black
  background(bgColors[currentBack]);
  asteroid();

  fill('red')
  textSize(24);
  text("LavanS", 20, height - 20);


  // Move the origin to the center
  translate(width / 2, height / 2);

  noStroke();
  solarSystem();
  rocketShip();
  fill(0);
 
}

