import { Node } from "../Node";
import { Pair } from "./BFS";

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
}
