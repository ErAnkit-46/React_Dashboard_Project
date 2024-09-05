import React from 'react';
import { Button, Grid, Typography, IconButton } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';


const TimeRangeSelector = () => {
  return (
    <div style={{ padding: 20,  position: 'relative' }}>
         <IconButton
        aria-label="more-options"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          color: '#1976d2',
          fontSize: '2rem',
        }}
      >
        <ChevronLeftRoundedIcon sx={{ fontSize: '2.4rem' }} />
      </IconButton>

      <Typography variant="h6" gutterBottom>
        Relative to Current Time
      </Typography>
      <Grid container spacing={1}>
        {[
          'Past 15 Minutes',
          'Past 1 Hour',
          'Past 4 Hours',
          'Past 1 Day',
          'Past 2 Days',
          'Past 1 Week',
          'Past 1 Month',
          'Past 3 Months',
        ].map((label, index) => (
          <Grid item key={index}>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: '#1976d2', 
                color: '#fff',              
                '&:hover': {
                  backgroundColor: '#115293', 
                },
              }}
            >
              {label}
            </Button>
          </Grid>
        ))}
      </Grid>

    
      <div style={{ marginTop: 20 }} />

    
      <Typography variant="h6" gutterBottom>
        Relative to Calendar Unit
      </Typography>
      <Grid container spacing={1}>
        {[
          'Today',
          'Yesterday',
          'This Hour',
          'This Week',
          'This Month',
          'This Year',
          'Last Hour',
          'Last Week',
          'Last Month',
          'Last Year',
        ].map((label, index) => (
          <Grid item key={index}>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: '#1976d2', 
                color: '#fff',               
                '&:hover': {
                  backgroundColor: '#115293', 
                },
              }}
            >
              {label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TimeRangeSelector;
