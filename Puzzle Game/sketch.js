// Puzzle Game
// Lavan
// November 28 2024


//Global variables

let NUM_ROWS = 4; //number of rows on the grid
let NUM_COLS = 5; // number of colums on the grid
let rectWidth, rectHeight;
let currentRow, currentCol; // current column and row
let gridData = [[0, 0, 0, 0, 0],
[0, 0, 0, 0, 0],
[0, 255, 0, 0, 0],
[255, 255, 255, 0, 0]];
//sets it to the cross pattern to start and allows me to change from cross to square
let crossPattern = true;


function setup() {
  // Determine the size of each square. Could use windowHeight,windowHeight  for Canvas to keep a square aspect ratio
  createCanvas(windowWidth, windowHeight);
  rectWidth = width / NUM_COLS;
  rectHeight = height / NUM_ROWS;
  randomize();
}
// function to let me randomize my grid flipping different squares each time the game starts
function randomize() {
  // goes through each square on the grid
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      //randomly assigns a value of 0 or 255
      gridData[row][col] = random(1) > 0.5 ? 255 : 0;
    }
  }
}

function draw() {
  background(220);
  //figure out which tile the mouse cursor is over
  determineActiveSquare();
  //render the current game board to the screen displays the win message when you win and calls the overlay function
  drawGrid();
  if (checkWin()) {
    winMessage();
  }
  overlay(mouseX, mouseY);
}


// the cheater cheater code
function mousePressed() {
  //flips the current cell only
  if (keyIsDown(SHIFT)) {
    flip(currentCol, currentRow);
  }
  //when crosspattern is true it flips cells in a cross pattern
  else if (crossPattern) {
    flip(currentCol, currentRow);
    flip(currentCol - 1, currentRow);
    flip(currentCol + 1, currentRow);
    flip(currentCol, currentRow - 1);
    flip(currentCol, currentRow + 1);
  }
  //when crosspattern is false it flips cells in a square pattern
  else {
    flip(currentCol, currentRow);
    flip(currentCol + 1, currentRow);
    flip(currentCol, currentRow + 1);
    flip(currentCol + 1, currentRow + 1);
  }
}


function flip(col, row) {
  // given a column and row for the 2D array, flip its value from 0 to 255 or 255 to 0
  // conditions ensure that the col and row given are valid and exist for the array. If not, no operations take place.
  if (col >= 0 && col < NUM_COLS) {
    if (row >= 0 && row < NUM_ROWS) {
      if (gridData[row][col] === 0) gridData[row][col] = 255;
      else gridData[row][col] = 0;
    }
  }
}

function keyPressed() {
  //allows me to switch from crosspattern to a square pattern when spacebar is clicked by setting the variable crosspattern to false
  if (key === ' ') {
    crossPattern = !crossPattern;
  }
}


function checkWin() {
  //stores the value of the top left cell
  let firstValue = gridData[0][0];
  //checks if the current cell is the same colour as your variable firstValue
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      //if any cell doesnt match firstValue it returns false
      if (gridData[row][col] !== firstValue) {
        return false;
      }
    }
  }
  //returns true when all cells are the same colour
  return true;
}

function winMessage() {
  //displays the win message
  textSize(30);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  text("You Win!", width / 2, height / 2);

}


function determineActiveSquare() {
  // An expression to run each frame to determine where the mouse currently is.
  currentRow = int(mouseY / rectHeight);
  currentCol = int(mouseX / rectWidth);
}

function drawGrid() {
  // Render a grid of squares - fill color set according to data stored in the 2D array
  stroke(1)
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      fill(gridData[y][x]);
      rect(x * rectWidth, y * rectHeight, rectWidth, rectHeight);
    }
  }
}


//highlights the cells that the current pattern is meant to flip
function overlay(x, y) {
  fill(255, 0, 0, 50);
  noStroke();

  //highlights the crosspattern when its true
  if (crossPattern) {
    highlightOverlay(currentCol, currentRow);
    highlightOverlay(currentCol - 1, currentRow);
    highlightOverlay(currentCol + 1, currentRow);
    highlightOverlay(currentCol, currentRow - 1);
    highlightOverlay(currentCol, currentRow + 1);
  }
  //highlights a square when crosspattern is false
  else {
    highlightOverlay(currentCol, currentRow);
    highlightOverlay(currentCol + 1, currentRow);
    highlightOverlay(currentCol, currentRow + 1);
    highlightOverlay(currentCol + 1, currentRow + 1);
  }
}


function highlightOverlay(col, row) {
  //allows to highlight a specific cell
  if (col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS) {
    rect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);
  }
}


