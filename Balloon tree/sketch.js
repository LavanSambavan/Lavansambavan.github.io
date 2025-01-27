// Balloon Tree
// Lavan
// Jan 27, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let scale = 17;
let leafDepth = 5; //depth where the leaves get drawn
let maxDepth =6; //maximum depth of the tree


function setup() {
  createCanvas(500, 500);
  background(255);
}


function draw() {
  background(255); // make sure that at each fram the background is white and doesnt redraw the tree
  randomSeed(120); // keeps the colour and sizes consistent
  drawTree(width/2, height*.9, 90, maxDepth);
}


function drawLine( x1,  y1,  x2,  y2,  depth) {
  //draw a line segment connecting (x1,y1) to (x2,y2)
  strokeWeight(depth); //sets the thickness of the branch depending on the depth 
  stroke(0);
  line(x1, y1, x2, y2); // draws a line
}

//function that draws the tree
function drawTree(x1, y1, angle, depth) {
  if (depth > 0) {
    let x2 = x1 + (cos(radians(angle))*depth*scale);     //calculate endpoints of current branch
    let y2 = y1 - (sin(radians(angle))*depth*scale);     //using trig ratios. Get shorter based on depth

    drawLine(x1, y1, x2, y2, depth); // draws the branch
    
    if ( depth <= leafDepth){
      drawLeaf(x2, y2, depth) // adds the leaf at th eend of the branch
    }

    let angleOffset = map(mouseX, 0, width, 10, 45); //maps mouse position to chnage tge angle offset

    //keeps drawing three branches from the current branch
    drawTree(x2, y2, angle- angleOffset, depth-1);
    drawTree(x2, y2, angle, depth-1);
    drawTree(x2, y2, angle+ angleOffset, depth-1);
  }
}

//function that draw the leaf at the end of the branch
function drawLeaf(x, y, depth){
    let size = map(depth, 1, leafDepth,18, 30); //smaller leaves dor deeper branches
    fill(random(0, 255), random(0,255), random(0, 255)); //random colour for each branch
    noStroke();
    ellipse(x, y, size);
}

function keyPressed(){
  if (key === 'z'){
    leafDepth = max(0, leafDepth-1) // decreases leaf depth
  }

  else if (key === 'x'){
    leafDepth = min(maxDepth, leafDepth +1); // increase leaf depth
  }
}