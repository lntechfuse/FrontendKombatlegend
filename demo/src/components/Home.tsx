import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    // สร้าง Audio objects
    bgMusicRef.current = new Audio("/sounds/bg-music.mp3");
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.5;

    clickSoundRef.current = new Audio("/sounds/click.mp3");
    hoverSoundRef.current = new Audio("/sounds/hover.mp3");

    // ฟังก์ชัน enableAudio: จะถูกเรียกเมื่อมีการคลิกหรือสัมผัส
    const enableAudio = () => {
      if (!isMusicPlaying && bgMusicRef.current) {
        bgMusicRef.current
          .play()
          .then(() => {
            setIsMusicPlaying(true);
          })
          .catch((err) => console.log("Autoplay blocked:", err));
        // ลบ event listener เมื่อได้เรียกแล้ว
        window.removeEventListener("click", enableAudio);
        window.removeEventListener("touchstart", enableAudio);
      }
    };

    // เพิ่ม event listener สำหรับทั้ง click และ touchstart
    window.addEventListener("click", enableAudio);
    window.addEventListener("touchstart", enableAudio);

    return () => {
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("touchstart", enableAudio);
    };
  }, [isMusicPlaying]);

  const handleStart = () => {
    // หากเพลงพื้นหลังยังไม่เริ่มเล่น ให้ลองเล่นอีกครั้ง
    if (bgMusicRef.current && bgMusicRef.current.paused) {
      bgMusicRef.current.play().catch(err => console.log("Play error:", err));
    }
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(err => console.log("Click sound error:", err));
    }
    navigate("/mode");
  };

  const handleHover = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play().catch(err => console.log("Hover sound error:", err));
    }
  };

  return (
    <div className="game-menu">
      <button
        className="start-button"
        onMouseEnter={handleHover}
        onClick={handleStart}
      >
        START
      </button>
    </div>
  );
};

export default Home;
