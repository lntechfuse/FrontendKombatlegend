import React from "react";
import SVGComponent, { MinionPlacement, BoardCell } from "./SVGComponent";

export interface MapProps {
  currentPlayer: number;
  width: number;
  height: number;
  minionPlacements?: MinionPlacement[];
  gmAreaColor: string;
  playerAreaColor: string;
  onBuyHexagon: (row: number, col: number) => boolean;
  boardOwnership: BoardCell[];
}

const Map: React.FC<MapProps> = ({
  currentPlayer,
  width,
  height,
  minionPlacements = [],
  gmAreaColor,
  playerAreaColor,
  onBuyHexagon,
  boardOwnership,
}) => {
  return (
    <div>
      <SVGComponent 
        currentPlayer={currentPlayer}
        width={width}
        height={height}
        minionPlacements={minionPlacements}
        gmAreaColor={gmAreaColor}
        playerAreaColor={playerAreaColor}
        onBuyHexagon={onBuyHexagon}
        boardOwnership={boardOwnership}
      />
    </div>
  );
};

export default Map;
