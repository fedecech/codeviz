import { Grid } from "../Grid";
import { ENodeType, Node } from "../Node";
import { Pair } from "../Pair";
import { MazeAlgorithm } from "./../MazeAlgorithm";

enum Orientation {
  Vertical,
  Horizontal,
}

export class RecursiveDivision extends MazeAlgorithm {
  solve(grid: Grid, startNode: Node, endNode: Node): Pair<Node[]> {
    const width = grid.getWidth();
    const height = grid.getHeight();
    let walls: Node[] = [];

    if (width < 1 || height < 1) return new Pair<Node[]>([], walls);
    walls =
      this.solveRecursive(
        grid,
        0,
        0,
        width,
        height,
        this.orientation(width, height),
        walls
      ) || [];

    return new Pair<Node[]>([], walls);
  }

  solveRecursive(
    grid: Grid,
    x: number,
    y: number,
    width: number,
    height: number,
    orientation: Orientation,
    walls: Node[]
  ): Node[] {
    console.log(width, height);
    if (width < 2 || height < 2) return walls;

    const isHoriz = orientation === Orientation.Horizontal;

    let wx = x + (isHoriz ? 0 : Math.floor(Math.random() * (width - 1)));

    let wy = y + (isHoriz ? Math.floor(Math.random() * (height - 1)) : 0);

    const px = wx + (isHoriz ? Math.floor(Math.random() * width - 1) : 0);
    const py = wy + (isHoriz ? 0 : Math.floor(Math.random() * height - 1));

    const lenght = isHoriz ? width : height;
    const dx = isHoriz ? 1 : 0;
    const dy = isHoriz ? 0 : 1;

    for (let i = 0; i < lenght; i++) {
      if (wx !== px || wy !== py) {
        console.log(wy, wx);
        const node = grid.nodeAt({ row: wy, col: wx });
        if (
          !node.isType(ENodeType.Start) &&
          !node.isType(ENodeType.End) &&
          !node.isWall()
        ) {
          //   node.setToWall();
          walls.push(node);
        }
        wx += dx;
        wy += dy;
      }
    }

    let nx = x;
    let ny = y;
    let w = isHoriz ? width : wx - x + 1;
    let h = isHoriz ? wy - y + 1 : height;
    this.solveRecursive(grid, nx, ny, w, h, this.orientation(w, h), walls);

    nx = isHoriz ? x : wx + 1;
    ny = isHoriz ? wy + 1 : y;
    w = isHoriz ? width : x + width - wx - 1;
    h = isHoriz ? y + height - wy - 1 : height;

    return this.solveRecursive(
      grid,
      nx,
      ny,
      w,
      h,
      this.orientation(w, h),
      walls
    );
  }

  orientation(width: number, height: number) {
    if (width < height) return Orientation.Horizontal;
    else if (height < width) return Orientation.Vertical;
    else
      return Math.round(Math.random()) === 0
        ? Orientation.Vertical
        : Orientation.Horizontal;
  }
}
