class Cell {
  static spawnRate = 1 / 10;

  constructor(grid, y, x) {
    this.x = x;
    this.y = y;
    this.alive = Math.random() < Cell.spawnRate;
    this.age = 0;
    this.grid = grid;
  }

  update(cb = () => {}) {
    const livingNeighbors = this.grid
      .neighborsOf(this)
      .filter((cell) => cell.alive).length;

    if (livingNeighbors < 2) this.alive = false;
    if (livingNeighbors > 3) this.alive = false;
    if (livingNeighbors === 3) this.alive = true;

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

  neighborsOf(cell) {
    let v = Array(9)
      .fill()
      .map((_, i) => {
        const off = i % 3;
        return [off - 1, (i - off) / 3 - 1];
      })
      .filter((x) => !(x[0] === 0 && x[1] === 0));

    return v
      .filter(
        ([h, j]) =>
          h + cell.y >= 0 &&
          h + cell.y < this.array.length &&
          j + cell.x >= 0 &&
          j + cell.x < this.array[0].length
      )
      .map(([h, j]) => this.array[h + cell.y][j + cell.x]);
  }
}
