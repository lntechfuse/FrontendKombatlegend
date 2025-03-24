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

// ประกาศ interface BoardCell (เหมือนกับใน SVGComponent)
export interface BoardCell {
  row: number;
  col: number;
  owner: number | null;
}

const initializeBoard = (): BoardCell[] => {
  const board: BoardCell[] = [];
  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 8; col++) {
      let owner: number | null = null;
      // กำหนดพื้นที่เริ่มต้นสำหรับ GM
      if ((row === 1 && [1, 2, 3].includes(col)) || (row === 2 && [1, 2].includes(col))) {
        owner = 1;
      }
      // กำหนดพื้นที่เริ่มต้นสำหรับ PLAYER
      if ((row === 7 && [7, 8].includes(col)) || (row === 8 && [6, 7, 8].includes(col))) {
        owner = 2;
      }
      board.push({ row, col, owner });
    }
  }
  return board;
};

const GameUI: React.FC = () => {
  // State สำหรับ GM
  const [gmGold, setGmGold] = useState<number>(10000);
  const [gmMinionsLeft, setGmMinionsLeft] = useState<number>(10);
  // เปลี่ยนพื้นที่เริ่มต้นเป็น 5 หน่วยสำหรับแต่ละฝ่าย
  const [gmHexCount, setGmHexCount] = useState<number>(5);
  // State สำหรับ PLAYER
  const [playerGold, setPlayerGold] = useState<number>(10000);
  const [playerMinionsLeft, setPlayerMinionsLeft] = useState<number>(10);
  const [playerHexCount, setPlayerHexCount] = useState<number>(5);

  const [showMinionMenu, setShowMinionMenu] = useState<boolean>(false);
  // currentPlayer 1 = GM, 2 = PLAYER
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [minionsOnMap, setMinionsOnMap] = useState<MinionPlacement[]>([]);
  const [boardOwnership, setBoardOwnership] = useState<BoardCell[]>(initializeBoard());

  useEffect(() => {
    console.log("minionsOnMap:", minionsOnMap);
    console.log("boardOwnership:", boardOwnership);
  }, [minionsOnMap, boardOwnership]);

  const generateId = () => Math.floor(Math.random() * 1000000);

  // ฟังก์ชันสำหรับซื้อ minion
  const handleBuyMinion = (minionName: string, row: number, col: number) => {
    const minionData = minionTypes.find((m) => m.name === minionName);
    if (!minionData) return;

    // ตรวจสอบว่า cell ใน boardOwnership มี owner ตรงกับ currentPlayerหรือไม่
    const cell = boardOwnership.find((c) => c.row === row && c.col === col);
    if (!cell || cell.owner !== currentPlayer) {
      alert("You can only place a minion in your own area!");
      setShowMinionMenu(false); // ปิดหน้าต่างเมื่อแจ้งเตือนแล้ว
      return;
    }

    if (currentPlayer === 1) {
      if (gmGold >= minionData.cost && gmMinionsLeft > 0 && gmHexCount > 0) {
        setGmGold(gmGold - minionData.cost);
        setGmMinionsLeft(gmMinionsLeft - 1);
        setGmHexCount(gmHexCount - 1);
        setMinionsOnMap([
          ...minionsOnMap,
          { id: generateId(), row, col, minionType: minionName },
        ]);
        setShowMinionMenu(false);
      } else {
        alert("Not enough gold, minions or hexagon area for GM!");
      }
    } else {
      if (playerGold >= minionData.cost && playerMinionsLeft > 0 && playerHexCount > 0) {
        setPlayerGold(playerGold - minionData.cost);
        setPlayerMinionsLeft(playerMinionsLeft - 1);
        setPlayerHexCount(playerHexCount - 1);
        setMinionsOnMap([
          ...minionsOnMap,
          { id: generateId(), row, col, minionType: minionName },
        ]);
        setShowMinionMenu(false);
      } else {
        alert("Not enough gold, minions or hexagon area for PLAYER!");
      }
    }
  };

  // ฟังก์ชันสำหรับซื้อ SpawnableHex (หักเงิน 500 แล้วเพิ่มพื้นที่ขึ้น 1)
  const handleBuyHexagon = (row: number, col: number): boolean => {
    const cellIndex = boardOwnership.findIndex((c) => c.row === row && c.col === col);
    if (cellIndex === -1) return false;

    if (currentPlayer === 1) {
      if (gmGold >= 500) {
        setGmGold(gmGold - 500);
        setGmHexCount(gmHexCount + 1);
        setBoardOwnership((prev) =>
          prev.map((c, i) =>
            i === cellIndex ? { ...c, owner: 1 } : c
          )
        );
        return true;
      } else {
        alert("Not enough gold for GM to buy additional area!");
        return false;
      }
    } else {
      if (playerGold >= 500) {
        setPlayerGold(playerGold - 500);
        setPlayerHexCount(playerHexCount + 1);
        setBoardOwnership((prev) =>
          prev.map((c, i) =>
            i === cellIndex ? { ...c, owner: 2 } : c
          )
        );
        return true;
      } else {
        alert("Not enough gold for PLAYER to buy additional area!");
        return false;
      }
    }
  };

  const openMinionMenu = () => {
    setShowMinionMenu(true);
  };

  const endTurn = () => {
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
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
          <div className="stat-item">💰 {gmGold}</div>
          <div className="stat-item">📦 Minions left: {gmMinionsLeft}</div>
          <div className="stat-item">⬢ SpawnableHex: {gmHexCount}</div>
          {currentPlayer === 1 && (
            <button className="buy-minion" onClick={openMinionMenu}>
              Buy minion
            </button>
          )}
        </div>
      </div>

      {/* PLAYER Panel */}
      <div className="player-panel bottom-right">
        <div className="player-info">
          <span className="player-name">PLAYER</span>
          <img src={avatarplayer} alt="Player Avatar" className="avatar" />
        </div>
        <div className="stats">
          <div className="stat-item">💰 {playerGold}</div>
          <div className="stat-item">📦 Minions left: {playerMinionsLeft}</div>
          <div className="stat-item">⬢ SpawnableHex: {playerHexCount}</div>
          {currentPlayer === 2 && (
            <button className="buy-minion" onClick={openMinionMenu}>
              Buy minion
            </button>
          )}
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
          gmAreaColor="#C6386D"
          playerAreaColor="#136A61"
          onBuyHexagon={handleBuyHexagon}
          boardOwnership={boardOwnership}
        />
      </div>

      <button className="end-turn" onClick={endTurn}>
        END TURN
      </button>

      <p className="current-turn">
        Current Turn:
        <br />
        {currentPlayer === 1 ? "GM" : "PLAYER"}
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
