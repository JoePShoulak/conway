let grid;
let cellWidth, cellHeight;

const maxAge = 100;
const cellCount = 50;
const fr = 10;

function drawCell(cell) {
  const colors = [color("green"), color("blue"), color("purple")];
  const progress = cell.age / maxAge;

  const cellColor = cell.alive ? lerpColors(progress, ...colors) : "white";

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
  frameRate(fr);

  grid = new Grid(cellCount, cellCount);

  resizeCells();
}

function draw() {
  grid.cells.forEach((cell) => cell.update(drawCell));
}
