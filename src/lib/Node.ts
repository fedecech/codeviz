import { IPoint } from "./Grid";

interface INodeConstructor {
  coords: IPoint;
  type: ENodeType;
}

export enum ENodeType {
  Normal = "normal",
  Wall = "wall",
  Start = "start",
  End = "end",
}

export class Node {
  row: number;
  col: number;
  visited: boolean;
  type: ENodeType;
  distance: number;
  previous: Node | null;

  constructor({ coords, type }: INodeConstructor) {
    this.visited = false;
    this.row = coords.row;
    this.col = coords.col;
    this.type = type;
    this.distance = Infinity;
    this.previous = null;
  }
  static fromString(str: string) {
    const arr = str.split("-");
    const row = parseInt(arr[0]);
    const col = parseInt(arr[1]);
    return new Node({ coords: { row, col }, type: ENodeType.Normal });
  }

  toKey() {
    return `${this.row}-${this.col}`;
  }

  setVisited(v: boolean) {
    this.visited = v;
  }

  isWall() {
    return this.type === ENodeType.Wall;
  }

  toggleIsWall() {
    if (this.type === ENodeType.Wall) this.type = ENodeType.Normal;
    else this.type = ENodeType.Wall;
  }

  setToStartNode() {
    this.type = ENodeType.Start;
  }

  setToNormalNode() {
    this.type = ENodeType.Normal;
    return this;
  }

  setToEndNode() {
    this.type = ENodeType.End;
  }

  isType(type: ENodeType) {
    return this.type === type;
  }

  equals(other: Node) {
    return this.row === other.row && this.col === other.col;
  }
}
