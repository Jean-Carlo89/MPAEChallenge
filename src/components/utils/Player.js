import React, { useState, useEffect } from "react";
import styled from "styled-components"
import {BsFillPlayCircleFill,BsFillPauseCircleFill} from "react-icons/bs"


const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
   
      <PlayerButton onClick={toggle}>{playing ? <BsFillPauseCircleFill/>: <BsFillPlayCircleFill/>}</PlayerButton>
    
  );

  
};

const PlayerButton = styled.div`
  
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right:55px;
  cursor: pointer;
  svg{
    font-size: 75px;
    
  }

`
export default Player;