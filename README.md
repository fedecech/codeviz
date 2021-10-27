# Algorithm visualizer

## Path finding

steps:

1. keep grid in state
2. get viseted nodes
3. animate visited node by changing state (one node at time) OR just change style for each visited node (by class name)
4. get shortest path
5. animate shortest path in 2 possible way see 3

### To fix

- file: `useGridStore.ts`, find better way to reset board an adnimation;
- file: `Visualizer.tsx`, find a way to await d.animate() and set to false `isRunning`
