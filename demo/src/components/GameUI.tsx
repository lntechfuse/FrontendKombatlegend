import React, { useState, useEffect } from "react";
import "./GameUI.css";
import avatargm from "../images/avatargm.jpg";
import avatarplayer from "../images/avatarplayer.jpg";
import Map from "./Map";
import BuyMinionMenu from "./BuyMinionMenu";

const minionTypes = [
  { name: "Mage", cost: 3500 },
  { name: "Warrior", cost: 2000 },
  { name: "Tank", cost: 100 },
];

interface MinionPlacement {
  id: number;
  row: number;
  col: number;
  minionType: string;
}

const GameUI: React.FC = () => {
  const [gold, setGold] = useState<number>(10000);
  const [minionsLeft, setMinionsLeft] = useState<number>(10);
  const [showMinionMenu, setShowMinionMenu] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [inventory, setInventory] = useState<string[]>([]);
  const [minionsOnMap, setMinionsOnMap] = useState<MinionPlacement[]>([]);

  // ตรวจสอบค่า state ของ minionsOnMap ทุกครั้งที่มีการเปลี่ยนแปลง
  useEffect(() => {
    console.log("minionsOnMap:", minionsOnMap);
    minionsOnMap.forEach((minion, index) => {
      if (minion.row === 0 || minion.col === 0) {
        console.warn(`Minion at index ${index} has invalid position:`, minion);
      }
    });
  }, [minionsOnMap]);

  const generateId = () => Math.floor(Math.random() * 1000000);

  const handleBuyMinion = (minionName: string, row: number, col: number) => {
    const minionData = minionTypes.find((m) => m.name === minionName);
    if (minionData && gold >= minionData.cost && minionsLeft > 0) {
      setGold(gold - minionData.cost);
      setMinionsLeft(minionsLeft - 1);

      // เพิ่ม minion ลงใน state พร้อม row, col และ minionType
      setMinionsOnMap([
        ...minionsOnMap,
        { id: generateId(), row, col, minionType: minionName },
      ]);

      setInventory((prev) => [...prev, minionName]);
      setShowMinionMenu(false);
    } else {
      alert("Not enough gold or minions left!");
    }
  };

  const openMinionMenu = () => {
    setShowMinionMenu(true);
  };

  const endTurn = () => {
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
  };

  const getMinionImage = (minionType: string): string => {
    switch (minionType) {
      case "Mage":
        return process.env.PUBLIC_URL + "/Minion/Mage.png";
      case "Warrior":
        return process.env.PUBLIC_URL + "/Minion/Warrior.png";
      case "Tank":
        return process.env.PUBLIC_URL + "/Minion/Tank.png";
      default:
        return "";
    }
  };

  return (
    <div className="game-container">
      {/* GM Panel */}
      <div className="player-panel left">
        <div className="player-info">
          <img src={avatargm} alt="GM Avatar" className="avatar" />
          <span className="player-name">GM</span>
        </div>
        <div className="stats">
          <div className="stat-item">💰 {gold}</div>
          <div className="stat-item">📦 Minions left: {minionsLeft}</div>
          <button className="buy-minion" onClick={openMinionMenu}>
            Buy minion
          </button>
        </div>
      </div>

  
      {/* Player Panel */}
      <div className="player-panel bottom-right">
        <div className="player-info">
          <span className="player-name">PLAYER</span>
          <img src={avatarplayer} alt="Player Avatar" className="avatar" />
        </div>
        <div className="stats">
          <div className="stat-item">💰 {gold}</div>
          <div className="stat-item">📦 Minions left: {minionsLeft}</div>
          <button className="buy-minion" onClick={openMinionMenu}>
            Buy minion
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div
        className="map-container"
        style={{
          position: "relative",
          width: "500px",
          height: "500px",
          margin: "0 auto",
        }}
      >
        <Map
          currentPlayer={currentPlayer}
          width={500}
          height={500}
          minionPlacements={minionsOnMap}
        />
      </div>

      <button className="end-turn" onClick={endTurn}>
        END TURN
      </button>

      <p className="current-turn">
        Current Turn:<br />
        {currentPlayer === 1 ? "Player 1" : "Player 2"}
      </p>

      {/* Popup BuyMinionMenu */}
      {showMinionMenu && (
        <BuyMinionMenu
          minionTypes={minionTypes}
          onBuyMinion={handleBuyMinion}
          onCancel={() => setShowMinionMenu(false)}
        />
      )}
    </div>
  );
};

export default GameUI;
