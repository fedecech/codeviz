import { Grid } from "../Grid";
import { Node } from "../Node";
import { Pair } from "../Pair";
import { PathFindingAlgorithm } from "../PathFindingAlgorithm";

export class Dijkstra extends PathFindingAlgorithm {
  solve(grid: Grid, startNode: Node, endNode: Node): Pair<Node[]> {
    const unvisted: Map<string, number> = new Map();
    const visited = {};
    const parent = {};
    grid
      .getNodes()
      .forEach((nodes) =>
        nodes.forEach((n) => (unvisted[n.toKey()] = Infinity))
      );

    // unvisted[startNode.toKey()] = 0;

    // while (unvisted.size) {
    //   const minNode = this.getMinDistance(grid.getNeightbours(startNode));
    //   if (minNode === endNode) break;

    //   grid.getNeightbours(minNode).forEach((n) => {
    //     if (!visited[n.toKey()]) {
    //       const dist = unvisted[minNode] + unvisted[n.toKey()];
    //       if (dist < unvisted[n.toKey()]) {
    //         unvisted[n.toKey()] = dist;
    //         parent[n.toKey()] = minNode;
    //       }
    //     }
    //   });
    //   visited[minNode] = unvisted[minNode];
    //   unvisted.delete(minNode);
    // }

    return new Pair<Node[]>(Object.values(visited), Object.values(parent));
  }

  getMinDistance(nodes: Map<string, number>) {
    if (nodes.size <= 0) return;
    let min = nodes.keys()[0];

    for (const n in nodes) {
      if (n) {
        if (nodes[n] < min) min = nodes[n];
      }
    }
    return min;
  }
}
