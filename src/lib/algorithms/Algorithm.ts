import { Node } from "../Node";
import { Pair } from "./BFS";

export abstract class Algorirthm {
  abstract solve(...params: any): Pair<Node[]>;

  abstract animate(...params: any): void;
}
