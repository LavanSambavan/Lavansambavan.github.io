// Perlin Noise Project (Terrain Generation)
// Lavan 
// October 1, 2024

let rectWidth = 1;
let t = 0;
let maxHeight = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  staircase()
}

function staircase() {
  let maxRectHeight = 0;
  let maxX = 0;
  let maxY = height
  let totalHeight = 0;

  if (keyIsDown(LEFT_ARROW)) {
    rectWidth -= 1
  }
  if (keyIsDown(RIGHT_ARROW)) {
    rectWidth += 1
  }
  if (rectWidth <= 1) {
    rectWidth = 1;
  }
  else if (rectWidth >= width / 10) {
    rectWidth = width / 10;
  }
  for (let x = 0; x < width; x += rectWidth) {
    let noiseValue = noise(x * 0.01 + t);
    let rectHeight = map(noiseValue, 0, 1, 0, maxHeight);

    if (rectHeight > maxRectHeight) {
      maxRectHeight = rectHeight;
      maxX = x;
      maxY = height - rectHeight;
    }
    fill(0);
    rect(x, height - rectHeight, rectWidth - 1, rectHeight);
    totalHeight += rectHeight;
  }

  let averageHeigth = totalHeight / (width / rectWidth);
  stroke(255, 0, 0);
  line(0, height - averageHeigth, width, height - averageHeigth)
  drawFlag(maxX + rectWidth / 2, maxY);

  t += 0.01;
}

function drawFlag(x, y) {
  stroke(0);
  rect(x-2, y-50, 4, 50);
  fill(255,0,0);
  triangle(x, y - 50, x, y - 30, x + 20, y - 40);
}