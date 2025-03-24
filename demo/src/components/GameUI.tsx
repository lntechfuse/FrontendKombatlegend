import React, { useState } from "react";
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

// -------------------------
// ฟังก์ชันคำนวณพิกัด Hex สำหรับ Flat-Top แบบ odd‑r (ถ้าต้องใช้ในส่วนอื่น)
// -------------------------
const hexSize = 25; // รัศมีของ hex (ครึ่งหนึ่งของความกว้าง)
const hexWidth = 2 * hexSize; // 50px
const hexHeight = Math.sqrt(3) * hexSize; // ~43.3px
const xSpacing = hexWidth * 0.75; // ~37.5px
const ySpacing = hexHeight;       // ~43.3px

// -------------------------
// ส่วนโค้ดหลัก GameUI
// -------------------------
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

  const generateId = () => Math.floor(Math.random() * 1000000);

  // ฟังก์ชันสำหรับซื้อ minion โดยรับค่า row, col (จากการพิมพ์)
  const handleBuyMinion = (minionName: string, row: number, col: number) => {
    const minionData = minionTypes.find((m) => m.name === minionName);
    if (minionData && gold >= minionData.cost && minionsLeft > 0) {
      setGold(gold - minionData.cost);
      setMinionsLeft(minionsLeft - 1);

      // เปลี่ยนจากการคำนวณ x,y มาเก็บ row, col และ minionType
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

      {/* Inventory */}
      <div
        className="inventory"
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          margin: "10px 0",
        }}
      >
        {inventory.map((minion, index) => (
          <div
            key={index}
            className="inventory-item"
            style={{
              width: 60,
              height: 60,
              border: "1px solid #ccc",
              borderRadius: 4,
              background: "transparent",
              padding: 5,
            }}
          >
            <img
              src={getMinionImage(minion)}
              alt={minion}
              width="50"
              height="50"
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
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
