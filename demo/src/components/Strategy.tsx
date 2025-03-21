import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Strategy.css";

const StrategyForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, image } = location.state || {}; // รับค่าจาก state ที่ถูกส่งมา

  const [name, setName] = useState("");
  const [strategy, setStrategy] = useState("");
  const [defense, setDefense] = useState("");

  // สร้าง useRef สำหรับเสียง
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    bgMusicRef.current = new Audio("/sounds/bg-music.mp3");
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.5;

    clickSoundRef.current = new Audio("/sounds/click.mp3");
    hoverSoundRef.current = new Audio("/sounds/hover.mp3");

    // ให้เพลงเล่นหลังจากที่ผู้ใช้โต้ตอบ
    const enableAudio = () => {
      if (!isMusicPlaying && bgMusicRef.current) {
        bgMusicRef.current.play().catch(err => console.log("Autoplay blocked:", err));
        setIsMusicPlaying(true);
      }
      document.removeEventListener("click", enableAudio);
    };

    document.addEventListener("click", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
    };
  }, [isMusicPlaying]);

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play();
    }
  };

  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play();
    }
  };

  const handleSelect = () => {
    playClickSound();
    localStorage.setItem("playerName", name); // เก็บชื่อไว้ใน localStorage
    navigate("/select", { state: { name } }); // ส่งค่าไปที่หน้า Select
  };

  return (
    <div className="container">
      <div className="form-box">
        <div className="avatar-section">
          {image && <img src={image} alt={role} className="avatar" />}
          <input
            type="text"
            placeholder="ENTER YOUR NAME"
            className="input-box"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="select-button"
            onMouseEnter={playHoverSound}
            onClick={handleSelect}
          >
            SELECT
          </button>
        </div>

        <div className="text-area-section">
          <div className="text-area-box">
            <h2 className="title">STRATEGY</h2>
            <textarea
              placeholder="ENTER YOUR STRATEGY"
              className="text-area"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
            />
          </div>
          <div className="text-area-box">
            <h2 className="title">DEFENSE</h2>
            <textarea
              placeholder="ENTER YOUR DEFENSE"
              className="text-area"
              value={defense}
              onChange={(e) => setDefense(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyForm;
