import { Algorirthm } from "./Algorithm";
import { Grid } from "./Grid";
import { Node } from "./Node";
import { Pair } from "./Pair";

export class MazeAlgorithm extends Algorirthm {
  solve(grid: Grid, startNode: Node, endNode: Node): Pair<Node[]> {
    throw new Error("Method not implemented.");
  }

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
