import { Node } from "../Node";
import { Pair } from "./Pair";

export abstract class Algorirthm {
  abstract solve(...params: any): Pair<Node[]>;

  animate(visistedNodes: Node[], shortestPath: Node[]): void {
    for (let i = 0; i <= visistedNodes.length; i++) {
      if (i === visistedNodes.length) {
        setTimeout(() => this.animateShortestPath(shortestPath), 10 * i);
        return;
      }
      const v = visistedNodes[i];
      setTimeout(() => {
        const node_el = document.getElementById(v.toKey());
        if (node_el) node_el.className += " visited";
      }, i * 10);
    }
  }

  private animateShortestPath(shortestPath: Node[]) {
    for (let i = 0; i < shortestPath.length; i++) {
      const v = shortestPath[i];
      setTimeout(() => {
        const node_el = document.getElementById(v.toKey());
        if (node_el) node_el.className += " shortest-path";
      }, i * 50);
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
    path.push(finalNode);
    return path.reverse();
  }
}
