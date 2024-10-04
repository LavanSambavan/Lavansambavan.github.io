// Workinh with images
// Lavan
// Octobre 4, 2024

let lionL, lionR;
let facingRight;
let pinImages = [];  //empty array
currentFrame = 0;

function preload(){
  //runs before setup, waits for loading to computer
  lionL = loadImage("assets/lion-left.png");
  lionR = loadImage("assets/lion-right.png");
  for(let i = 0; i < 9; i++){
    pinImages.push(loadImage("assets/pin-0" + i + ".png"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  updateDirection();

  //pinwheel  code here...
  image(pinImages[currentFrame], width/2, height/2)
  currentFrame++;
  if(currentFrame > 8){
    currentFrame = 0;
  }

  //lion code starts here...
  
  if (facingRight){
    image(lionR, mouseX, mouseY, lionR.width/2, lionR.height/2);
  }
  else{
    image(lionL,mouseX, mouseY, lionL.width/2, lionL.height/2);
  }
  
}

function updateDirection(){
  //look mouse movement and update facingRight
  if (mouseX > pmouseX) facingRight = true;
  else if(mouseX < pmouseX) facingRight = false;
}
