import { IPoint } from "./../lib/Grid";
import { Grid } from "../lib/Grid";
import combine from "zustand";
import { ENodeType } from "src/lib/Node";

interface GridState {
  grid: Grid;
  setStartNodePos: (newPos: IPoint) => void;
  setEndNodePos: (newPos: IPoint) => void;
  toggleWallNode: (pos: IPoint) => void;
  setNodeToVisited: (pos: IPoint) => void;
  resetGrid: () => void;
  resetAnimation: () => void;
}

export const useGridStore = combine<GridState>((set) => ({
  grid: new Grid({
    rows: 20,
    cols: 50,
  }),
  setStartNodePos: (newPos) =>
    set(({ grid }) => {
      return { grid: grid.changeStartNodePos(newPos) };
    }),
  setEndNodePos: (newPos) =>
    set(({ grid }) => {
      return { grid: grid.changeEndNodePos(newPos) };
    }),
  toggleWallNode: (pos) =>
    set(({ grid }) => {
      return { grid: grid.toggleWallInNode(pos) };
    }),
  setNodeToVisited: (pos) =>
    set(({ grid }) => {
      grid.nodeAt(pos).setVisited(true);
      return { grid };
    }),
  resetAnimation: () =>
    set(({ grid }) => {
      // ! find nicer way to do it
      grid.getNodes().forEach((nodes) => {
        nodes.forEach((node) => {
          const el = document.getElementById(node.toKey());
          if (el) {
            if (node.isType(ENodeType.Start))
              el.className = "w-7 h-7 bg-green-500";
            else if (node.isType(ENodeType.End))
              el.className = "w-7 h-7 bg-red-500";
            else el.className = "w-7 h-7 border";
          }
        });
      });
      return { grid };
    }),
  resetGrid: () =>
    set(({ resetAnimation }) => {
      resetAnimation();
      return {
        grid: new Grid({
          rows: 20,
          cols: 50,
        }),
      };
    }),
}));
