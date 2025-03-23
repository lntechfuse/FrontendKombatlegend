import React from "react";
import { Routes, Route } from "react-router-dom";  
import Home from "./components/Home";
import Mode from "./components/Mode";
import Createroom from "./components/Createroom";
import Room from "./components/Room";
import Join from "./components/Join";
import Select from "./components/Select";
import Strategy from "./components/Strategy";  
import Wait from "./components/Wait";
import GameUI from "./components/GameUI";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mode" element={<Mode />} />
      <Route path="/select" element={<Select />} />
      <Route path="/createroom" element={<Createroom />} />
      <Route path="/room" element={<Room />} />
      <Route path="/join" element={<Join />} />
      <Route path="/strategy/:role" element={<Strategy />} />
      <Route path="/wait" element={<Wait />} />
      <Route path="/gameui" element={<GameUI />} />
    </Routes>
  );
}; // ✅ ต้องไม่มีตัวอักษรเกินหลัง };

export default App;

