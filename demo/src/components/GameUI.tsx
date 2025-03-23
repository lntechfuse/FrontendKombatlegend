import React, { useState } from "react";
import "./GameUI.css";
import avatargm from "../images/avatargm.jpg";
import avatarplayer from "../images/avatarplayer.jpg";
import Map from "./Map";

// ข้อมูล Minion
const minionTypes = [
  { name: "Mage", cost: 3500 },
  { name: "Warrior", cost: 2000 },
  { name: "Tank", cost: 1500 }
];

const GameUI: React.FC = () => {
  const [gold, setGold] = useState<number>(10000); // เงินเริ่มต้น
  const [minionsLeft, setMinionsLeft] = useState<number>(10); // จำนวน Minion ที่เหลือ
  const [showMinionMenu, setShowMinionMenu] = useState<boolean>(false); // แสดง/ซ่อนเมนูเลือก Minion
  const [selectedMinion, setSelectedMinion] = useState<string | null>(null); // Minion ที่เลือก
  const [currentPlayer, setCurrentPlayer] = useState<number>(1); // 1 = ผู้เล่นคนที่ 1, 2 = ผู้เล่นคนที่ 2

  // เปิดเมนูเลือก Minion
  const openMinionMenu = () => {
    setShowMinionMenu(true);
    setSelectedMinion(null);
  };

  // เลือก Minion แต่ยังไม่ซื้อ
  const selectMinion = (minionName: string) => {
    setSelectedMinion(minionName);
  };

  // ซื้อ Minion ที่เลือก
  const buyMinion = () => {
    if (!selectedMinion) return;

    const minionData = minionTypes.find((m) => m.name === selectedMinion);
    if (minionData && gold >= minionData.cost && minionsLeft > 0) {
      setGold(gold - minionData.cost); // หักเงิน
      setMinionsLeft(minionsLeft - 1); // ลด Minion ที่เหลือ
      setShowMinionMenu(false);        // ปิดเมนู
    }
  };

  // ฟังก์ชันสลับ Turn
  const endTurn = () => {
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
  };

  return (
    <div className="game-container">
      {/* GM Panel (มุมซ้ายบน) */}
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

      {/* Map ตรงกลาง */}
      <div className="map-container">
        <Map currentPlayer={currentPlayer} width={500} height={500} />
      </div>

      {/* Player Panel (ย้ายมาอยู่ด้านล่างขวา) */}
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

      {/* ปุ่ม END TURN */}
      <button className="end-turn" onClick={endTurn}>END TURN</button>
      
      {/* ข้อความ Current Turn */}
      <p>Current Turn: {currentPlayer === 1 ? "Player 1" : "Player 2"}</p>

      {/* Minion Selection Menu */}
      {showMinionMenu && (
        <div className="minion-menu">
          <h3>Select a Minion</h3>
          {minionTypes.map((minion) => (
            <button
              key={minion.name}
              className={selectedMinion === minion.name ? "selected" : ""}
              onClick={() => selectMinion(minion.name)}
              disabled={gold < minion.cost}
            >
              {minion.name} - {minion.cost} 💰
            </button>
          ))}
          <div>
            <button
              onClick={buyMinion}
              disabled={
                !selectedMinion ||
                gold < (minionTypes.find((m) => m.name === selectedMinion)?.cost || 0)
              }
            >
              Confirm Purchase
            </button>
            <button onClick={() => setShowMinionMenu(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameUI;
