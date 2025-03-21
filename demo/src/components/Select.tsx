import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Select.css";

const roles = ["MAGE", "WARRIOR", "TANK", "ASSASSIN", "CARRY"];
const images = [
  `${process.env.PUBLIC_URL}/Minion/Mage.png`,
  `${process.env.PUBLIC_URL}/Minion/Warrior.png`,
  `${process.env.PUBLIC_URL}/Minion/Tank.png`,
  `${process.env.PUBLIC_URL}/Minion/Assassin.png`,
  `${process.env.PUBLIC_URL}/Minion/Carry.png`
];

const Select: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  // เพิ่ม useRef สำหรับเสียงต่าง ๆ
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

  useEffect(() => {
    if (location.state?.resetFromMode) {
      console.log("Resetting selected roles from Mode...");
      localStorage.removeItem("selectedRoles");
      setSelectedRoles([]);
    } else {
      const storedSelected = localStorage.getItem("selectedRoles");
      if (storedSelected) {
        setSelectedRoles(JSON.parse(storedSelected));
      }
    }
  }, [location.state]);

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

  const handleSelect = (role: string, image: string) => {
    if (selectedRoles.includes(role)) return;

    playClickSound();
    const updatedSelectedRoles = [...selectedRoles, role];
    setSelectedRoles(updatedSelectedRoles);
    localStorage.setItem("selectedRoles", JSON.stringify(updatedSelectedRoles));

    navigate(`/strategy/${role.toLowerCase()}`, { state: { role, image } });
  };

  const handleReset = () => {
    playClickSound();
    localStorage.removeItem("selectedRoles");
    setSelectedRoles([]);
  };

  const handleBack = () => {
    playClickSound();
    navigate("/mode", { state: { resetFromSelect: true } });
  };

  const handleConfirm = () => {
    if (selectedRoles.length === 0) {
      setShowModal(true);
      return;
    }
    playClickSound();
    navigate("/wait");
  };

  return (
    <div className="select-container">
      <div className="character-grid">
        {roles.map((role, index) => (
          <div
            key={role}
            className={`character-card ${selectedRoles.includes(role) ? "selected" : ""}`}
          >
            <img
              src={images[index]}
              alt={role}
              className="character-image"
              onError={(e) => (e.currentTarget.src = "fallback.png")}
            />
            <p className="character-name">{role}</p>
            <button
              className="select-button"
              onMouseEnter={playHoverSound}
              onClick={() => handleSelect(role, images[index])}
              disabled={selectedRoles.includes(role)}
            >
              {selectedRoles.includes(role) ? "TAKEN" : "SELECT"}
            </button>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button className="back-button" onMouseEnter={playHoverSound} onClick={handleBack}>BACK</button>
        <button className="reset-button" onMouseEnter={playHoverSound} onClick={handleReset}>RESET</button>
        <button className="confirm-button" onMouseEnter={playHoverSound} onClick={handleConfirm}>CONFIRM</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>⚠️ Warning!</h2>
            <p>Please select at least one character before confirming.</p>
            <button className="modal-button" onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
