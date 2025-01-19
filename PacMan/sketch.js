// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let rows = 25;
let cols = 25;
let w, h;
let currentDirection; // allows me to move pacman in a certain direcetion
let moveCounter = 0; // counter that tracks frames for movement
let moveInterval = 10; // moves every n amount of frames
let score = 0;

//global varaibles for pacman

let pacX, pacY;  // pacmans position
let pacman; //pacman image
let pacmanOpen, pacmanHalfOpen, pacmanClosed; //mouth open for pacman

//ghosts
let ghosts = [];
let ghostImages = {};
let ghostColours = ["red", "cyan", "orange", "pink"];
let ghostDirections = ["up", "down", "left", "right"];
let ghostStartX, ghostStartY;

let ghostMoveCounter = 0;
let ghostMoveInterval = 10;
//Power ups place 5 randomly
let powerUps = [
  { x: 1, y: 1 }, { x: 23, y: 1 }, { x: 4, y: 21 }, { x: 23, y: 23 }, { x: 20, y: 17 }, { x: 1, y: 6 }
];
let maze = [
  "1111111111111111111111111", //1
  "1000000000100000000000001", //2
  "1011011110101111011111101",  //3
  "1001011110101111011110101",  //4
  "1111000000000000000000101",   //5
  "1111111011111111111011101",  //6
  "1000000000000001111011101",  //7
  "1101111111110101000000001", //8
  "1100011111110101011011111", //9
  "1111010000000000011000011", //10
  "1110010101112111011011011", //11
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

function preload() {
  pacmanOpen = loadImage("assets/open.png");
  pacmanClosed = loadImage("assets/closed.png");
  pacmanHalfOpen = loadImage("assets/openmouth.png");

  for (let colour of ghostColours) {
    for (let direction of ghostDirections) {
      let imagePath = "assets/ghost_" + colour + "_" + direction + ".png";
      ghostImages[colour + "_" + direction] = loadImage(imagePath,
        function () {
          console.log("Image loaded:", imagePath);
        },
        function (err) {
          console.error("Error loading image:", imagePath, err);
        }
      );
      //console.log(Object.keys(ghostImages));
    }
  }
}

function allGhostImagesLoaded() {
  for (let key in ghostImages) {
    if (!ghostImages[key]) {
      return false;
    }
  }
  return true;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNER);
  w = width / cols;
  h = height / rows;

  //pacmans starting position
  pacX = 1;
  pacY = 1;

  //ghosts starting position
  ghostStartX = 12;
  ghostStartY = 12;

  for (let i = 0; i < ghostColours.length; i++) {
    let random = (i < 2);
    ghosts.push(new Ghost(ghostStartX, ghostStartY, ghostColours[i], random));
  }
}

function draw() {
  background(0);
  stroke(0);
  noFill();
  pellets();
  eatGhostsPowerup();
  mazeDraw();
  drawPacMan();
  movePacman();
  displayScore();
  drawGhosts();
  moveGhosts();
  ghostHitPacman();
  allGhostImagesLoaded();
}

