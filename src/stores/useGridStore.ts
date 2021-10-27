import { Grid } from "../lib/Grid";
import combine from "zustand";

interface GridState {
  grid: Grid;
  setStartNode: (grid: Grid) => void;
}

export const useIsHostStore = combine<GridState>((set) => ({
  grid: new Grid({
    rows: 20,
    cols: 50,
    start: { row: 10, col: 5 },
    end: { row: 10, col: 45 },
  }),
  setStartNode: (grid) => set({ grid }),
}));
