// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rows = 25;
let cols = 25;
let w, h;
let pacX, pacY;  // pacmans position

//Power ups place 5 randomly
let powerUps = [
  { x: 1, y: 1 }, { x: 23, y: 1 }, { x: 4, y: 21 }, { x: 23, y: 23 }, { x: 20, y: 17 }, {x:1, y:6}
];
let maze = [
  "1111111111111111111111111", //1
  "1000000000100000000000001", //2
  "1011011110101111011111101",  //3
  "1001011110101111011110101",  //4
  "1111000000000000000000101",   //5
  "1111111011111111111011101",  //6
  "1000000000000101111011101",  //7
  "1101111111110001000000001", //8
  "1100011111110101011011111", //9
  "1111010000000000011000011", //10
  "1110010101111111011011011", //11
  "1110110101222221000001011",  //12
  "0000110101222221011101000", //13
  "1110000001222221000001011", //14
  "1110111101111111011101011", //15
  "1110000000000000000001011", //16
  "1111110111101011101111001", //17
  "1000110000001011101000101", //18
  "1010110111111000001011101", //19
  "1010110111111111101000001", //20
  "1010110100000001101111111", //21
  "1010010101110100000000001", //22
  "1011110100000101111111101", //23
  "1000000001111100000000001", //24
  "1111111111111111111111111" //25
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNER);
  w = width / cols;
  h = height / rows;

  //pacmans starting position
  pacX = 10;
  pacY = 10;
}

function draw() {
  background(0);
  stroke(0);
  noFill();
  pellets();
  eatGhosts();
  mazeDraw();
}

function mazeDraw(){
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (maze[i][j] === '1') {
        fill(0, 0, 255);  // Blue color for the walls
        rect(j * w, i * h, w, h);  // Draw the wall
      } else if (maze[i][j] === '2') { // special grid
        
      } else {
        noFill();  // Empty path, so no fill
        rect(j * w, i * h, w, h);  // Draw the empty cell
      }
    }
  }
}

//draw pellets in all empty spots where the maze is 0
function pellets() {
  fill(255);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (maze[i][j] === '0') {
        ellipse(j * w + w / 2, i * h + h / 2, w / 4, h / 4);
      }
    }
  }
}

function eatGhosts() {
  fill(255);
  for (let i = 0; i < powerUps.length; i++) {
    let power = powerUps[i];
    ellipse(power.x * w + w / 2, power.y * h + h / 2, w / 2, h / 2);
  }
}

function drawPacMan(){
  ellipse(pacX, pacY, 10, 10)
  fill(0,0,100);
}