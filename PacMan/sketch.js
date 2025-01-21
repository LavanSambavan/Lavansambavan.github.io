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
let ghostColours = ["red", "pink", "cyan", "orange"];
let ghostDirections = ["up", "down", "left", "right"];
let ghostStartX, ghostStartY;

let ghostMoveCounter = 0;
let ghostMoveInterval = 10;

//Power ups place 5 randomly
let powerUps = [
  { x: 1, y: 1 }, { x: 23, y: 1 }, { x: 4, y: 21 }, { x: 23, y: 23 }, { x: 20, y: 17 }, { x: 1, y: 6 }
];
let isPowerUpActive = false;
let powerUpTimer;

//draws the maze a 0 is empty space 1 is wall, 2 is special case for ghosts
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
  vulnerableGhost = loadImage("assets/vulnerable.png");

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
    ghosts.push(new Ghost(ghostStartX, ghostStartY, ghostColours[i]));
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
  for (let i = 0; i < powerUps.length; i++) {
    let power = powerUps[i];
    if (power && pacX === power.x && pacY === power.y) {
      //eats power up
      powerUps.splice(i, 1);
      acivatePowerUp();
      return;
    }
    //draws the remaining power ups
    if (power) {
      fill(255, 255, 0);
      ellipse(power.x * w + w / 2, power.y * h + h / 2, w / 2, h / 2);
    }
  }
}

function acivatePowerUp() {
  isPowerUpActive = true;
  //changes the ghosts to the vulnerable state
  for (let ghost of ghosts) {
    ghost.vulnerable = true;
    ghost.direction = "vulnerable"; //will use the vulnerable ghost image
  }

  clearTimeout(powerUpTimer);
  powerUpTimer = setTimeout(() => {
    deactivatePowerUp();
  }, 5000);
}

function deactivatePowerUp() {
  isPowerUpActive = false;

  //resets the ghosts to its normal state
  for (let ghost of ghosts) {
    ghost.vulnerable = false;
    ghost.direction = "up";
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
  constructor(x, y, colour) {
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.vulnerable = false;
    this.startX = x;
    this.startY = y;
    this.targetX = null;
    this.targetY = null;
    this.moveCooldown = 0;
  }

  move(pacX, pacY) {
    if (this.moveCooldown > 0) {
      this.moveCooldown--;
      return;
    }

    if (this.colour === "red") {
      this.targetX = pacX;
      this.targetY = pacY;
    }
    else if (this.colour === "pink") {
      this.targetX = pacX + 2;
      this.targetY = pacY + 2;
    }
    else if (this.colour === "cyan") {
      this.targetX = Math.max(0, pacX - 3);
      this.targetY = Math.max(0, pacY - 3);
    }
    else if (this.colour === "orange") {
      if (this.getDistance(this.x, this.y, pacX, pacY) > 5) {
        this.targetX = pacX;
        this.targetY = pacY;
      }
      else {
        this.targetX = this.startX;
        this.targetY = this.startY;
      }
    }

    let path = this.findPath(this.x, this.y, this.targetX, this.targetY);
    if (path.length > 1) {
      this.x = path[1][0];
      this.y = path[1][1];
    }

    this.moveCooldown = 10;
  }

  findPath(startX, startY, targetX, targetY) {
    let openSet = [];
    let closedSet = [];
    let startNode = { x: startX, y: startY, g: 0, h: 0, f: 0, parent: null };
    let endNode = { x: targetX, y: targetY };
    let iterationLimit = 1000;

    openSet.push(startNode);

    while (openSet.length > 0 && iterationLimit > 0) {
      iterationLimit--;

      let currentNode = openSet.reduce((a, b) => (a.f < b.f ? a : b));

      if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
        return this.reconstructPath(currentNode);
      }

      openSet = openSet.filter(node => node !== currentNode);
      closedSet.push(currentNode);

      let neighbours = this.getNeighbours(currentNode.x, currentNode.y);
      for (let neighbour of neighbours) {
        if (closedSet.some(node => node.x === neighbour.x && node.y === neighbour.y)) {
          continue;
        }

        let gScore = currentNode.g + 1;
        let neighbourNode = openSet.find(node => node.x === neighbour.x && node.y === neighbour.y);

        if (!neighbourNode) {
          neighbourNode = { x: neighbour.x, y: neighbour.y, g: gScore, h: this.getDistance(neighbour.x, neighbour.y, endNode.x, endNode.y), f: 0, parent: currentNode };
          neighbourNode.f = neighbourNode.g + neighbourNode.h;
          openSet.push(neighbourNode);
        }
        else if (gScore < neighbourNode.g) {
          neighbourNode.g = gScore;
          neighbourNode.f = neighbourNode.g + neighbourNode.h;
          neighbourNode.parent = currentNode;
        }
      }
    }
    //console.error("Path not found within iteration limit");
    return [];
  }

  reconstructPath(node) {
    let path = [];
    while (node) {
      path.unshift([node.x, node.y]);
      node = node.parent;
    }
    return path;
  }

  getNeighbours(x, y) {
    let neighbours = [];
    if (this.canMove(x - 1, y)) {
      neighbours.push({ x: x - 1, y: y });
    }
    if (this.canMove(x + 1, y)) {
      neighbours.push({ x: x + 1, y: y });
    }
    if (this.canMove(x, y - 1)) {
      neighbours.push({ x: x, y: y - 1 });
    }
    if (this.canMove(x, y + 1)) {
      neighbours.push({ x: x, y: y + 1 });
    }
    return neighbours;
  }

  canMove(x, y) {
    return maze[y] && maze[y][x] !== '1';
  }

  getDistance (x1, y1, x2, y2){
    return Math.abs(x1 - x2) + Math.abs(y1-y2);
  }
  display() {
    imageMode(CENTER);
    let ghostImage;
    if (this.vulnerable) {
      ghostImage = vulnerableGhost;
    }
    else {
      ghostImage = ghostImages[this.colour + "_" + this.direction];
    }
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
  for (let ghost of ghosts) {
    ghost.move(pacX, pacY);
  }
}



function ghostHitPacman() {
  for (let ghost of ghosts) {
    if (pacX === ghost.x && pacY === ghost.y) {
      if (isPowerUpActive && ghost.vulnerable) {
        // Eats the ghost
        score += 10;
        ghost.x = ghostStartX;
        ghost.y = ghostStartY;
        ghost.vulnerable = false;
      }
      else if (!isPowerUpActive) {
        noLoop();
        fill(255, 0, 0);
        textSize(48);
        text("Game Over!", width / 2 - 100, height / 2);
      }
    }
  }
}

function displayScore() {
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
}


