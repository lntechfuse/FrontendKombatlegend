import React from "react";
import { useNavigate } from "react-router-dom";
import "./Room.css";

const Room: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="wait-container">
      <h1>660660660</h1>
      <p>Please have the second player enter the room number</p>

      <button className="button" onClick={() => navigate("/wait")}>
        Create
      </button>
    </div>
  );
};

export default Room;
export {};
