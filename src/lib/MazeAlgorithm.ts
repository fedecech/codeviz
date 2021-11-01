import { Algorirthm } from "./Algorithm";
import { Grid } from "./Grid";
import { Node } from "./Node";
import { Pair } from "./Pair";

export abstract class MazeAlgorithm extends Algorirthm {
  abstract solve(grid: Grid, startNode: Node, endNode: Node): Pair<Node[]>;

  animate(visistedNodes: Node[], _: Node[], speed: number): void {
    for (let i = 0; i < visistedNodes.length; i++) {
      const v = visistedNodes[i];
      setTimeout(() => {
        const node_el = document.getElementById(v.toKey());
        if (node_el) node_el.classList.add("wall-animated");
      }, i * speed);
    }
  }
}
