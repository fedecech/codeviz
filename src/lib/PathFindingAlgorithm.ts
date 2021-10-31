import { Algorirthm } from "./Algorithm";
import { Grid } from "./Grid";
import { Node } from "./Node";
import { Pair } from "./Pair";

export abstract class PathFindingAlgorithm extends Algorirthm {
  abstract solve(grid: Grid, startNode: Node, endNode: Node): Pair<Node[]>;

  animate(visistedNodes: Node[], shortestPath: Node[], speed: number): void {
    for (let i = 0; i <= visistedNodes.length; i++) {
      if (i === visistedNodes.length) {
        setTimeout(
          () => this.animateShortestPath(shortestPath, speed),
          speed * i
        );
        return;
      }
      const v = visistedNodes[i];
      setTimeout(() => {
        const node_el = document.getElementById(v.toKey());
        if (node_el) node_el.classList.add("visited");
      }, i * speed);
    }
  }

  private animateShortestPath(shortestPath: Node[], speed: number) {
    for (let i = 0; i < shortestPath.length; i++) {
      const v = shortestPath[i];
      setTimeout(() => {
        const node_el = document.getElementById(v.toKey());
        if (node_el) node_el.classList.add("shortest-path");
      }, i * speed);
    }
  }

  backTracePath(finalNode: Node) {
    const path: Node[] = [];
    let current = finalNode;
    let predecessor = current.predecessor;
    while (predecessor !== null) {
      path.push(predecessor);
      current = predecessor;
      predecessor = current.predecessor;
    }
    path.reverse();
    path.push(finalNode);
    return path;
  }
}
