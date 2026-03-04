import type { CanvasNode } from "../App";

type BasicNodeProps = {
  nodeData: CanvasNode;
  onDragStart: (
    node: CanvasNode,
    e: React.PointerEvent<HTMLDivElement>,
  ) => void;
};

const BasicNode = ({ nodeData, onDragStart }: BasicNodeProps) => {
  return (
    <div
      onPointerDown={(e) => onDragStart(nodeData, e)}
      className="node"
      style={{
        position: "absolute",
        width: nodeData.width,
        height: nodeData.height,
        top: nodeData.y,
        left: nodeData.x,
        backgroundColor: nodeData.color,
      }}
    />
  );
};

export default BasicNode;
