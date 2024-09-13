// User Events
// Lavan
// September 12 2024

let tSize = 40;
let x  = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  // Mouse Section
  //if(mouseIsPressed) tSize = random(20,80);  // This keeps happening until the mouse is not pressed

  fill(0);
  textSize(tSize);
  text((mouseX + ", " + mouseY), mouseX, mouseY);

  fill(255,0,0);
  circle(width/2, height/2,100);

  
  fill(0,255,0);

  x =  x + 10;
  if(x > width) x = 0;
  rect(x, height/2, 60);
}


function mousePressed(){ // This fiction is happens only once when the mouse is clicked
  // THIS IS CALLED AUTOMATICALLY!!!
  tSize = random(20,80);
}