function mazeDraw() {
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

function eatGhostsPowerup() {
  fill(255);
  for (let i = 0; i < powerUps.length; i++) {
    let power = powerUps[i];
    ellipse(power.x * w + w / 2, power.y * h + h / 2, w / 2, h / 2);
  }
}

//PACMAN CODE STARTS HERE

function drawPacMan() {
  push(); // save the current drawing state

  // translate 
  translate(pacX * w + w / 2, pacY * h + h / 2);

  //rotates based on the current direction
  if (currentDirection === "right") {
    rotate(0); // default position, facing right
  }
  else if (currentDirection === "left") {
    rotate(PI); // rotates 180 degrees
  }
  else if (currentDirection === "up") {
    rotate(-HALF_PI); // rotates 90 degrees counter clockwise
  }
  else if (currentDirection === "down") {
    rotate(HALF_PI); // rotates 90 degrees
  }

  // draw pacman
  let pacmanImage;
  if (frameCount % 30 < 10) {
    pacmanImage = pacmanOpen;
  }
  else if (frameCount % 30 < 20) {
    pacmanImage = pacmanHalfOpen;
  }
  else {
    pacmanImage = pacmanClosed;
  }

  imageMode(CENTER); // center the image
  image(pacmanImage, 0, 0, w, h);

  pop(); // restore the original drawing state
}

function keyPressed() {
  if ((keyCode === LEFT_ARROW || key === 'a') && maze[pacY][pacX - 1] !== '1') {
    currentDirection = "left";
  }

  else if ((keyCode === RIGHT_ARROW || key === 'd') && maze[pacY][pacX + 1] !== '1') {
    currentDirection = "right";
  }

  else if ((keyCode === DOWN_ARROW || key === 's') && maze[pacY + 1] && maze[pacY + 1][pacX] !== '1') {
    currentDirection = "down";
  }

  else if ((keyCode === UP_ARROW || key === 'w') && maze[pacY + 1] && maze[pacY - 1][pacX] !== '1') {
    currentDirection = "up";
  }
}

function movePacman() {
  moveCounter++;

  //move pacman if the counter reaches the interval
  if (moveCounter >= moveInterval) {
    let nextX = pacX;
    let nextY = pacY;

    if (currentDirection === "left") nextX--;
    else if (currentDirection === "right") nextX++;
    else if (currentDirection === "down") nextY++;
    else if (currentDirection === "up") nextY--;

    //checks for collisions with walls
    if (maze[nextY] && maze[nextY][nextX] !== '1') {
      //handles wrapping around to the other side
      if (nextX < 0) {
        pacX = cols; // wraps to the right side
      }
      else if (nextX >= cols) {
        pacX = -1; //wraps to the left side
      }
      else {
        pacX = nextX;
      }
      pacY = nextY;

      if (maze[nextY] && maze[nextY][nextX] === '0') {
        //Eat pellets
        maze[nextY] = maze[nextY].substring(0, nextX) + ' ' + maze[nextY].substring(nextX + 1);
        score++;
      }
    }
    moveCounter = 0;
  }
}

//GHOSTS CODE STARTS HERE                                                                              

class Ghost {
  constructor(x, y, colour, random) {
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.random = random;
    this.direction = "up";
    this.leaveJail = false;
    this.possibleDirections = ["up", "down", "left", "right"];
  }

  move() {
    let nextX = this.x;
    let nextY = this.y;

    if (!this.leaveJail && (this.colour === 'red' || this.colour === 'pink')) {
      if (this.x === 12 && this.y === 12) {
        this.direction = "up";
        nextY--;
      }
      else if (this.x === 12 && this.y === 10) {
        this.direction = "right";
        nextX++;
        this.leaveJail = true;
      }
    }
    else if (this.random) {
      if (this.hitWall(nextX, nextY) || Math.random() < 0.1) {
        let newDirection = this.chooseNewDirection(this.direction);
        if (newDirection) {
          this.direction = newDirection;
        }
      }

      if (this.direction === "left") {
        nextX--;
      }
      else if (this.direction === "right") {
        nextX++;
      }
      else if (this.direction === "down") {
        nextY++;
      }
      else if (this.direction === "up") {
        nextY--;
      }
    }

    else {
      let bestDirection = "";
      let targetX = pacX;
      let targetY = pacY;

      if (this.colour === 'cyan') {
        targetX = pacX + 2;
        targetY = pacY + 2;
      } else if (this.colour === 'orange') {
        targetX = pacX - 2;
        targetY = pacY - 2;
      }

      if (targetX > this.x) bestDirection = "right";
      if (targetX < this.x) bestDirection = "left";
      if (targetY > this.y) bestDirection = "down";
      if (targetY < this.y) bestDirection = "up";

      if (bestDirection === "left" && this.canMove(this.x - 1, this.y)) nextX--;
      if (bestDirection === "right" && this.canMove(this.x + 1, this.y)) nextX++;
      if (bestDirection === "down" && this.canMove(this.x, this.y + 1)) nextY++;
      if (bestDirection === "up" && this.canMove(this.x, this.y - 1)) nextY--;

      this.direction = bestDirection;
    }

    if (this.canMove(nextX, nextY)) {
      this.x = nextX;
      this.y = nextY;
    }
  }

  chooseNewDirection(excludeDirection) {
    let validDirections = this.possibleDirections.filter(dir => dir !== excludeDirection && this.canMoveInDirection(dir));
    if (validDirections.length > 0) {
      return validDirections[Math.floor(Math.random() * validDirections.length)];
    }
    return null;
  }

  canMoveInDirection(direction) {
    let newX = this.x;
    let newY = this.y;

    if (direction === "left") {
      newX--;
    }
    else if (direction === "right") {
      newX++;
    }
    else if (direction === "down") {
      newY++;
    }
    else if (direction === "up") {
      newY--;
    }
    return this.canMove(newX, newY);
  }

  canMove(x, y) {
    return maze[y] && maze[y][x] !== '1';
  }

  hitWall(nextX, nextY) {
    return !this.canMove(nextX, nextY);
  }

  display() {
    imageMode(CENTER);
    let ghostImage = ghostImages[this.colour + "_" + this.direction];
    if (ghostImage) {
      image(ghostImage, this.x * w + w / 2, this.y * h + h / 2, w, h);
    } else {
      console.error("Image not loaded for ", this.colour, this.direction);
    }
  }
} 

function drawGhosts() {
  if (allGhostImagesLoaded()) {
    for (let ghost of ghosts) {
      ghost.display();
    }
  }
  else {
    console.error("Not all images are loaded yet.");
  }
}

function moveGhosts() {
  ghostMoveCounter++;
  if (ghostMoveCounter >= ghostMoveInterval) {
    for (let ghost of ghosts) {
      ghost.move();
    }
    ghostMoveCounter = 0;
  }
}


function ghostHitPacman() {
  for (let ghost of ghosts) {
    if (pacX === ghost.x && pacY === ghost.y) {
      noLoop();
      fill(255, 0, 0);
      textSize(48);
      text("Game Over!", width / 2 - 100, height / 2);
    }
  }
}

function displayScore() {
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
}


