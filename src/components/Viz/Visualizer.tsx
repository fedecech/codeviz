/* eslint-disable no-alert */
import React, { useState } from "react";
import produce from "immer";

import { Grid } from "../../lib/Grid";
import VizNode from "./VizNode";
import { ENodeType, Node } from "../../lib/Node";
import { BFS } from "src/lib/algorithms/BFS";

interface VisualizerProps {}

const Visualizer: React.FC<VisualizerProps> = ({}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [grid, setGrid] = useState<Grid>(
    new Grid({
      rows: 20,
      cols: 50,
      start: { row: 10, col: 5 },
      end: { row: 10, col: 45 },
    })
  );
  const [startNode, setStartNode] = useState<Node>(
    new Node({ coords: { row: 10, col: 5 }, type: ENodeType.Start })
  );
  const [endNode, setEndNode] = useState<Node>(
    new Node({ coords: { row: 10, col: 45 }, type: ENodeType.End })
  );

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [editMode, setEditMode] = useState<"start" | "end" | "wall">("wall");

  const updateGridNode = (cb: (grid: Node[][]) => void) => {
    const newGrid = produce(grid.internal, cb);
    setGrid(Grid.fromInternal(newGrid));
  };

  const toggleWall = (node: Node) => {
    const { row, col } = node;
    updateGridNode((gridCopy) => {
      gridCopy[row][col].toggleIsWall();
    });
  };

  const handleMouseUp = (node: Node) => {
    if (isAnimating) return;

    setEditMode("wall");
    setIsMouseDown(false);
  };

  const handleMouseDown = (node: Node) => {
    if (isAnimating) return;
    if (node.isType(ENodeType.Wall) || node.isType(ENodeType.Normal))
      toggleWall(node);
    else if (node.isType(ENodeType.Start)) setEditMode("start");
    else if (node.isType(ENodeType.End)) setEditMode("end");

    setIsMouseDown(true);
  };

  const handleMouseEnter = (node: Node) => {
    if (isMouseDown && !isAnimating) {
      if (editMode === "start") {
        if (endNode.equals(node)) return;
        const { row, col } = startNode;
        updateGridNode((gridCopy) => gridCopy[row][col].setToNormalNode());
        updateGridNode((gridCopy) => {
          gridCopy[node.row][node.col].setToStartNode();
        });
        setStartNode(node);
      } else if (editMode === "end") {
        if (startNode.equals(node)) return;
        const { row, col } = endNode;
        updateGridNode((gridCopy) => gridCopy[row][col].setToNormalNode());
        updateGridNode((gridCopy) => {
          gridCopy[node.row][node.col].setToEndNode();
        });
        setEndNode(node);
      } else if (editMode === "wall") toggleWall(node);
    }
  };

  // fix setIsAnimating(false) called before animation ends (beacuse of setTimer in animate)
  const animateAlgorithm = () => {
    setIsAnimating(true);
    const d = new BFS();
    const r = d.solve(grid, startNode, endNode);
    d.animate(r.left, r.right);
    console.log(r.right);
    if (!r.right[r.right.length - 1].equals(endNode))
      window.alert("Cannot find path");
    else setIsAnimating(false);
  };

  return (
    <div className="flex flex-col items-center">
      {grid.internal.map((nodes, row) => (
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
      <button onClick={animateAlgorithm}>Start</button>
    </div>
  );
};

export default Visualizer;
