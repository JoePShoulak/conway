let grid;

const ageBreak = 50;

function drawCell(cell) {
  const w = width / grid.width;
  const h = height / grid.height;

  const c1 = color("green");
  const c2 = color("blue");
  const c3 = color("purple");

  let cellColor;

  if (cell.alive) {
    if (cell.age < ageBreak) {
      cellColor = lerpColor(c1, c2, cell.age / ageBreak);
    } else {
      cellColor = lerpColor(c2, c3, (cell.age - ageBreak) / ageBreak);
    }
  } else {
    cellColor = "white";
  }

  fill(cellColor);
  rect(cell.x * w, cell.y * h, w, h);
}

function drawGrid(grid) {
  grid.array.forEach((row) => row.forEach((cell) => drawCell(cell)));
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(20);

  frameRate(10);

  grid = new Grid(50, 50);
  drawGrid(grid);
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function draw() {
  grid.array.forEach((row) => row.forEach((cell) => cell.update(drawCell)));
}
