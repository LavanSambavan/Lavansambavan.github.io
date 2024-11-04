// Recaman Sequence
// Mr. Scott
// Nov 14, 2023
// OOP Practice + Interesting Number Sequence + lerp(), dynamic scaling

// Rules for the Sequence:
//
// Start at zero.
// Every step you take will be 1 bigger than the last step you took.
// If it’s possible to step backward (negatively), do so. Otherwise step forward.
// Backward steps are only allowed if the resulting location is positive (greater than zero) 
//      and if we’ve never been to that number before.
//
// Start of the sequence:  0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10...
// let cX = 0;

let sequence = []; // Array to hold the Recaman numbers
let stepAmount = 1;  // How much the next step will be by
let currentValue = 0; // most recent number in the sequence.

let largest = 0;  let scaleAmount = 0;  //dynamic scaling
let arcList = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);     noFill();
}

function addToSequence(){
  //generate the next number in the Recaman Sequence
  let backwards = currentValue - stepAmount;
  if(backwards > 0 && !sequence.includes(backwards)){
    //do some drawing stuff here...
    arcList.push(new rArc(currentValue,backwards, sequence.length%2));
    sequence.push(backwards);
    currentValue = backwards;
    stepAmount++;
  }
  else{  //next number is forward instead
    let forwards = currentValue + stepAmount;
    //do some drawing stuff here...
    arcList.push(new rArc(currentValue,forwards, sequence.length%2));
    sequence.push(forwards);
    currentValue = forwards;
    stepAmount++;
    if(currentValue > largest) largest = currentValue;
  }


}

function draw() {
 background(0);
 translate(0,height/2);
 addToSequence();
 scaleAmount = lerp(scaleAmount,width/largest,0.05);  
 scale(scaleAmount);
 renderArcs();
}

function renderArcs(){
  //loop through our list of arcs and display
  for(let r of arcList){
    r.display();
  }
}

class rArc{
  constructor(start, end, direction){
    this.start = start;   this.end = end;
    this.direction = direction;  //0- forward:  upper arc
  }                               //1- backward:  lower arc
  display(){
    let diameter = abs(this.start - this.end);
    let x = (this.start + this.end) / 2; //centerpoint
    strokeWeight(0.5);
    if(this.direction===0){ //forward(upper)
      arc(x,0,diameter,diameter,0,PI);
    }
    else{ //backward(lower)
      arc(x,0,diameter,diameter,PI,0);
    }
  }
}