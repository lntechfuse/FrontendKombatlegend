import React from "react";
import { useNavigate } from "react-router-dom";
import "./Wait.css";

const Wait: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="wait-container">
      <h1>Please wait while other players join the game.</h1>

      <button className="back-button" onClick={() => navigate("/Select")}>
          Start
      </button>
    </div>
  );
};

export default Wait;
