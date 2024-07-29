import React, { useState, useRef, useEffect } from 'react';
import { IconButton, Box, Typography, Slider } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { CSSTransition } from 'react-transition-group';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  '@keyframes appear': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  recordingBoxEnter: {
    opacity: 0,
    transform: 'translateY(20px)',
  },
  recordingBoxEnterActive: {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 300ms, transform 300ms',
  },
  recordingBoxExit: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  recordingBoxExitActive: {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 300ms, transform 300ms',
  },
});

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
  height: '35px',
}));

const Timer = styled(Typography)(({ theme }) => ({
  marginLeft: '8px',
  color: '#606060',
  fontWeight: 'bold',
}));

const Waveform = styled(Slider)(({ theme }) => ({
  width: '80px',
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

const ShadowBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  background: '#FFFFFF',
  borderRadius: '24px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginLeft: '8px',
  height: '35px',
}));

const MicControls = ({ onRecordStart, onRecordStop, onPause, onResume }) => {
  const classes = useStyles();
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [blob, setBlob] = useState(null);
  const [showControls, setShowControls] = useState(false);
  const [timer, setTimer] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pausedTime, setPausedTime] = useState(0); // Track paused time
  const [audioPlaying, setAudioPlaying] = useState(false); // Track if audio is playing
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(new Audio());
  const intervalRef = useRef(null);
  const audioIntervalRef = useRef(null);

  useEffect(() => {
    if (paused) {
      clearInterval(intervalRef.current); // Pause the timer when recording is paused
    } else if (recording) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000); // Update timer every second
    }
    return () => clearInterval(intervalRef.current);
  }, [recording, paused]);

  useEffect(() => {
    audioRef.current.ontimeupdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };
  }, []);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    if (paused && mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
    } else {
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
    }

    setRecording(true);
    setPaused(false);
    setShowControls(true);
    setTimer(pausedTime); // Continue from paused time

    if (onRecordStart) onRecordStart();
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
    setPaused(false);
    clearInterval(intervalRef.current);

    if (onRecordStop) onRecordStop();
  };

  const handlePauseRecording = () => {
    if (mediaRecorderRef.current && recording && !paused) {
      mediaRecorderRef.current.stop(); // Stop the recording
      setPaused(true);
      setPausedTime(timer); // Save the paused time
      clearInterval(intervalRef.current);

      if (onPause) onPause();
    }
  };

  const handleResumeRecording = () => {
    if (!recording || !paused) return; // Check if not recording or not paused

    handleStartRecording(); // Restart recording from the paused time
    setPaused(false);

    if (onResume) onResume();
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
    setPausedTime(0); // Reset paused time
    setAudioPlaying(false); // Reset audio playing state
    clearInterval(intervalRef.current);
    clearInterval(audioIntervalRef.current); // Clear the audio timer interval
  };

  const handlePlayPauseAudio = () => {
    if (audioRef.current && audioRef.current.readyState === 4) {
      if (audioPlaying) {
        audioRef.current.pause();
        clearInterval(audioIntervalRef.current);
      } else {
        audioRef.current.currentTime = 0; // Reset to start
        setTimer(0); // Reset timer
        audioRef.current.play();

        audioIntervalRef.current = setInterval(() => {
          setTimer((prev) => prev + 1);
        }, 1000); // Start the timer when audio plays
      }
      setAudioPlaying(!audioPlaying); // Toggle the play/pause state
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

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {!recording && !blob ? (
        <MicButton onClick={handleStartRecording}>
          <MicIcon />
        </MicButton>
      ) : (
        <CSSTransition
          in={showControls}
          timeout={300}
          classNames={{
            enter: classes.recordingBoxEnter,
            enterActive: classes.recordingBoxEnterActive,
            exit: classes.recordingBoxExit,
            exitActive: classes.recordingBoxExitActive,
          }}
          unmountOnExit
        >
          <RecordingBox>
            <IconButton onClick={handleDeleteRecording}>
              <DeleteIcon style={{ color: '#606060' }} />
            </IconButton>
            {paused ? (
              <ShadowBox>
                <IconButton onClick={handlePlayPauseAudio}>
                  {audioPlaying ? (
                    <PauseIcon style={{ color: '#606060' }} />
                  ) : (
                    <PlayArrowIcon style={{ color: '#606060' }} />
                  )}
                </IconButton>
                <Timer>{formatTime(timer)}</Timer>
                <Waveform
                  value={currentTime}
                  min={0}
                  max={duration}
                  onChange={handleSliderChange}
                />
              </ShadowBox>
            ) : (
              <>
                <Timer>{formatTime(timer)}</Timer>
                <Waveform
                  value={currentTime}
                  min={0}
                  max={duration}
                  onChange={handleSliderChange}
                />
              </>
            )}
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
        </CSSTransition>
      )}
    </Box>
  );
};

export default MicControls;
