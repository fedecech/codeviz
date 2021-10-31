import { Grid } from "./Grid";
import { Node } from "./Node";
import { Pair } from "./Pair";

export abstract class Algorirthm {
  abstract solve(grid: Grid, startNode: Node, endNode: Node): Pair<Node[]>;

  abstract animate(
    visistedNodes: Node[],
    shortestPath: Node[],
    speed: number
  ): void;
}
