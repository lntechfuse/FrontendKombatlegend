import React, { useState } from "react";
import "./BuyMinionMenu.css";

interface Minion {
  name: string;
  cost: number;
}

interface BuyMinionMenuProps {
  minionTypes: Minion[];
  onBuyMinion: (minionName: string) => void;
  onCancel: () => void;
}

// URL รูปภาพจาก public folder
const mageImg = process.env.PUBLIC_URL + "/Minion/Mage.png";
const warriorImg = process.env.PUBLIC_URL + "/Minion/Warrior.png";
const tankImg = process.env.PUBLIC_URL + "/Minion/Tank.png";

const BuyMinionMenu: React.FC<BuyMinionMenuProps> = ({
  minionTypes,
  onBuyMinion,
  onCancel,
}) => {
  // ใช้ state สำหรับรายการ Minion ที่ยังไม่ได้ซื้อ
  const [availableMinions, setAvailableMinions] = useState<Minion[]>(minionTypes);

  // เมื่อเริ่มลาก Minion จาก Popup
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    minion: Minion
  ) => {
    // เซ็ตข้อมูล minion ลงใน dataTransfer
    e.dataTransfer.setData("text/plain", minion.name);
    // ลบ minion ออกจาก availableMinions ทันที (ทำให้หายจากเมนู)
    setAvailableMinions((prev) =>
      prev.filter((m) => m.name !== minion.name)
    );
    // แจ้งให้ Parent รู้ว่าซื้อ minion นี้แล้ว
    onBuyMinion(minion.name);
  };

  // กำหนด URL รูปภาพตามชื่อ Minion
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

  return (
    <div className="minion-menu">
      <h3 className="menu-title">BUY MINION</h3>
      <div className="minion-list">
        {availableMinions.map((minion) => (
          <div
            key={minion.name}
            className="minion-item"
            draggable
            onDragStart={(e) => handleDragStart(e, minion)}
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
      <div className="menu-actions">
        <button className="cancel-button" onClick={onCancel}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default BuyMinionMenu;
export {};
