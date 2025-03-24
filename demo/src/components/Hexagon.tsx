import React, { useState } from "react";

export interface HexagonProps extends React.SVGProps<SVGPathElement> {
  d: string;
  fill: string;
  row?: number;
  col?: number;
  currentPlayer: number;
  gmAreaColor: string;
  playerAreaColor: string;
  onBuyHexagon?: (row: number, col: number) => boolean;
}

const Hexagon: React.FC<HexagonProps> = ({
  d,
  fill,
  row,
  col,
  currentPlayer,
  gmAreaColor,
  playerAreaColor,
  onBuyHexagon,
  ...props
}) => {
  // กำหนด fixedOwner สำหรับพื้นที่เริ่มต้น (ถ้ามี)
  const fixedOwner = (() => {
    if (row !== undefined && col !== undefined) {
      // ตัวอย่างพื้นที่เริ่มต้นสำหรับ GM
      if (
        (row === 1 && (col === 1 || col === 2 || col === 3)) ||
        (row === 2 && (col === 1 || col === 2))
      ) {
        return 1;
      }
      // ตัวอย่างพื้นที่เริ่มต้นสำหรับ PLAYER
      if (
        (row === 7 && (col === 7 || col === 8)) ||
        (row === 8 && (col === 6 || col === 7 || col === 8))
      ) {
        return 2;
      }
    }
    return null;
  })();

  const [owner, setOwner] = useState<number | null>(fixedOwner);

  // ฟังก์ชัน handleClick สำหรับซื้อ Hexagon
  const handleClick = () => {
    if (owner === null && row !== undefined && col !== undefined && onBuyHexagon) {
      const success = onBuyHexagon(row, col);
      if (success) {
        setOwner(currentPlayer);
      }
    }
  };

  // กำหนดสีขอบ (stroke) โดยถ้ามี owner แล้วจะใช้สีของทีมที่เป็นเจ้าของ
  const strokeColor =
    owner !== null ? (owner === 1 ? gmAreaColor : playerAreaColor) : "#6A6A6A";

  return (
    <path
      d={d}
      fill={fill}
      stroke={strokeColor}
      strokeWidth={5}
      onClick={handleClick}
      style={{ cursor: owner === null ? "pointer" : "default" }}
      data-row={row}
      data-col={col}
      {...props}
    />
  );
};

export default Hexagon;
