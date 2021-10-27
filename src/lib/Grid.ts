import { ENodeType, Node } from "./Node";

export interface IPoint {
  row: number;
  col: number;
}

interface IGridConstructor {
  rows?: number;
  cols?: number;
  nodesGrid?: Node[][];
  start?: IPoint;
  end?: IPoint;
}

export class Grid {
  internal: Node[][];

  constructor({ rows = 0, cols = 0, nodesGrid, start, end }: IGridConstructor) {
    if (nodesGrid) this.internal = nodesGrid;
    else if (rows && cols)
      this.internal = Grid.initGrid(
        rows,
        cols,
        start ? start : { row: Math.floor(rows / 2), col: 0 },
        end ? end : { row: Math.floor(rows / 2), col: cols - 1 }
      );
    else throw new Error("Need to provide costructor params");
  }

  // changeStartNode(oldStartNode: Node, newStartNode: Node){
  //   const {row, col} = oldStartNode;
  //   this.internal[row][col] = oldStartNode.setToNormalNode();
  // }

  changeNode(oldNode: Node, node: Node) {
    const { row, col } = oldNode;
    this.internal[row][col] = node;
  }

  toggleWallInNode(node: Node) {
    const { row, col } = node;
    this.internal[row][col].toggleIsWall();
    return this;
  }

  static fromInternal(nodesGrid: Node[][]) {
    return new Grid({ nodesGrid });
  }

  getNeightbours(node: Node) {
    const { row, col } = node;
    const neightbours: Node[] = [];

    console.log(this.internal.length);
    // top
    if (row > 0) neightbours.push(this.internal[row - 1][col]);

    // bottom
    if (row < this.internal.length - 1) {
      neightbours.push(this.internal[row + 1][col]);
    }

    // left
    if (col > 0) neightbours.push(this.internal[row][col - 1]);

    // right
    if (col < this.internal[row].length - 1) {
      neightbours.push(this.internal[row][col + 1]);
    }

    console.log(node);
    console.log(neightbours);

    return neightbours;
  }

  copy() {
    return Grid.fromInternal(this.internal);
  }

  static initGrid(rows: number, cols: number, start: IPoint, end: IPoint) {
    const g: Node[][] = [];

    for (let row = 0; row < rows; row++) {
      let newrow: Node[] = [];
      for (let col = 0; col < cols; col++) {
        let type: ENodeType = ENodeType.Normal;
        if (start.row === row && start.col === col) type = ENodeType.Start;
        else if (end.row === row && end.col === col) type = ENodeType.End;

        newrow.push(new Node({ coords: { row, col }, type }));
      }
      g.push(newrow);
    }

    return g;
  }
}
