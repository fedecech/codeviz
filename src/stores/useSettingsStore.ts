import { AStar } from "src/lib/pathfinding/Astar";
/* eslint-disable no-sync */
import { BFS } from "src/lib/pathfinding/BFS";
import { DFS } from "src/lib/pathfinding/DFS";
import combine from "zustand";
import { __algo_path__ } from "../lib/const";
import { PathFindingAlgorithm } from "../lib/PathFindingAlgorithm";

interface SettingState {
  algorithm: PathFindingAlgorithm;
  speed: number;
  setAlgorithm: (algo: PathFindingAlgorithm) => void;
  setSpeed: (speed: number) => void;
}

export const speeds = {
  slow: 100,
  medium: 50,
  fast: 10,
};

export const algorithms = {
  "Breath First Search": new BFS(),
  "Depth First Search": new DFS(),
  "A* search": new AStar(),
};

export const useSettingsStore = combine<SettingState>((set) => ({
  algorithm: new BFS(),
  speed: speeds.medium,
  setAlgorithm: (algorithm) => set({ algorithm }),
  setSpeed: (speed) => set({ speed }),
}));
