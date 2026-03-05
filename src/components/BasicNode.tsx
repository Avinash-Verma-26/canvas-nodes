import type { ModelNode } from "../App";

type BasicNodeProps = {
  node: ModelNode;
  onMoveStart: any;
};

const BasicNode = ({ node, onMoveStart }: BasicNodeProps) => {
  return (
    <div
      className="node"
      style={{ top: node.position.y, left: node.position.x }}
      onPointerDown={(e) => onMoveStart(e, node)}
    >
      <p>{node.id}</p>
      <p>{node.position.x}</p>
      <p>{node.position.y}</p>
    </div>
  );
};

export default BasicNode;
