import type React from "react";
import { useRef, useState } from "react";
import BasicNode from "./components/BasicNode";

export type Position = {
  x: number;
  y: number;
};

export type ModelNode = {
  id: number;
  position: Position;
};

type CameraPosition = {
  x: number;
  y: number;
  zoom: number;
};

type MoveNode = {
  node: ModelNode;
};

function App() {
  const moveRef = useRef<ModelNode | null>(null);
  const [cameraPos, setCameraPos] = useState<CameraPosition>({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const [cursorPos, setCursorPos] = useState<Position>({ x: 0, y: 0 });
  const [nodeList, setNodeList] = useState<ModelNode[]>([]);

  const addNode = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const addPosition: Position = { x: e.clientX, y: e.clientY };
    const newNode: ModelNode = {
      id: nodeList.length + 1,
      position: addPosition,
    };
    setNodeList((prev) => [...prev, newNode]);
  };
  const onMoveStart = (
    e: React.PointerEvent<HTMLDivElement>,
    node: ModelNode,
  ) => {
    e.preventDefault();
    moveRef.current = node;
    console.log(e, node);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {};
  const onMoveEnd = () => {
    moveRef.current = null;
  };

  return (
    <div className="main-container">
      <canvas className="base-layer"></canvas>
      <div
        className="camera"
        style={{ left: cameraPos.x, top: cameraPos.y }}
      ></div>
      <div className="tooltip" style={{ left: cursorPos.x, top: cursorPos.y }}>
        <p>X = {cursorPos.x}</p>
        <p>Y = {cursorPos.y}</p>
      </div>
      <div
        className="node-layer"
        onPointerMove={onMove}
        onPointerUp={onMoveEnd}
        onDoubleClick={addNode}
      >
        {nodeList.map((node) => {
          return (
            <BasicNode key={node.id} node={node} onMoveStart={onMoveStart} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
