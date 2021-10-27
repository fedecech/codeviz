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
  private internal: Node[][];
  private startPos: IPoint;
  private endPos: IPoint;

  constructor({ rows = 0, cols = 0, nodesGrid, start, end }: IGridConstructor) {
    const defaultStart = start ? start : { row: Math.floor(rows / 2), col: 0 };
    const defaultEnd = end ? end : { row: Math.floor(rows / 2), col: cols - 1 };
    this.startPos = defaultStart;
    this.endPos = defaultEnd;

    if (nodesGrid) this.internal = nodesGrid;
    else if (rows && cols) {
      this.internal = Grid.initGrid(
        rows,
        cols,
        start ? start : defaultStart,
        end ? end : defaultEnd
      );
    } else throw new Error("Need to provide costructor params");
  }

  getStartNode() {
    const { row, col } = this.startPos;
    return this.nodeAt({ row, col });
  }

  getEndNode() {
    const { row, col } = this.endPos;
    return this.nodeAt({ row, col });
  }

  getNodes() {
    // !exposes internal reference to obj
    return this.internal;
  }

  changeStartNodePos(newPos: IPoint) {
    const { row, col } = this.startPos;
    this.nodeAt({ row, col }).setToNormalNode();
    this.nodeAt({
      row: newPos.row,
      col: newPos.col,
    }).setToStartNode();
    this.startPos = { row: newPos.row, col: newPos.col };
    return this;
  }

  changeEndNodePos(newPos: IPoint) {
    const { row, col } = this.endPos;
    this.nodeAt({ row, col }).setToNormalNode();
    this.nodeAt({
      row: newPos.row,
      col: newPos.col,
    }).setToEndNode();
    this.endPos = { row: newPos.row, col: newPos.col };
    return this;
  }

  nodeAt({ row, col }: IPoint) {
    return this.internal[row][col];
  }

  toggleWallInNode(pos: IPoint) {
    const { row, col } = pos;
    this.internal[row][col].toggleIsWall();
    return this;
  }

  getNeightbours(node: Node) {
    const { row, col } = node;
    const neightbours: Node[] = [];

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

    return neightbours;
  }

  copy() {
    return Grid.fromInternal(this.internal, this.startPos, this.endPos);
  }

  // *********** static constructors ******************

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

  static fromInternal(nodesGrid: Node[][], start: IPoint, end: IPoint) {
    return new Grid({ nodesGrid, start, end });
  }
}
