// Perlin Noise Project (Terrain Generation)
// Lavan 
// October 1, 2024

let rectWidth = ;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  staircase()
}

function staircase(){

  // let rectWidth = 4;
  
  for (let x = 0; x <= width; x += rectWidth) {
    noFill();
    
    // Generate a height for each rectangle using noise
    let noiseValue = noise(x * 0.01); // Scale the x value for more variety
    let rectHeight = noiseValue * 1000; // Scale the height to fit the canvas
    
    // Draw the rectangle
    rect(x, height, rectWidth, -rectHeight);
  }
}

