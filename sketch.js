let grid;

function drawCell(cell) {
  const w = width / grid.width;
  const h = height / grid.height;

  let cellColor;

  const c1 = color("green");
  const c2 = color("blue");
  const c3 = color("purple");

  if (cell.alive) {
    if (cell.age < 50) {
      cellColor = lerpColor(c1, c2, cell.age / 50);
    } else {
      cellColor = lerpColor(c2, c3, (cell.age - 50) / 50);
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
  grid.array.forEach((row) => {
    row.forEach((cell) => cell.update(drawCell));
  });
}
