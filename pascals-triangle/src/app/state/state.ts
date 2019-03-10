export class Cell {
  left: Cell;
  right: Cell;
  value: number;
}

export class State {
  triangle: Cell[][];
  private _height: number;
  private _seed: number;
  duration: number;

  get seed() {
    return this._seed;
  }

  set seed(s: number) {
    this._seed = s;
    this.calculate();
  }

  get height() {
    return this._height;
  }

  set height(h: number) {
    this._height = h;
    this.calculate();
  }

  constructor(height: number, seed: number) {
    this.height = height;
    this.seed = seed;
    this.triangle = new Array<Array<Cell>>();
    for (let row = 0; row < height; row++) {
      this.triangle.push(new Array<Cell>());
      for (let col = 0; col <= row; col++) {
        const c = new Cell();
        if (row > 0) {
          if (col > 0) {
            c.left = this.triangle[row - 1][col - 1];
          }
          if (col < row) {
            c.right = this.triangle[row - 1][col];
          }
        }
        this.triangle[row].push(c);
      }
    }
    this.calculate();
  }

  public calculate(): void {
    if (this.triangle) {
      const t0 = performance.now();

      for (let row = 0; row < this.triangle.length; row++) {
        for (let col = 0; col <= row; col++) {
          const c = this.triangle[row][col];
          if (!c.left || !c.right) {
            c.value = this.seed;
          } else {
            c.value = c.left.value + c.right.value;
          }
        }
      }
      const t1 = performance.now();
      this.duration = Math.round(1000 * (t1 - t0)) / 1000;
    }
  }
}
