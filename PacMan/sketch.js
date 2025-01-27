// PacMan Capstone Project
// Lavan
// Jan 27, 2025
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
let highscore = 0;

//global varaibles for pacman

let pacX, pacY;  // pacmans position
let pacman; //pacman image
let pacmanOpen, pacmanHalfOpen, pacmanClosed; //mouth open for pacman

//ghosts
let ghosts = [];
let ghostImages = {};
let ghostColours = ["red", "pink", "cyan", "orange"];
let ghostDirections = ["up", "down", "left", "right"];
let ghostStartX = 12, ghostStartY = 12;

let ghostMoveCounter = 0;
let ghostMoveInterval = 10;

let powerUps = [
  { x: 1, y: 1 }, { x: 12, y: 4 }, { x: 23, y: 1 }, { x: 4, y: 21 }, { x: 23, y: 23 }, { x: 20, y: 17 }, { x: 1, y: 6 }
];
let isPowerUpActive = false;
let powerUpFrameStart = 0;
let powerUpDuration = 300;

//draws the maze a 0 is empty space 1 is wall, 2 is special case for ghosts
let maze = [
  "1111111111111111111111111", //1
  "1000000000000000000000001", //2
  "1011011110101111011110101",  //3
  "1011011110101111011110101",  //4
  "1000000000000000000000101",   //5
  "1111111011111111111011101",  //6
  "1000000000000001111011101",  //7
  "1011111111110101000000001", //8
  "1000011111110101011011111", //9
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

function preload() { // loads all the images for pacman
  pacmanOpen = loadImage("assets/open.png");
  pacmanClosed = loadImage("assets/closed.png");
  pacmanHalfOpen = loadImage("assets/openmouth.png");
  vulnerableGhost = loadImage("assets/vulnerable.png");

  for (let colour of ghostColours) { // loads all the images for the ghosts vulnerable and normal
    for (let direction of ghostDirections) {
      let imagePath = "assets/ghost_" + colour + "_" + direction + ".png";// normal ghosts
      ghostImages[colour + "_" + direction] = loadImage(imagePath,
        function () {
          console.log("Image loaded:", imagePath);
        },
        function (err) {
          console.error("Error loading image:", imagePath, err);
        }
      );
    }
  }

  for (let colour of ghostColours) { // vulnerable ghosts
    let imagePath = "assets/ghost_" + colour + "_vulnerable.png";
    ghostImages[colour + "_vulnerable"] = loadImage(imagePath,
      function () {
        console.log("Image vulnerable loaded:", imagePath);
      },
      function (err) {
        console.error("Error loading vulnerable image:", imagePath, err);
      }
    );
  }
}


function allGhostImagesLoaded() { // debug function
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


  for (let i = 0; i < ghostColours.length; i++) {
    ghosts.push(new Ghost(ghostStartX, ghostStartY, ghostColours[i]));
  }
}

function draw() {
  background(0);
  stroke(0);
  noFill();
  allGhostImagesLoaded();
  pellets();
  eatGhostsPowerup();
  mazeDraw();
  drawPacMan();
  movePacman();
  displayScore();
  drawGhosts();
  moveGhosts();
  ghostHitPacman();
  if (isPowerUpActive && frameCount > powerUpFrameStart + powerUpDuration) { // sets time limit for the powerup
    deactivatePowerUp();
  }
  checkWin();

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
  for (let i = 0; i < powerUps.length; i++) { // draws the amounts of powerups necessary
    let power = powerUps[i];
    if (power && pacX === power.x && pacY === power.y) {
      //eats power up
      powerUps.splice(i, 1);
      acivatePowerUp(); // activates the powerup
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
  powerUpFrameStart = frameCount; // timing limit on pwerups
  //changes the ghosts to the vulnerable state
  for (let ghost of ghosts) {
    ghost.vulnerable = true;
    ghost.direction = "vulnerable"; //will use the vulnerable ghost image
  }
}

function deactivatePowerUp() {
  isPowerUpActive = false; // deactivates the powerups

  //resets the ghosts to its normal state
  for (let ghost of ghosts) {
    ghost.vulnerable = false;
    if (ghost.direction === "vulnerable") {
      ghost.direction = "up";
    }
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
    pacmanImage = pacmanOpen; // depending on the frame it changes the costume of pacman
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

function keyPressed() { // key managements for moveemnt of pacman
  if ((keyCode === LEFT_ARROW || key === 'a') && maze[pacY][pacX - 1] !== '1') {
    currentDirection = "left";
  }

  else if ((keyCode === RIGHT_ARROW || key === 'd') && maze[pacY][pacX + 1] !== '1') {
    currentDirection = "right";
  }

  else if ((keyCode === DOWN_ARROW || key === 's') && (maze[pacY + 1] && maze[pacY + 1][pacX] !== '1') && (maze[pacY + 1] && maze[pacY + 1][pacX] !== '2')) {
    currentDirection = "down";
  }

  else if ((keyCode === UP_ARROW || key === 'w') && (maze[pacY + 1] && maze[pacY - 1][pacX] !== '1') && (maze[pacY + 1] && maze[pacY - 1][pacX] !== '2')) {
    currentDirection = "up";
  }
}

function movePacman() {
  moveCounter++;

  //move pacman if the counter reaches the interval
  if (moveCounter >= moveInterval) {
    let nextX = pacX;
    let nextY = pacY;
    // allows pacman to move
    if (currentDirection === "left") nextX--;
    else if (currentDirection === "right") nextX++;
    else if (currentDirection === "down") nextY++;
    else if (currentDirection === "up") nextY--;

    //checks for collisions with walls
    if (maze[nextY] && maze[nextY][nextX] !== '1' && maze[nextY][nextX] !== '2') {
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

// My dad helped with ghost movements since I couldnt get it to work on my own, He showed me how to use a
// pathfinding algorithm for the ghosts to find the shortest path to Pacman
class Ghost {
  /* x,y : current position of the ghost
     colour: color of the ghost
     vulenerable: indicates if the ghost can be consumed by pacman
     startX, startY: starting position of the ghost
     targetX, targetY: target position of the ghost
     moveCoolDown: delay induced between moves to control the ghost's speed
  */
  constructor(x, y, colour) {
    // Initialization
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
    //Move the ghost towards pacman based on its colour and pacman's position
    

    // If the ghost is in cooldown, decrement the cooldown counter
    if (this.moveCooldown > 0) {
      this.moveCooldown--;
      return;
    }

    // Set the target position of the ghost base on the colour
    if (this.colour === "red") { // Red direct chase path to pacman

      this.targetX = pacX;
      this.targetY = pacY;
    }
    else if (this.colour === "pink") { // Pink moves slightly ahead of pacman
      this.targetX = pacX + 1;
      this.targetY = pacY;
    }
    else if (this.colour === "cyan") { // Cyan moves to a position slightly behind packman
      this.targetX = Math.max(0, pacX - 3);
      this.targetY = Math.max(0, pacY - 3);
    }
    else if (this.colour === "orange") {
      if (this.getDistance(this.x, this.y, pacX, pacY) > 5) { // Orange chases pacman if far away otherwise returns to its starting position
        this.targetX = pacX;
        this.targetY = pacY;
      }
      else {
        this.targetX = this.startX;
        this.targetY = this.startY;
      }
    }

    // Find the path to the target position
    let path = this.findPath(this.x, this.y, this.targetX, this.targetY);

    // move to the next position in the path if available
    if (path.length > 1) {
      let nextX = path[1][0];
      let nextY = path[1][1];

      // Determine the move direction
      if (nextX > this.x) {
        this.direction = "right";
      }
      else if (nextX < this.x) {
        this.direction = "left";
      }
      else if (nextY > this.y) {
        this.direction = "down";
      }
      else if (nextY < this.y) {
        this.direction = "up";
      }

      // Update the ghost position
      this.x = nextX;
      this.y = nextY;
    }

    // reset the move cool down counter
    this.moveCooldown = 10;
  }

  findPath(startX, startY, targetX, targetY) {
    /*
     Finds the path from ghost's current position to the target position using pathfinding algorithm
      g score ( Cost to reach the node from the start)
      h score ( Estimated cost from the node to the target)
      f score ( Total Esitmated cost (g+h))

      openSet: contains the cells/positions to be evaluated
      closedSet: contains the evaluated cells
      startPosition: defines the starting position
      endPosition: defines the target position
      iterationLimit: controls the number of iterations, thus preventing the infinite loop
    */
    let openSet = [];
    let closedSet = [];
    let startPosition = { x: startX, y: startY, g: 0, h: 0, f: 0, parent: null };
    let endPosition = { x: targetX, y: targetY };
    let iterationLimit = 1000;

    // Add the starting position to the openSet, to evaluate
    openSet.push(startPosition);

    // Path finding loop
    while (openSet.length > 0 && iterationLimit > 0) {
      iterationLimit--;

      // Find the position with the lowest f score
      let currentPosition = openSet.reduce((a, b) => (a.f < b.f ? a : b));

      // If the current position is the target, reconstruct the path
      if (currentPosition.x === endPosition.x && currentPosition.y === endPosition.y) {
        return this.reconstructPath(currentPosition);
      }

      // Move the current position from the open set to the closed set
      openSet = openSet.filter(node => node !== currentPosition);
      closedSet.push(currentPosition);

      // Get the neighbouring positions
      let neighbours = this.getNeighbours(currentPosition.x, currentPosition.y);
      for (let neighbour of neighbours) {
        if (closedSet.some(cell => cell.x === neighbour.x && cell.y === neighbour.y)) {
          continue;
        }

        // Calculate the gscore for the neighbour
        let gScore = currentPosition.g + 1;
        let neighbourPosition = openSet.find(cell => cell.x === neighbour.x && cell.y === neighbour.y);

        // If the neighbour is not in the open set add it.
        if (!neighbourPosition) {
          neighbourPosition = { x: neighbour.x, y: neighbour.y, g: gScore, h: this.getDistance(neighbour.x, neighbour.y, endPosition.x, endPosition.y), f: 0, parent: currentPosition };
          neighbourPosition.f = neighbourPosition.g + neighbourPosition.h;
          openSet.push(neighbourPosition);
        }
        else if (gScore < neighbourPosition.g) {
          // If the new path to the neighbour is shorter, update its g and f scores and parent
          neighbourPosition.g = gScore;
          neighbourPosition.f = neighbourPosition.g + neighbourPosition.h;
          neighbourPosition.parent = currentPosition;
        }
      }
    }

    // Return an empty path if no path was found
    return [];
  }

  reconstructPath(position) {
    // Reconsturcts the path from the target position back to the start position
    // using the parent positions, starting from target and builds the path in reverse order
    let path = [];
    while (position) {
      path.unshift([position.x, position.y]);
      position = position.parent;
    }
    return path;
  }

  getNeighbours(x, y) {
    // Finds the neighbouring position the ghost can move to, 
    // by checking the positions, up, down, left and right and
    // add them to the list if they can make a valid move.
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
    // Check if the ghost can move to the given position
    return maze[y] && maze[y][x] !== '1';
  }

  getDistance(x1, y1, x2, y2) {
    // Calculate the distance between two given positions
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  display() {
    // Display the appropriate ghost image on the screen
    imageMode(CENTER);
    let ghostImage;
    if (this.vulnerable) { // if the ghost is vulnerable it displays the vulnerable images
      ghostImage = ghostImages[this.colour + "_vulnerable"];
    }
    else {
      ghostImage = ghostImages[this.colour + "_" + this.direction]; // if the ghosts are normal displays the normal images
    }
    if (ghostImage) {
      image(ghostImage, this.x * w + w / 2, this.y * h + h / 2, w, h); // size for yhe ghosts
    } else {
      console.error("Image not loaded for ", this.colour, this.direction); // debugging since some images wouldnt load
    }
  }
}

function drawGhosts() {
  // Draw all ghosts
  if (allGhostImagesLoaded()) {
    for (let ghost of ghosts) {
      ghost.display();
    }
  }
  else { // checks that all ghosts are loaded a debug 
    console.error("Not all images are loaded yet.");
  }
}

function moveGhosts() { // allows the ghosts to move
  for (let ghost of ghosts) {
    ghost.move(pacX, pacY);
  }
}



function ghostHitPacman() {
  for (let ghost of ghosts) {
    if (pacX === ghost.x && pacY === ghost.y) { // if ghost touches a ghost so is on the same block as the ghost
      if (isPowerUpActive && ghost.vulnerable) { // and if the ghosts can be eaten so set to vulnerable
        // Eats the ghost
        score += 10; //increases the score by 10
        ghost.x = ghostStartX; // ghost teleports back tio the jail
        ghost.y = ghostStartY;
        ghost.vulnerable = false; //sets the vulnerability to false so the ghost can kill you again
        if (ghost.direction === "vulnerable") {
          ghost.direction = "up";
        }
      }
      else if (!isPowerUpActive) {
        noLoop(); // if the ghosts arents vulnerable and the ghost hits pacman then you lose
        fill(255, 0, 0);
        textSize(48);
        text("Game Over!", width / 2 - 100, height / 2);
      }
    }
  }
}

function displayScore() { // shows the score that you have 
  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
}

function checkWin() { // checks if all pellets are eaten if so it prints you win on the screen
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (maze[i][j] === '0') {
        return false;
      }
    }
  }
  noLoop();
  fill(255, 255, 0);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("You Win!", width / 2, height / 2);
}

