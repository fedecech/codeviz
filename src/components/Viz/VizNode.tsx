import { HomeIcon, UserIcon } from "@heroicons/react/solid";
import React from "react";
import { ENodeType, Node } from "../../lib/Node";

interface VizNodeProps extends React.ComponentPropsWithoutRef<"button"> {
  node: Node;
}

const VizNode: React.FC<VizNodeProps> = ({ node, ...props }) => {
  let icon = null;

  if (node.isType(ENodeType.Start)) icon = <UserIcon />;
  else if (node.isType(ENodeType.End)) icon = <HomeIcon />;

  return (
    <button
      className={`node ${!node.isType(ENodeType.Normal) ? node.type : ``}`}
      {...props}
    >
      {icon}
    </button>
  );
};

export default VizNode;
