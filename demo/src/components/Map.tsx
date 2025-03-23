import React from "react";
import SVGComponent from "./SVGComponent"; // นำเข้า SVGComponent

interface MapProps {
  currentPlayer: number;
  width: number;
  height: number;
}

const Map: React.FC<MapProps> = ({ currentPlayer, width, height }) => {
  return (
    <div>
      <SVGComponent currentPlayer={currentPlayer} width={width} height={height} />
    </div>
  );
};

export default Map;
