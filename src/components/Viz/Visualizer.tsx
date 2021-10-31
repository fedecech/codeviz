/* eslint-disable no-alert */
import React, { useEffect, useState } from "react";
import VizNode from "./VizNode";
import { ENodeType, Node } from "../../lib/Node";
import { useGridStore } from "../../stores/useGridStore";
import { useSettingsStore } from "src/stores/useSettingsStore";

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
  const { algorithm, speed } = useSettingsStore();

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
        if (grid.getEndNode().equals(node) || node.isWall()) return;
        setStartNodePos(node);
      } else if (editMode === "end") {
        if (grid.getStartNode().equals(node) || node.isWall()) return;
        setEndNodePos(node);
      } else if (editMode === "wall") {
        if (grid.getStartNode().equals(node) || grid.getEndNode().equals(node))
          return;
        toggleWallNode(node);
      }
    }
  };

  // fix // setIsRunning(false) called before animation ends (beacuse of setTimer in animate)
  const animateAlgorithm = () => {
    resetAnimation();
    // setIsRunning(true);

    const { left: visitedNodes, right: shortestPath } = algorithm.solve(
      grid,
      grid.getStartNode(),
      grid.getEndNode()
    );

    algorithm.animate(visitedNodes, shortestPath, speed);

    // if (!shortestPath[shortestPath.length - 1].equals(grid.getEndNode()))
    // window.alert("Cannot find path");
    // else {
    // setIsRunning(false);
    // }
  };

  useEffect(() => {
    if (isRunning) animateAlgorithm();
    setIsRunning(false);
  }, [isRunning]);

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
