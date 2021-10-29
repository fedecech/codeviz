import { IPoint } from "./../lib/Grid";
import { Grid } from "../lib/Grid";
import combine from "zustand";
// import { ENodeType } from "src/lib/Node";

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
      const vels = document.querySelectorAll(".visited");

      for (let i = 0; i < vels.length; i++) {
        const element = vels[i];
        element.classList.remove("visited");
      }
      const sel = document.querySelectorAll(".shortest-path");
      for (let i = 0; i < sel.length; i++) {
        const element = sel[i];
        element.classList.remove("shortest-path");
      }

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
