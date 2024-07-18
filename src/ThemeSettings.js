// ThemeSettings.js
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';

// Create ThemeContext
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(localStorage.getItem('themeMode') || 'Use System Default');

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const handleThemeChange = (event) => {
    setThemeMode(event.target.value);
  };

  const theme = createTheme({
    palette: {
      mode: themeMode === 'dark' ? 'dark' : themeMode === 'light' ? 'light' : 'light', // Default to light mode for system default
    },
  });

  return (
    <ThemeContext.Provider value={{ themeMode, handleThemeChange }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

const ThemeSettings = () => {
  const { themeMode, handleThemeChange } = useContext(ThemeContext);

  return (
    <Box>
      <Typography variant="h6">Appearance Settings</Typography>
      <Box mt={2}>
        <Box>
          <Typography variant="subtitle1" sx={{ marginBottom: '2px' }}>
            MODES:
          </Typography>
          <RadioGroup
            aria-label="theme"
            name="theme"
            value={themeMode}
            onChange={handleThemeChange}
          >
            <FormControlLabel
              value="dark"
              control={<Radio />}
              label="Dark Mode"
            />
            <FormControlLabel
              value="light"
              control={<Radio />}
              label="Light Mode"
            />
            <FormControlLabel
              value="Use System Default"
              control={<Radio />}
              label="Use System Default"
            />
          </RadioGroup>
        </Box>
      </Box>
    </Box>
  );
};

export { ThemeProvider, ThemeSettings };

