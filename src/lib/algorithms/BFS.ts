/* eslint-disable no-loop-func */
/* eslint-disable no-continue */
/* eslint-disable max-classes-per-file */
import { Grid } from "../Grid";
import { Algorirthm } from "./Algorithm";
import { ENodeType, Node } from "../Node";

export class Pair<T> {
  left: T;
  right: T;

  constructor(left: T, right: T) {
    this.left = left;
    this.right = right;
  }
}

export class BFS extends Algorirthm {
  animate(visistedNodes: Node[], shortestPath: Node[]): void {
    for (let i = 0; i <= visistedNodes.length; i++) {
      if (i === visistedNodes.length) {
        setTimeout(() => this.animateShortestPath(shortestPath), 10 * i);
        return;
      }
      const v = visistedNodes[i];
      setTimeout(() => {
        const node_el = document.getElementById(v.toKey());
        if (node_el) node_el.className = "transform scale w-7 h-7 bg-blue-500";
      }, i * 10);
    }
  }

  private animateShortestPath(shortestPath: Node[]) {
    for (let i = 0; i < shortestPath.length; i++) {
      const v = shortestPath[i];
      setTimeout(() => {
        const node_el = document.getElementById(v.toKey());
        if (node_el)
          node_el.className = "transform scale w-7 h-7 bg-yellow-500";
      }, i * 50);
    }
  }

  solve(grid: Grid, startNode: Node, endNode: Node): Pair<Node[]> {
    const path = {};
    const queue: Node[] = [startNode];
    const visited: Map<string, Node> = new Map();

    visited[startNode.toKey()] = startNode;
    path[startNode.toKey()] = null;

    let current: Node | undefined;
    while (queue.length) {
      current = queue.shift();
      if (!current || current.equals(endNode)) break;

      grid.getNeightbours(current).forEach((n) => {
        if (!visited[n.toKey()] && !n.isType(ENodeType.Wall)) {
          queue.push(n);
          visited[n.toKey()] = n;
          path[n.toKey()] = current;
        }
      });
    }

    // remove start end node for animation in more general place
    delete visited[startNode.toKey()];
    delete visited[endNode.toKey()];

    let start = current;
    const path_lst: Node[] = [];
    while (start) {
      if (start === null) break;

      path_lst.unshift(start);
      start = path[start.toKey()];
    }

    return new Pair<Node[]>(Object.values(visited), path_lst);
  }
}
