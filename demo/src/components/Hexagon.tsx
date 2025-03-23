import React, { useState } from "react";

interface HexagonProps extends React.SVGProps<SVGPathElement> {
  d: string;
  fill: string;
  row?: number;
  col?: number;
  currentPlayer: number;
  onDropHexagon?: (
    row: number,
    col: number,
    event: React.DragEvent<SVGElement>
  ) => void;
}

const Hexagon: React.FC<HexagonProps> = ({
  d,
  fill,
  row,
  col,
  currentPlayer,
  onDropHexagon,
  ...props
}) => {
  // กำหนด fixedOwner ตามตำแหน่งที่เป็นพื้นที่ของผู้เล่น
  const fixedOwner = (() => {
    if (row !== undefined && col !== undefined) {
      // พื้นที่ของผู้เล่นคนที่ 1: (1,1), (1,2), (1,3), (2,1), (2,2)
      if (
        (row === 1 && (col === 1 || col === 2 || col === 3)) ||
        (row === 2 && (col === 1 || col === 2))
      ) {
        return 1;
      }
      // พื้นที่ของผู้เล่นคนที่ 2: (7,7), (7,8), (8,6), (8,7), (8,8)
      if (
        (row === 7 && (col === 7 || col === 8)) ||
        (row === 8 && (col === 6 || col === 7 || col === 8))
      ) {
        return 2;
      }
    }
    return null;
  })();

  // state owner: ถ้าเป็น fixedOwner จะตั้งค่าไว้ตั้งแต่เริ่มต้น มิฉะนั้นเริ่มเป็น null
  const [owner, setOwner] = useState<number | null>(fixedOwner);

  // เมื่อคลิกเพื่อ "ซื้อ" พื้นที่ (ถ้ายังไม่มีเจ้าของ)
  const handleClick = () => {
    if (owner === null) {
      setOwner(currentPlayer);
    }
  };

  // อนุญาตให้ drop เกิดขึ้นบนพื้นที่ hexagon
  const handleDragOver = (e: React.DragEvent<SVGPathElement>) => {
    e.preventDefault();
  };

  // เมื่อมีการ drop (minion) ลงบน hexagon
  const handleDrop = (e: React.DragEvent<SVGPathElement>) => {
    e.preventDefault();
    if (onDropHexagon && row !== undefined && col !== undefined) {
      // ส่งข้อมูลกลับไปให้ parent ผ่าน callback
      onDropHexagon(row, col, e);
    } else {
      const droppedData = e.dataTransfer.getData("text/plain");
      // ถ้ามีข้อมูล minion ที่ถูก drop และพื้นที่นี้ยังว่าง
      if (droppedData && owner === null) {
        setOwner(currentPlayer);
      }
    }
  };

  // กำหนดสีขอบ:
  // - ถ้า owner ถูกกำหนดแล้ว (fixed หรือซื้อไปแล้ว) ใช้สีของผู้เล่นนั้น
  // - ถ้ายังไม่ได้ซื้อ (owner === null) ใช้สี neutral (#6A6A6A)
  const strokeColor =
    owner !== null ? (owner === 1 ? "#C6386D" : "#136A61") : "#6A6A6A";

  return (
    <path
      d={d}
      fill={fill}
      stroke={strokeColor}
      strokeWidth={5}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{ cursor: owner === null ? "pointer" : "default" }}
      data-row={row}
      data-col={col}
      {...props}
    />
  );
};

export default Hexagon;
export {};
