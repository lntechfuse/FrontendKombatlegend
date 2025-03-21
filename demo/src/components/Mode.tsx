import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Mode.css";

const Mode: React.FC = () => {
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

  const handleClick = (path: string) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play();
    }
    if (path === "Duel") {
      navigate("/createroom"); 
    } else {
      navigate("/select");
    }
  };

  const handleHover = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play();
    }
  };

  return (
    <div className="container">
      <div className="button-group">
        <button className="button primary" onMouseEnter={handleHover} onClick={() => handleClick("Duel")}>
          Duel
        </button>
        <button className="button secondary" onMouseEnter={handleHover} onClick={() => handleClick("selec")}>
          Solitaire
        </button>
        <button className="button secondary" onMouseEnter={handleHover} onClick={() => handleClick("select")}>
          Auto
        </button>
      </div>
    </div>
  );
};

export default Mode;
