# Algorithm visualizer

## Path finding

steps:

1. keep grid in state
2. get viseted nodes
3. animate visited node by changing state (one node at time) OR just change style for each visited node (by class name)
4. get shortest path
5. animate shortest path in 2 possible way see 3

### To fix

- !IMPORTANT store dom element in Node class instance and use that to change start/end Node and animate
- file: `useGridStore.ts`, find better way to reset board an adnimation;
- file: `Visualizer.tsx`, find a way to await d.animate() and set to false `isRunning`

### Visulisation aprroaches

```typescript
/**
 *  APPORACH 1. changes nodes in state and triggers grid rerender (in Node.tsx based on the change the visual change take effect)
 *  i.e. visited nodes get set as visited and on rerender their color becomes blue
 *  less efficient than 2.
 *  more difficult to change based on algorithm
 *  makes more sense cause state grid should reflect algorithm changes in real scenario
 */
// for (let i = 0; i <= visitedNodes.length; i++) {
//   if (i === visitedNodes.length) {
//     for (let y = 0; y <= shortestPath.length; y++) {
//       // add func setNodeToShortesPath
//       setTimeout(() => setNodeToShortesPath(visitedNodes[i]), i * 10);
//     }
//   }
//   setTimeout(() => setNodeToVisited(visitedNodes[i]), i * 10);
// }

// APPROACH 2. grid in state remain the same, elements are changed by changing class in their dom elements (id = "row-col")
// more efficient than 1.
// can change animation depending on algorithm
d.animate(visitedNodes, shortestPath);
```
