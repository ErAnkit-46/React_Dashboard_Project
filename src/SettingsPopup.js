import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import LaptopMacRoundedIcon from '@mui/icons-material/LaptopMacRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SwitchAccountContent from './SwitchAccountContent';
import DeleteAccountContent from './DeleteAccountContent';
import ChangePasswordContent from './ChangePasswordContent';
import { useNavigate } from 'react-router-dom';
import { MyProfileContent } from './MyProfileContent';
import { ThemeSettings } from './ThemeSettings';
import  Chatbox  from './Chatbox';
import TelegramIcon from '@mui/icons-material/Telegram';
import Tooltip from './Tooltip';

const SettingsPopup = ({ open, onClose }) => {
  const [selectedItem, setSelectedItem] = useState('General');
  const [language, setLanguage] = useState('en');
  const [themeMode, setThemeMode] = useState('dark');
  const [navigationHistory, setNavigationHistory] = useState(['General']);
  const navigate = useNavigate();

  const listItemStyle = (item) => ({
    padding: '10px 10px',
    paddingTop: item === 'General' ? '0' : '8px',
    backgroundColor: selectedItem === item ? '#333F48' : 'inherit',
    color: selectedItem === item ? '#FFFFFF' : '#B0BEC5',
    borderLeft: selectedItem === item ? '4px solid #00FF00' : '4px solid transparent',
    '&:hover': {
      backgroundColor: '#2C3E50',
    },
    marginLeft: '0px',
    
  });

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleThemeChange = (event) => {
    setThemeMode(event.target.value);
  };

  const handleBackToSettings = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); 
      setSelectedItem(newHistory[newHistory.length - 1]);
      setNavigationHistory(newHistory);
    } else {
      setSelectedItem('General'); 
      setNavigationHistory(['General']);
    }
  };

  const handleListItemClick = (item) => {
    if (selectedItem !== item) {
      setSelectedItem(item);
      setNavigationHistory([...navigationHistory, item]); 
    }
  };

