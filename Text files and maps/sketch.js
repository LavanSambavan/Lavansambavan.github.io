// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid, img, rows, cols, colorMap, textFile;
function preLoad() {
  textFile = loadStrings("assets/info.txt");
  img = loadStrings("assets/colorImage.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  processText();
  rows = img.length; cols = img[0].length;

  // now make the 2d array
  grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push([...img[i]]);
  }

  //next create a map for the coors
  colorMap = new Map([
    ["b", "black"],
    ["w", "white"],
    ["r", "sienna"],
    ["l", "peru"],
    ["p", color(150, 150, 255)]
  ])
}

function draw() {
  background(220);
  renderGrid();
}

function renderGrid(){
  // calculate the grid size
  let cellWidth = width / cols;
  let cellHeight = height / rows;

  //visit each 2d array location and visualize
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let currentKey = grid[y][x];
      fill(colorMap.get(currentKey));
      rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);

    }
  }
}

function processText() {
  // print("SPLIT INTO WORDS");
  // let splitWords = textFile[0].split(" ");
  // print(splitWords);

  // print("SPLIT INTO CHARS");
  // let splitChars = textFile[1].split(" ");
  // print(splitChars);

//   print("SPREAD into chars");
//   let spreadChars = [...textFile[2]];
//   print(spreadChars);
}