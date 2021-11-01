/* eslint-disable no-continue */
import { Grid } from "../Grid";
import { Node } from "../Node";
import { Pair } from "../Pair";
import { PathFindingAlgorithm } from "../PathFindingAlgorithm";

export class AStar extends PathFindingAlgorithm {
  solve(grid: Grid, startNode: Node, endNode: Node): Pair<Node[]> {
    const closed: Node[] = [];
    const open: Node[] = [startNode];
    let path: Node[] = [];

    startNode.setHCost(grid.heuristicCost(startNode, endNode));

    while (open.length) {
      // sort by fCost if a and b have different fcosts else sort by hCost
      const current = this.getMinNode(open);

      if (!current) break;

      closed.push(current);

      if (current.equals(endNode)) {
        path = this.backTracePath(endNode);
        break;
      }

      grid.getNeightbours(current).map((n) => {
        if (!n.isWall() && !this.includesNode(closed, n)) {
          const newCost = current.gCost + grid.heuristicCost(current, n);
          if (newCost < n.gCost || !this.includesNode(open, n)) {
            n.predecessor = current;
            n.gCost = newCost;
            n.hCost = grid.heuristicCost(n, endNode);
            n.fCost = n.gCost + n.hCost;

            if (!this.includesNode(open, n)) {
              open.push(n);
            }
          }
        }
      });
    }

    return new Pair<Node[]>(Object.values(closed), path);
  }

  getMinNode(nodes: Node[]) {
    let current = nodes[0];
    let indexCurrent = 0;

    if (!current) return undefined;

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (
        n.fCost <= current.fCost ||
        (n.fCost === current.fCost && n.hCost < current.hCost)
      ) {
        current = n;
        indexCurrent = i;
      }
    }

    nodes.splice(indexCurrent, 1);
    return current;
  }

  includesNode(nodes: Node[], node: Node) {
    for (const n of nodes) {
      if (n.equals(node)) return true;
    }
    return false;
  }

  addToOpen(open: Map<string, Node>, neightbour: Node) {
    for (const id in open) {
      if (id) {
        const node = open[id];
        if (node.equals(neightbour) && neightbour.gCost >= node.gCost)
          return false;
      }
    }
    return true;
  }
}
