import React, { useState, useRef, useEffect } from 'react';
import { IconButton, Box, Typography, Slider } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete'; 
import { styled, keyframes } from '@mui/system';

const appear = keyframes`
  from {
  opacity: 0;
  transform: translateY(20px);
  }
  to {
  opacity: 1;
  transform: translateY(0);
  }
`;

const MicButton = styled(IconButton)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  backgroundColor: '#25D366',
  color: '#fff',
  '&:hover': {
  backgroundColor: '#128C7E',
  },
}));

const RecordingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  background: '#F5F5F5',
  borderRadius: '24px',
  marginLeft: '8px',
  animation: `${appear} 0.3s ease-in-out`,
  height: '35px', // Adjusted height
  Weight: '70px',
}));

const Timer = styled(Typography)(({ theme }) => ({
  marginLeft: '8px',
  color: '#606060',
  fontWeight: 'bold',
}));

const Waveform = styled(Slider)(({ theme }) => ({
  width: '80px', // Adjusted width
  height: '10px',
  marginLeft: '8px',
  '& .MuiSlider-thumb': {
  display: 'none',
  },
  '& .MuiSlider-rail': {
  backgroundColor: '#606060',
  opacity: 1,
  },
  '& .MuiSlider-track': {
  backgroundColor: '#606060',
  },
}));

const MicControls = ({ onRecordStart, onRecordStop, onPause, onResume }) => {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [blob, setBlob] = useState(null);
  const [showControls, setShowControls] = useState(false);
  const [timer, setTimer] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(new Audio());
  const intervalRef = useRef(null);

  useEffect(() => {
  return () => clearInterval(intervalRef.current);
  }, []);

  const handleStartRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorderRef.current = new MediaRecorder(stream);

  mediaRecorderRef.current.ondataavailable = (e) => {
    if (e.data.size > 0) {
    setBlob(e.data);
    audioRef.current.src = URL.createObjectURL(e.data);
    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
    };
    }
  };

  mediaRecorderRef.current.start();
  setRecording(true);
  setPaused(false);
  setShowControls(true);
  setTimer(0);

  intervalRef.current = setInterval(() => {
    setTimer((prev) => prev + 1);
  }, 1000);

  if (onRecordStart) onRecordStart();
  };

  const handleStopRecording = () => {
  mediaRecorderRef.current.stop();
  setRecording(false);
  setPaused(false);
  clearInterval(intervalRef.current);

  if (onRecordStop) onRecordStop();
  };

  const handlePauseRecording = () => {
  if (mediaRecorderRef.current && recording && !paused) {
    mediaRecorderRef.current.pause();
    setPaused(true);
    clearInterval(intervalRef.current);
    if (onPause) onPause();
  }
  };

  const handleResumeRecording = () => {
  if (mediaRecorderRef.current && recording && paused) {
    mediaRecorderRef.current.resume();
    setPaused(false);

    intervalRef.current = setInterval(() => {
    setTimer((prev) => prev + 1);
    }, 1000);

    if (onResume) onResume();
  }
  };

  const handleDeleteRecording = () => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }
  setBlob(null);
  setShowControls(false);
  setRecording(false);
  setPaused(false);
  setTimer(0);
  setCurrentTime(0);
  setDuration(0);
  clearInterval(intervalRef.current);
  };

  const handlePlayAudio = () => {
  if (audioRef.current && audioRef.current.readyState === 4) {
    audioRef.current.play();
  }
  };

  const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSliderChange = (event, newValue) => {
  setCurrentTime(newValue);
  audioRef.current.currentTime = newValue;
  };

  useEffect(() => {
  audioRef.current.ontimeupdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  }, []);

  return (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {!recording && !blob ? (
    <MicButton onClick={handleStartRecording}>
      <MicIcon />
    </MicButton>
    ) : (
    <RecordingBox>
      <IconButton onClick={handleDeleteRecording}>
      <DeleteIcon style={{ color: '#606060' }} />
      </IconButton>
      <IconButton onClick={handlePlayAudio}>
      <PlayArrowIcon style={{ color: '#606060' }} />
      </IconButton>
      <Timer>{formatTime(timer)}</Timer>
      <Waveform
      value={currentTime}
      min={0}
      max={duration}
      onChange={handleSliderChange}
      />
      {paused ? (
      <IconButton onClick={handleResumeRecording}>
        <MicIcon style={{ color: '#FF3B30' }} />
      </IconButton>
      ) : (
      <IconButton onClick={handlePauseRecording}>
        <PauseIcon style={{ color: '#FF3B30' }} />
      </IconButton>
      )}
    </RecordingBox>
    )}
  </Box>
  );
};

export default MicControls;
