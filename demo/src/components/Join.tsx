import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./Join.css";

const RoomEntry: React.FC = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate(); // ✅ ใช้ useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  const handleEnter = () => {
    if (roomId.trim() !== "") {
      navigate("/select"); // ✅ เปลี่ยนเส้นทางไปที่ "/select"
    } else {
      alert("Please enter a Room ID!"); // แจ้งเตือนถ้าไม่ได้กรอกค่า
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="ENTER ROOM-ID"
        value={roomId}
        onChange={handleChange}
        className="input-box"
      />
      <button onClick={handleEnter} className="enter">
        ENTER
      </button>
    </div>
  );
};

export default RoomEntry;
