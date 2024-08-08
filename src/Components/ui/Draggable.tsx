import React, { useRef, useState } from "react";

const DraggableDiv: React.FC = () => {
  const dragItem = useRef<HTMLDivElement | null>(null);
  const dragItemNode = useRef<React.MouseEvent<
    HTMLDivElement,
    MouseEvent
  > | null>(null);

  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dragItem.current = e.target as HTMLDivElement;
    dragItemNode.current = e;
    setDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dragging && dragItemNode.current) {
      const newX = position.left + e.clientX - dragItemNode.current.clientX;
      const newY = position.top + e.clientY - dragItemNode.current.clientY;
      setPosition({ top: newY, left: newX });
      dragItemNode.current = e;
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="w-24 h-24 bg-blue-300 flex items-center justify-center border border-blue-500 rounded cursor-grab absolute"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    ></div>
  );
};

export default DraggableDiv;
