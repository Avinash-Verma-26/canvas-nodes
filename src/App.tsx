import React, { useRef, useState } from "react";
import BasicNode from "./components/BasicNode";

type Camera = {
  x: number;
  y: number;
  zoom: number;
};

type DragState = {
  nodeId: number;
  startClientX: number;
  startClientY: number;
  startNodeX: number;
  startNodeY: number;
  pointerId: number;
};

export type CanvasNode = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

function App() {
  const [cameraState, setCameraState] = useState<Camera>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    zoom: 1,
  });
  const [nodeList, setNodeList] = useState<CanvasNode[]>([]);
  const dragRef = useRef<DragState | null>(null);
  const nodeLayerRef = useRef<HTMLDivElement | null>(null);
  const addNode = (e: React.PointerEvent<HTMLDivElement>) => {
    let screenX = e.clientX;
    let screenY = e.clientY;
    let worldX = (screenX - cameraState.x) / cameraState.zoom;
    let worldY = (screenY - cameraState.y) / cameraState.zoom;
    let count = nodeList.length;
    const newNode: CanvasNode = {
      id: count + 1,
      x: worldX,
      y: worldY,
      width: 200,
      height: 200,
      color: "#fefefe",
    };
    setNodeList((prev) => [...prev, newNode]);
  };
  const onDragStart = (
    node: CanvasNode,
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    dragRef.current = {
      nodeId: node.id,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startNodeX: node.x,
      startNodeY: node.y,
      pointerId: e.pointerId,
    };
    nodeLayerRef.current?.setPointerCapture(e.pointerId);
  };
  const onDragEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const startPos = dragRef.current;
    if (!startPos) return;
    if (e.pointerId !== startPos.pointerId) return;
    nodeLayerRef.current?.releasePointerCapture(e.pointerId);
    dragRef.current = null;
  };
  const onWheelZoom = (e: React.WheelEvent<HTMLDivElement>) => {
    const mx = e.clientX;
    const my = e.clientY;

    setCameraState((cam) => {
      const zoomFactor = e.deltaY < 0 ? 1.2 : 0.8; // wheel up = zoom in
      const nextZoom = Math.min(4, Math.max(0.01, cam.zoom * zoomFactor)); // clamp

      // world point currently under cursor
      const wx = (mx - cam.x) / cam.zoom;
      const wy = (my - cam.y) / cam.zoom;

      // new translation to keep cursor anchored
      const nextX = mx - wx * nextZoom;
      const nextY = my - wy * nextZoom;

      return { x: nextX, y: nextY, zoom: nextZoom };
    });
  };
  const onDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const startPos = dragRef.current;
    if (!startPos) return;
    if (e.pointerId !== startPos.pointerId) return;

    const deltaX = e.clientX - startPos.startClientX;
    const deltaY = e.clientY - startPos.startClientY;
    const worldDeltaX = deltaX / cameraState.zoom;
    const worldDeltaY = deltaY / cameraState.zoom;
    setNodeList((prev) =>
      prev.map((node) =>
        node.id === startPos.nodeId
          ? {
              ...node,
              x: startPos.startNodeX + worldDeltaX,
              y: startPos.startNodeY + worldDeltaY,
            }
          : node,
      ),
    );
  };

  return (
    <div className="app-shell">
      <canvas className="bg-layer"></canvas>
      <div
        className="node-layer"
        ref={nodeLayerRef}
        onPointerMove={onDrag}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
        onDoubleClick={addNode}
        onWheel={onWheelZoom}
      >
        <div
          className="world"
          style={{
            transform: `translate(${cameraState.x}px,${cameraState.y}px) scale(${cameraState.zoom})`,
            transformOrigin: "0 0",
          }}
        >
          {nodeList &&
            nodeList.map((node) => (
              <BasicNode
                key={node.id}
                nodeData={node}
                onDragStart={onDragStart}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
