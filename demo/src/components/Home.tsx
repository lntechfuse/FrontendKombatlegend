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
    bgMusicRef.current = new Audio("/sounds/bg-music.mp3");
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.5;

    clickSoundRef.current = new Audio("/sounds/click.mp3");
    hoverSoundRef.current = new Audio("/sounds/hover.mp3");

 
    const enableAudio = () => {
      if (!isMusicPlaying && bgMusicRef.current) {
        bgMusicRef.current.play().catch(err => console.log("Autoplay blocked:", err));
        setIsMusicPlaying(true);
      }
      document.removeEventListener("click", enableAudio); // ลบ event เมื่อทำงานแล้ว
    };

    document.addEventListener("click", enableAudio); // ให้เริ่มเล่นเพลงเมื่อมีการคลิกหน้าเว็บ

    return () => {
      document.removeEventListener("click", enableAudio);
    };
  }, [isMusicPlaying]);

  const handleStart = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play();
    }
    navigate("/mode");
  };

  const handleHover = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play();
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
