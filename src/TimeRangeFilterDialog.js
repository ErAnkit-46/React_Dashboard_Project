import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import HelloWorld from './HelloWorld';
import Divider from '@mui/material/Divider';

const TimeRangeFilterDialog = ({ timeRange, handleSliderChange, open, onClose }) => {
  const theme = useTheme();

  const generateMarks = () => {
    const marks = [];
    for (let i = 0; i <= 1440; i += 60) {
      marks.push({ value: i });
    }
    return marks;
  };

  return (
      <Box sx={{ width: '100%', p: 2 }}>
        <Slider
          className="custom-slider"
          value={timeRange}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          step={1}
          min={0}
          max={1440}
          marks={generateMarks()}
          aria-labelledby="time-slider"
          sx={{
            width: '100%',
            '& .MuiSlider-rail': {
              backgroundColor: '#FF5733',
              height: '4px',
              opacity: 0.8,
            },
            '& .MuiSlider-track': {
              backgroundColor: '#00BFFF',
              height: '4px',
            },
            '& .MuiSlider-thumb': {
              backgroundColor: '#FF0000',
              height: '12px',
              width: '12px',
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: 'transparent',
              color: '#000000',
              fontWeight: 'bold',
            },
          }}
        />
        <Divider  sx={{ margin: '-10px ' }}/>
        <HelloWorld />
        <Box sx={{ p: 1.2}}>
          <Divider  sx={{ margin: '-10px ', marginTop: '165px' }}/>
        </Box>
        <Box sx={{ p: 1.2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={onClose} variant="outlined" sx={{ color: 'black', borderColor: 'black' }}>Cancel ankit</Button>
          <Button onClick={() => { /* Need to write logic */ }} variant="contained" color="primary">Apply</Button>
        </Box>
      </Box>
  );
};

export default TimeRangeFilterDialog;