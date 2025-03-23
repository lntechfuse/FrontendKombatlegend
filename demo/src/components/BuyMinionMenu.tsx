import React from "react";
import "./BuyMinionMenu.css";

interface Minion {
  name: string;
  cost: number;
}

interface BuyMinionMenuProps {
  minionTypes: Minion[];
  selectedMinion: string | null;
  onSelectMinion: (minionName: string) => void;
  onBuyMinion: () => void;
  onCancel: () => void;
}

// สร้าง URL สำหรับรูปภาพจาก public folder
const mageImg = process.env.PUBLIC_URL + "/Minion/Mage.png";
const warriorImg = process.env.PUBLIC_URL + "/Minion/Warrior.png";
const tankImg = process.env.PUBLIC_URL + "/Minion/Tank.png";

const BuyMinionMenu: React.FC<BuyMinionMenuProps> = ({
  minionTypes,
  selectedMinion,
  onSelectMinion,
  onBuyMinion,
  onCancel,
}) => {
  return (
    <div className="minion-menu">
      <h3 className="menu-title">BUY MINION</h3>

      {/* ส่วนแสดงรายการ Minion */}
      <div className="minion-list">
        {minionTypes.map((minion) => {
          let imageSrc;

          // เลือกรูปภาพตามชื่อ Minion
          if (minion.name === "Mage") {
            imageSrc = mageImg;
          } else if (minion.name === "Warrior") {
            imageSrc = warriorImg;
          } else if (minion.name === "Tank") {
            imageSrc = tankImg;
          }

          return (
            <div
              key={minion.name}
              className={`minion-item ${selectedMinion === minion.name ? "selected" : ""}`}
              onClick={() => onSelectMinion(minion.name)}
            >
              <div className="shape-icon">
                <img src={imageSrc} alt={minion.name} className="minion-icon" />
              </div>
              <div className="minion-name">{minion.name.toUpperCase()}</div>
              <div className="minion-cost">{minion.cost}</div>
            </div>
          );
        })}
      </div>

      {/* ปุ่ม Confirm / Cancel */}
      <div className="menu-actions">
        {selectedMinion && (
          <button className="confirm-button" onClick={onBuyMinion}>
            CONFIRM
          </button>
        )}
        <button className="cancel-button" onClick={onCancel}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default BuyMinionMenu;
export {};
