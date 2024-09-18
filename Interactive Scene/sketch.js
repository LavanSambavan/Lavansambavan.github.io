// Interactive Scene
// Lavan
// September 16, 2024

// Creates and interactive scene
// Global variables
let bgColors;
let currentColorIndex;


stroke()
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Array of backgroud colors
  bgColors = [
    color(10, 10, 50), // blue 
    color(50, 0, 100), // purple
    color(0),   // black
    color(192, 192, 192) // gray
  ];
  currentColorIndex = 0

}
// Changes background colours
function mousePressed(){
  // Act only when center button is clicked
  if (mouseButton === CENTER){
    // Ensure we reset the index to 
    // the begining of the array
    if (currentColorIndex == 3) {
      currentColorIndex = 0;
    }
    else {
      // Increment the index position by one
      currentColorIndex = currentColorIndex + 1;
    }
  }
}

// Function to draw the plannet at any given time
function drawPlanet(distance, radius, plannetColor, speed) {

  let angle = frameCount*speed;

  // X position using cosin for orbit
  let x = distance * cos(angle); 

  //Y position using sin for orbit
  let y = distance * sin(angle);

  fill(plannetColor);

  // Draw the plannet in ellipse
  ellipse(x, y, radius * 2, radius * 2);

  
}

function mouseWheel(event) {
  text(event, 0,0)
  
}

function draw() {
  //background(100, 180, 220);
  // Set the background to black
  background(bgColors[currentColorIndex]);

  // Move the origin to the center
  translate(width / 2, height / 2);

  noStroke();

  //Sun Color
  fill(255, 204, 0);
  ellipse(0, 0, 60, 60); // Sun in the center

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

