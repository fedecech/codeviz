/* eslint-disable no-loop-func */
/* eslint-disable no-continue */
import { Grid } from "../Grid";
import { ENodeType, Node } from "../Node";
import { Pair } from "../Pair";
import { PathFindingAlgorithm } from "../PathFindingAlgorithm";

export class BFS extends PathFindingAlgorithm {
  solve(grid: Grid, startNode: Node, endNode: Node): Pair<Node[]> {
    let path: Node[] = [];
    const queue: Node[] = [startNode];
    const visited: Map<string, Node> = new Map();

    visited[startNode.toKey()] = startNode;

    while (queue.length) {
      const current = queue.shift();

      if (!current) break;
      if (current.equals(endNode)) {
        path = this.backTracePath(current);
        break;
      }

      grid.getNeightbours(current).forEach((n) => {
        if (!visited[n.toKey()] && !n.isType(ENodeType.Wall)) {
          n.predecessor = current;
          queue.push(n);
          visited[n.toKey()] = n;
        }
      });
    }

    return new Pair<Node[]>(Object.values(visited), path);
  }
}
