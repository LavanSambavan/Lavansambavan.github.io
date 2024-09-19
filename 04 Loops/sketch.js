// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  myBackground();
  myForeground();

}

function myBackground(){
// USe some loops to create a gradient background
}

function myForeground() {
//Draw some shapes using FOR / WHILE loops
// var          //cond.       //Modification of var
for(let x = 0; x < mouseX; x += 50){
  fill(0);
  circle(x, height / 2, 40);
  fill(255);
  text(x, x, height/2);
}
}