const handleLogout = () => {
  localStorage.removeItem('token'); // Clear the token
  navigate('/'); // Redirect to login page

};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" }}
      PaperProps={{
        sx: {
          position: 'absolute',
          bottom: '5px',
          left: '5px',
          margin: 0,
          borderRadius: '8px',
          width: '480px',
          height: '470px',
          backgroundColor: '#212F3D',
          boxShadow: '0px 4px 8px rgba(38, 50, 56, 0.08)',
          color: '#FFFFFF',
        },
      }}
    >
      <DialogContent dividers sx={{ padding: 0 }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
              <List sx={{ padding: 0 }}>
              <Tooltip text="General Settings">
                <ListItem button onClick={() => handleListItemClick('General')} sx={listItemStyle('General')}>
                  <LaptopMacRoundedIcon sx={{ marginRight: '8px' }} />
                  <ListItemText primary="General" />
                  </ListItem>
              </Tooltip>
                <Divider />
              <Tooltip text="Privacy Settings">
                <ListItem button onClick={() => handleListItemClick('Privacy')} sx={listItemStyle('Privacy')}>
                  <KeyRoundedIcon sx={{ marginRight: '8px' }} />
                  <ListItemText primary="Privacy" />
                </ListItem>
              </Tooltip>
                <Divider />
              <Tooltip text="Appearance Settings">
                <ListItem button onClick={() => handleListItemClick('Appearance')} sx={listItemStyle('Appearance')}>
                  <BorderColorRoundedIcon sx={{ marginRight: '8px' }} />
                  <ListItemText primary="Appearance" />
                </ListItem>
              </Tooltip>
	              <Divider />
              <Tooltip text="Chatbox">
                <ListItem button onClick={() => handleListItemClick('Chatbox')} sx={listItemStyle('Chatbox')}>
                  <TelegramIcon sx={{ marginRight: '8px' }} />
                  <ListItemText primary="Chatbox" />
                </ListItem>
              </Tooltip>
                <Divider />
              <Tooltip text="Notifications">
                <ListItem button onClick={() => handleListItemClick('Notifications')} sx={listItemStyle('Notifications')}>
                  <NotificationsNoneRoundedIcon sx={{ marginRight: '8px' }} />
                  <ListItemText primary="Notifications" />
                </ListItem>
              </Tooltip>
                <Divider />
              <Tooltip text="Help">
                <ListItem button onClick={() => handleListItemClick('Help')} sx={listItemStyle('Help')}>
                  <PriorityHighRoundedIcon sx={{ marginRight: '8px' }} />
                  <ListItemText primary="Help" />
                </ListItem>
              </Tooltip>
              </List>
            </Box>
            <Tooltip text="My Profile" >
            <ListItem button onClick={() => handleListItemClick('My Profile')} sx={{ ...listItemStyle('My Profile'), marginTop: 'auto' }}>
              <LaptopMacRoundedIcon sx={{ marginRight: '8px' }} />
              <ListItemText primary="My Profile" />
            </ListItem>
            </Tooltip>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#546E7A', height: '100%' }} />
          <Grid item xs={7} ml={2} sx={{ height: '100%', position: 'relative' }}>
            {selectedItem === 'General' ? (
              <Box display="flex" flexDirection="column" mt={2}>
                <Typography variant="h6" mb={2}>General Settings</Typography>
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel sx={{ color: '#B0BEC5' }}>Language</InputLabel>
                  <Select
                    value={language}
                    onChange={handleLanguageChange}
                    label="Language"
                    sx={{
                      color: '#FFFFFF',
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#546E7A',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00FF00',
                      },
                      '.MuiSvgIcon-root': {
                        color: '#FFFFFF',
                      },
                    }}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                  </Select>
                </FormControl>
              </Box>
        	
        ) : selectedItem === 'Appearance' ? (
              <Box>
                <Typography variant="h6" mt={2}>Appearance Content</Typography>
                <ThemeSettings />
              </Box>


	 ) : selectedItem === 'Chatbox' ? (
              <Box>
                <Typography variant="h6" mt={2} >Chat Content</Typography>
                <Chatbox/>
              </Box>


	    ) : selectedItem === 'Privacy' ? (
              <Box display="flex" alignItems="flex-start" flexDirection="column" mt={0}>
                {/* <Typography variant="h6" sx={{ textAlign: 'center' }}>Privacy Settings</Typography> */}
                <Typography variant="h6" mt={2} >Privacy Settings</Typography>
                      <ListItem button onClick={() => handleListItemClick('Change Password')} 
		    sx={{...listItemStyle('Change Password'),marginLeft: '-15px',marginTop: '10px',width: '318px'}}>
                  <ListItemText primary="Change Password" />
                  <IconButton onClick={() => handleListItemClick('Change Password')}>
                    <KeyboardArrowRightRoundedIcon sx={{ color: '#B0BEC5' }} />
                  </IconButton>
                </ListItem>
                <Divider />
                <ListItem button onClick={() => handleListItemClick('Switch Account',)} 
		    sx={{...listItemStyle('Switch Account'), marginLeft: '-15px',width: '318px'}}>
                  <ListItemText primary="Switch Account" />
                  <IconButton onClick={() => handleListItemClick('Switch Account')}>
                    <KeyboardArrowRightRoundedIcon sx={{ color: '#B0BEC5' }} />
                  </IconButton>
                </ListItem>
                <Divider />
                <ListItem button onClick={() => handleListItemClick('Delete Account')} 
		    sx={{...listItemStyle('Delete Account'), marginLeft: '-15px',width: '318px'}}>
                  <ListItemText primary="Delete Account" />
                  <IconButton onClick={() => handleListItemClick('Delete Account')}>
                    <KeyboardArrowRightRoundedIcon sx={{ color: '#B0BEC5' }} />
                  </IconButton>
                </ListItem>
                <Divider />
              </Box>
	     ) : selectedItem === 'My Profile' ? (
              <Box display="flex" alignItems="center" flexDirection="column" mt={2}>
                {/* <Typography variant="h6" mt={2}My Profile Content</Typography> */}
                <MyProfileContent /> {/* Render MyProfileContent component */}
              </Box>
            ): (
	      <Box display="flex" alignItems="center" flexDirection="column" mt={2}>
              	<Typography variant="h6">{selectedItem} Content</Typography>
	      </Box>
	    )}
		

	  {selectedItem === 'Change Password' ? (
                <Box display="flex" flexDirection="column" mt={2}>
                        <ChangePasswordContent />
                </Box>
                ) : null}

	  {selectedItem === 'Switch Account' ? (
        	<Box display="flex" flexDirection="column" mt={2}>
			<SwitchAccountContent />
		</Box>
		) : null}


	  {selectedItem === 'Delete Account' ? (
                <Box display="flex" flexDirection="column" mt={2}>
                        <DeleteAccountContent />
                </Box>
                ) : null}

            {['Change Password', 'Switch Account', 'Delete Account'].includes(selectedItem) && (
              <Box sx={{ position: 'absolute', top: 7, left: -3 }}>
                <IconButton onClick={handleBackToSettings}>
                  <ArrowBackRoundedIcon fontSize="large" sx={{ color: '#FFFFFF' }} />
                </IconButton>
              </Box>
            )}
           
           <Box sx={{ position: 'absolute', bottom: 7, right: -3 }}>
           <Tooltip text="LogOut" >
              <IconButton color="error" onClick={handleLogout}>
                <PowerSettingsNewRoundedIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            </Box>
            
          </Grid>
        </Grid>
      </DialogContent>
  	</Dialog>
  );
};

export default SettingsPopup;