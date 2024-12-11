// Perlin Noise Project (Terrain Generation)
// Lavan 
// October 1, 2024

let rectWidth = 1; // initializes the width of my rectangles
let t = 0; // sets the time 
let maxHeight = 1000; // Maximum height of the rectangles

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  staircase()
}

// unction to generate my terain
function staircase() {
  let maxRectHeight = 0; //tracks the height of the tallest rectangle
  let maxX = 0; //X position of tallest rectangle
  let maxY = height // y position
  let totalHeight = 0; // Sums up the heights of all rectangles to calculate the average terrain height

  if (keyIsDown(LEFT_ARROW)) { // decreases the rectangle width
    rectWidth -= 1
  }
  if (keyIsDown(RIGHT_ARROW)) { // increases the rectangle width
    rectWidth += 1
  }

  // assigns limits to the rectangle width
  if (rectWidth <= 1) {
    rectWidth = 1;
  }
  else if (rectWidth >= width / 3) {
    rectWidth = width / 3;
  }

  //draws rectangles across the screen
  for (let x = 0; x < width; x += rectWidth) {
    let noiseValue = noise(x * 0.01 + t); //generates noise value
    let rectHeight = map(noiseValue, 0, 1, 0, maxHeight); //maps the noise value to a height

    //updates the tallest rectangle  
    if (rectHeight > maxRectHeight) {
      maxRectHeight = rectHeight; // Store the new maximum rectangle height
      maxX = x; // Store the x-position of the tallest rectangle
      maxY = height - rectHeight;  // Store the y-position
    }
    fill(0);
    rect(x, height - rectHeight, rectWidth - 1, rectHeight); // draws rectangles at current position
    totalHeight += rectHeight;  // Accumulate the height of the current rectangle into totalHeight
  }

  // Calculate the average height of all the rectangles in the terrain
  let averageHeigth = totalHeight / (width / rectWidth);
  stroke(255, 0, 0);
  line(0, height - averageHeigth, width, height - averageHeigth) // Draw a horizontal line at the average height
  drawFlag(maxX + rectWidth / 2, maxY); // draws my flag at the highest point

  t += 0.01; // increases the time variable to create smooth Perlin noise animation
}

//function to draw a flag
function drawFlag(x, y) {
  stroke(0);
  rect(x-2, y-50, 2, 50);
  fill(255,0,0);
  triangle(x, y - 50, x, y - 30, x + 20, y - 40);
}