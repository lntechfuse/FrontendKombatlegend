import React, { useState } from "react";
import "./GameUI.css";
import avatargm from "../images/avatargm.jpg";
import avatarplayer from "../images/avatarplayer.jpg";
import Map from "./Map";
import BuyMinionMenu from "./BuyMinionMenu";

// ข้อมูล Minion ต้นฉบับสำหรับ Popup
const minionTypes = [
  { name: "Mage", cost: 3500 },
  { name: "Warrior", cost: 2000 },
  { name: "Tank", cost: 1500 }
];

interface MinionOnMap {
  id: number;
  type: string;
  x: number;
  y: number;
}

const GameUI: React.FC = () => {
  const [gold, setGold] = useState<number>(10000);
  const [minionsLeft, setMinionsLeft] = useState<number>(10);
  const [showMinionMenu, setShowMinionMenu] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);

  // state สำหรับ minion ที่อยู่ใน Inventory (ที่ถูกซื้อแล้วจาก Popup)
  const [inventory, setInventory] = useState<string[]>([]);
  // state สำหรับ minion ที่ถูกวางบน Map (โดยตำแหน่ง pixel)
  const [minionsOnMap, setMinionsOnMap] = useState<MinionOnMap[]>([]);

  const generateId = () => Math.floor(Math.random() * 1000000);

  // เมื่อลากจาก Inventory (ถ้ามี)
  const handleInventoryDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    minionType: string
  ) => {
    e.dataTransfer.setData("text/plain", minionType);
  };

  // เมื่อ drop Minion ลงบน Map Container
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const minionType = e.dataTransfer.getData("text/plain");
    const mapRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - mapRect.left;
    const y = e.clientY - mapRect.top;
    setMinionsOnMap([...minionsOnMap, { id: generateId(), type: minionType, x, y }]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // เปิด Popup สำหรับซื้อ Minion
  const openMinionMenu = () => {
    setShowMinionMenu(true);
  };

  // เมื่อซื้อ Minion (จาก BuyMinionMenu) ให้จัดการ: หักเงิน, ลดจำนวน, เพิ่มเข้า Inventory
  const handleBuyMinion = (minionName: string) => {
    const minionData = minionTypes.find((m) => m.name === minionName);
    if (minionData && gold >= minionData.cost && minionsLeft > 0) {
      setGold(gold - minionData.cost);
      setMinionsLeft(minionsLeft - 1);
      // เพิ่ม minion เข้าสู่ Inventory
      setInventory((prev) => [...prev, minionName]);
      // ปิด Popup
      setShowMinionMenu(false);
    } else {
      alert("Not enough gold or minions left!");
    }
  };

  // สลับ Turn
  const endTurn = () => {
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
  };

  // กำหนด URL รูปภาพ Minion จาก public folder
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

      {/* Inventory: แสดง Minion (draggable) */}
      <div
        className="inventory"
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          margin: "10px 0"
        }}
      >
        {inventory.map((minion, index) => (
          <div
            key={index}
            className="inventory-item"
            draggable
            onDragStart={(e) => handleInventoryDragStart(e, minion)}
            style={{
              width: 60,
              height: 60,
              border: "1px solid #ccc",
              borderRadius: 4,
              background: "transparent",
              padding: 5
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

      {/* Map Container: รองรับ Drag & Drop */}
      <div
        className="map-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          position: "relative",
          width: "500px",
          height: "500px",
          margin: "0 auto"
        }}
      >
        <Map currentPlayer={currentPlayer} width={500} height={500} />
        {minionsOnMap.map((minion) => (
          <img
            key={minion.id}
            src={getMinionImage(minion.type)}
            alt={minion.type}
            style={{
              position: "absolute",
              left: minion.x,
              top: minion.y,
              width: "50px",
              height: "50px",
              transform: "translate(-50%, -50%)"
            }}
          />
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

      <button className="end-turn" onClick={endTurn}>
        END TURN
      </button>

      <p className="current-turn">
        Current Turn:<br />
        {currentPlayer === 1 ? "Player 1" : "Player 2"}
      </p>

      {/* Popup BuyMinionMenu: เมื่อเปิด Popup ผู้ใช้ลาก Minion จากนี้ลง Map */}
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
