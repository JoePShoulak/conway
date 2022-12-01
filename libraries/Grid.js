class Cell {
  static spawnRate = 0.1;

  constructor(grid, y, x) {
    this.grid = grid;
    this.x = x;
    this.y = y;

    this.alive = Math.random() < Cell.spawnRate;
    this.age = 0;
  }

  get neighbors() {
    return this.grid.neighborsOf(this).filter((cell) => cell.alive).length;
  }

  update(cb = () => {}) {
    if (this.neighbors < 2) this.alive = false;
    else if (this.neighbors > 3) this.alive = false;
    else if (this.neighbors === 3) this.alive = true;

    this.age = this.alive ? this.age + 1 : 0;

    cb(this);
  }
}

class Grid {
  constructor(rows, cols) {
    this.width = cols;
    this.height = rows;

    this.array = Array(rows)
      .fill()
      .map((_row, i) =>
        Array(cols)
          .fill()
          .map((_cell, j) => new Cell(this, i, j))
      );
  }

  get cells() {
    return this.array.flat();
  }

  neighborsOf(cell) {
    return Array(3)
      .fill()
      .map((_, i) =>
        Array(3)
          .fill()
          .map((__, j) => [i - 1, j - 1])
      )
      .flat()
      .filter(
        ([h, w]) =>
          !(h === 0 && w === 0) &&
          h + cell.y >= 0 &&
          h + cell.y < this.array.length &&
          w + cell.x >= 0 &&
          w + cell.x < this.array[0].length
      )
      .map(([h, j]) => this.array[h + cell.y][j + cell.x]);
  }
}
