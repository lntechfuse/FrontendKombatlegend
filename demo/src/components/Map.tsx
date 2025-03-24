import React from "react";
import SVGComponent, { MinionPlacement } from "./SVGComponent";

export interface MapProps {
  currentPlayer: number;
  width: number;
  height: number;
  // นำ prop onHexagonDrop ออก เพราะเราใช้ระบบพิมพ์ค่าแทน
  minionPlacements?: MinionPlacement[];
}

const Map: React.FC<MapProps> = ({
  currentPlayer,
  width,
  height,
  minionPlacements = [],
}) => {
  return (
    <div>
      <SVGComponent 
        currentPlayer={currentPlayer} 
        width={width} 
        height={height}
        minionPlacements={minionPlacements}
      />
    </div>
  );
};

export default Map;
