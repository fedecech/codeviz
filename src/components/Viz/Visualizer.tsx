/* eslint-disable no-alert */
import React, { useEffect, useState } from "react";
import VizNode from "./VizNode";
import { ENodeType, Node } from "../../lib/Node";
import { BFS } from "src/lib/algorithms/BFS";
import { useGridStore } from "../../stores/useGridStore";
import { Algorirthm } from "src/lib/algorithms/Algorithm";

interface VisualizerProps {
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const Visualizer: React.FC<VisualizerProps> = ({ isRunning, setIsRunning }) => {
  const {
    grid,
    setStartNodePos,
    setEndNodePos,
    toggleWallNode,
    resetAnimation,
  } = useGridStore();

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [editMode, setEditMode] = useState<"start" | "end" | "wall">("wall");

  const handleMouseUp = (node: Node) => {
    if (isRunning) return;

    setEditMode("wall");
    setIsMouseDown(false);
  };

  const handleMouseDown = (node: Node) => {
    if (isRunning) return;
    if (node.isType(ENodeType.Wall) || node.isType(ENodeType.Normal))
      toggleWallNode(node);
    else if (node.isType(ENodeType.Start)) setEditMode("start");
    else if (node.isType(ENodeType.End)) setEditMode("end");

    setIsMouseDown(true);
  };

  const handleMouseEnter = (node: Node) => {
    if (isMouseDown && !isRunning) {
      if (editMode === "start") {
        if (grid.getStartNode().equals(node)) return;
        setStartNodePos(node);
      } else if (editMode === "end") {
        if (grid.getEndNode().equals(node)) return;
        setEndNodePos(node);
      } else if (editMode === "wall") toggleWallNode(node);
    }
  };

  const animateAlgorithm = () => {
    resetAnimation();
    // setIsRunning(true);
    const d: Algorirthm = new BFS();

    const { left: visitedNodes, right: shortestPath } = d.solve(
      grid,
      grid.getStartNode(),
      grid.getEndNode()
    );

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

    if (!shortestPath[shortestPath.length - 1].equals(grid.getEndNode()))
      window.alert("Cannot find path");
    else {
      // setIsRunning(false);
    }
  };

  useEffect(() => {
    if (isRunning) animateAlgorithm();
    setIsRunning(false);
  }, [isRunning]);

  // fix // setIsRunning(false) called before animation ends (beacuse of setTimer in animate)

  return (
    <div className="flex flex-col items-center">
      {grid.getNodes().map((nodes, row) => (
        <div key={row} className="flex items-center">
          {nodes.map((node, col) => (
            <VizNode
              id={node.toKey()}
              key={col}
              node={node}
              onMouseDown={() => handleMouseDown(node)}
              onMouseEnter={() => handleMouseEnter(node)}
              onMouseUp={() => handleMouseUp(node)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Visualizer;
