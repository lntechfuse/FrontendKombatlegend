import React, { useState } from "react";
import "./BuyMinionMenu.css";

interface Minion {
  name: string;
  cost: number;
}

interface BuyMinionMenuProps {
  minionTypes: Minion[];
  // callback รับ minionName + row, col
  onBuyMinion: (minionName: string, row: number, col: number) => void;
  onCancel: () => void;
}

const mageImg = process.env.PUBLIC_URL + "/Minion/Mage.png";
const warriorImg = process.env.PUBLIC_URL + "/Minion/Warrior.png";
const tankImg = process.env.PUBLIC_URL + "/Minion/Tank.png";

const BuyMinionMenu: React.FC<BuyMinionMenuProps> = ({
  minionTypes,
  onBuyMinion,
  onCancel,
}) => {
  // state สำหรับรายการ minion ที่ยังไม่ได้ซื้อ
  // (ถ้าอยากซื้อซ้ำ minion เดิมได้เรื่อย ๆ ไม่ต้อง filter ออก)
  const [availableMinions, setAvailableMinions] = useState<Minion[]>(minionTypes);

  // state สำหรับ minion ที่ผู้ใช้เลือก
  const [selectedMinion, setSelectedMinion] = useState<Minion | null>(null);

  // state สำหรับรับค่า row และ col (เป็น string ก่อน parse)
  const [row, setRow] = useState<string>("");
  const [col, setCol] = useState<string>("");

  // เมื่อผู้ใช้คลิกเลือก minion
  const handleSelectMinion = (minion: Minion) => {
    setSelectedMinion(minion);
  };

  const getMinionImage = (minionName: string): string => {
    switch (minionName) {
      case "Mage":
        return mageImg;
      case "Warrior":
        return warriorImg;
      case "Tank":
        return tankImg;
      default:
        return "";
    }
  };
// เมื่อกด Confirm การวาง minion
const handleConfirm = () => {
  if (!selectedMinion) {
    alert("กรุณาเลือก Minion ก่อน");
    return;
  }

  // ตรวจสอบว่า row, col ไม่ว่าง
  if (row.trim() === "" || col.trim() === "") {
    alert("กรุณากรอกค่า row และ col ให้ถูกต้อง");
    return;
  }

  const parsedRow = parseInt(row, 10);
  const parsedCol = parseInt(col, 10);

  // เปลี่ยนเงื่อนไขตรวจสอบเป็น <= 0 แทน < 0
  if (isNaN(parsedRow) || isNaN(parsedCol) || parsedRow <= 0 || parsedCol <= 0) {
    alert("กรุณาใส่ตัวเลขที่ถูกต้อง (มากกว่า 0) สำหรับ row และ col");
    return;
  }

  // เรียก callback พร้อมส่งชื่อ minion, row, col
  onBuyMinion(selectedMinion.name, parsedRow, parsedCol);

  // ถ้าไม่ต้องการให้ซื้อ Minion ซ้ำได้ ก็ filter ออก
  setAvailableMinions((prev) =>
    prev.filter((m) => m.name !== selectedMinion.name)
  );

  // ล้าง state การเลือก
  setSelectedMinion(null);
  setRow("");
  setCol("");
};

  return (
    <div className="minion-menu">
      <h3 className="menu-title">BUY MINION</h3>
      <div className="minion-list">
        {availableMinions.map((minion) => (
          <div
            key={minion.name}
            className={`minion-item ${
              selectedMinion?.name === minion.name ? "selected" : ""
            }`}
            onClick={() => handleSelectMinion(minion)}
          >
            <div className="shape-icon">
              <img
                src={getMinionImage(minion.name)}
                alt={minion.name}
                className="minion-icon"
              />
            </div>
            <div className="minion-name">{minion.name.toUpperCase()}</div>
            <div className="minion-cost">{minion.cost}</div>
          </div>
        ))}
      </div>

      {/* ถ้าเลือก Minion แล้ว จึงให้กรอกตำแหน่ง */}
      {selectedMinion && (
        <div className="placement-inputs">
          <div>
            <label>
              Row:
              <input
                type="number"
                value={row}
                onChange={(e) => setRow(e.target.value)}
                placeholder="Row"
              />
            </label>
          </div>
          <div>
            <label>
              Col:
              <input
                type="number"
                value={col}
                onChange={(e) => setCol(e.target.value)}
                placeholder="Col"
              />
            </label>
          </div>
          <button onClick={handleConfirm}>Confirm Placement</button>
        </div>
      )}

      <div className="menu-actions">
        <button className="cancel-button" onClick={onCancel}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default BuyMinionMenu;
