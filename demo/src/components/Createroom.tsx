import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Createroom.css";

const CreateRoom: React.FC = () => {
  const navigate = useNavigate();
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickSoundRef.current = new Audio("/sounds/click.mp3");
    hoverSoundRef.current = new Audio("/sounds/hover.mp3");
  }, []);

  const handleClick = (path: string) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play();
    }
    navigate(path);
  };

  const handleHover = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play();
    }
  };

  return (
    <div className="create-room-container">
      <div className="button-group">
        <button className="button" onMouseEnter={handleHover} onClick={() => handleClick("/Room")}>
          Create Room
        </button>
        <button className="button" onMouseEnter={handleHover} onClick={() => handleClick("/mode")}>
          Join
        </button>
        <button className="button" onMouseEnter={handleHover} onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
