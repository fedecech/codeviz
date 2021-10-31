/* eslint-disable no-loop-func */
import { Grid } from "./../Grid";
import { Algorirthm } from "src/lib/algorithms/Algorithm";
import { ENodeType, Node } from "../Node";
import { Pair } from "./Pair";

export class DFS extends Algorirthm {
  solve(grid: Grid, startNode: Node, endNode: Node): Pair<Node[]> {
    const stack = [startNode];
    const visited: Map<string, Node> = new Map();
    const path = this.dfsStep(grid, stack, visited, endNode);

    return new Pair<Node[]>(Object.values(visited), path);
  }

  dfsStep(
    grid: Grid,
    stack: Node[],
    visited: Map<string, Node>,
    endNode: Node
  ): Node[] {
    const current = stack.pop();
    const path: Node[] = [];

    if (!current) return path;

    if (current?.equals(endNode)) return this.backTracePath(current);

    visited[current.toKey()] = current;
    grid.getNeightbours(current).map((n) => {
      if (!visited[n.toKey()] && !n.isType(ENodeType.Wall)) {
        n.predecessor = current;
        stack.push(n);
      }
    });

    return this.dfsStep(grid, stack, visited, endNode);
  }
}
