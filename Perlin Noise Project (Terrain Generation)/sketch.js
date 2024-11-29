// Perlin Noise Project (Terrain Generation)
// Lavan 
// October 1, 2024

let rectWidth = 1;
let t=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  staircase()
}

function staircase() {
  let windowSize = windowWidth * 2
  let maxRect = windowWidth / windowSize
  let maxHeight = 500;
  let maxRectHeight = 0;
  let maxX = 0;
  let maxY = height

  if (keyIsDown(LEFT_ARROW)) {
    rectWidth -= 1
  }
  if (keyIsDown(RIGHT_ARROW)) {
    rectWidth += 1
  }
  if (rectWidth <= 1) {
    rectWidth = 1;
  }
  else if(rectWidth >= width / 10){
    rectWidth = width / 10;
  }
 for (let i = 0; i< windowSize; i++){
  let x = i* maxRect;
  let noiseValue = noise(i*0.01 + t);
  let rectHeight = map(noiseValue, 0, 1, 0, maxHeight);
  if(rectHeight>maxRectHeight){
    maxRectHeight = rectHeight;
    maxX = x;
  }
  fill(0);
  rect(x, height-rectHeight,maxRect-1, rectHeight);
 }
}

