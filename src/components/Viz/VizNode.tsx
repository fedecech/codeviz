import React from "react";
import { Node } from "../../lib/Node";

interface VizNodeProps extends React.ComponentPropsWithoutRef<"button"> {
  node: Node;
}

const classnames = {
  wall: "bg-black",
  start: "bg-green-500",
  end: "bg-red-500",
  normal: "border",
};

const VizNode: React.FC<VizNodeProps> = ({ node, ...props }) => {
  const cs = node.visited ? `bg-blue-600` : classnames[node.type];

  return <button className={`w-7 h-7 ${cs}`} {...props}></button>;
};

export default VizNode;
