// Perlin Noise Project (Terrain Generation)
// Lavan 
// October 1, 2024



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  staircase()
}

function staircase(){
  //use for loops to draw a series of rectangles for use of terrain
  randomSeed(1); // only ofr random()
  let rectWidth = 4;
  for(let x = 0; x<= width; x  += rectWidth){
    noFill()
    //generate a random height for each rectangle
    let rectHeight = random(50, 500)
    rect(x, height, rectWidth, -rectHeight)
  }
}