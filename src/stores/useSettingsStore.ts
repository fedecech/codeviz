import { AStar } from "src/lib/algorithms/Astar";
/* eslint-disable no-sync */
import { Algorirthm } from "src/lib/Algorithm";
import { BFS } from "src/lib/algorithms/BFS";
import { DFS } from "src/lib/algorithms/DFS";
import combine from "zustand";
import { __algo_path__ } from "../lib/const";

interface SettingState {
  algorithm: Algorirthm;
  speed: number;
  setAlgorithm: (algo: Algorirthm) => void;
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
