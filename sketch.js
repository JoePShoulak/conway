const maxAge = 100;
const cellCount = 50;
const framerate = 10;
const colors = ["green", "blue", "purple"];
const deadColor = 20;

let grid;
let cellWidth, cellHeight;

function drawCell(cell) {
  const progress = cell.age / maxAge;
  const cellColor = cell.alive ? lerpColors(progress, ...colors) : deadColor;

  fill(cellColor);
  rect(cell.x * cellWidth, cell.y * cellHeight, cellWidth, cellHeight);
}

function resizeCells() {
  cellWidth = width / grid.width;
  cellHeight = height / grid.height;
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);

  resizeCells();
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(framerate);
  stroke(64);

  grid = new Grid(cellCount, cellCount);

  resizeCells();
}

function draw() {
  grid.cells.forEach((cell) => cell.update(drawCell));
}
