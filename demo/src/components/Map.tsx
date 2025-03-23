import React from "react";
import SVGComponent from "./SVGComponent";

export interface MapProps {
  currentPlayer: number;
  width: number;
  height: number;
  onHexagonDrop?: (row: number, col: number, minionType: string) => void;
}

const Map: React.FC<MapProps> = ({ currentPlayer, width, height, onHexagonDrop }) => {
  return (
    <div>
      <SVGComponent 
        currentPlayer={currentPlayer} 
        width={width} 
        height={height}
        onHexagonDrop={onHexagonDrop}
      />
    </div>
  );
};

export default Map;
