import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { UserContext } from './MyProfileContent';
import { Box, Divider } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

function SwitchAccount() {
  const { email } = useContext(UserContext);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true); // You can update this state based on the actual user status

  const handleSwitchAccount = () => {
    navigate('/');
  };

  return (
    <Box alignItems="flex-start" display="flex">
      <List component="nav">
        <ListItem
          sx={{
            color: '#ffffff',
            marginLeft: '-16px',
            width: '318px',
            '&:hover': {
              backgroundColor: '#3a475e',
            },
          }}
        >
          <ListItemText primary={email} sx={{ color: '#ffffff' }} />
          {isActive ? (
            <CheckCircleOutlineIcon sx={{ color: 'rgb(4, 255, 82)' }} />
          ) : (
            <CancelRoundedIcon sx={{ color: 'rgb(255, 0, 0)' }} /> // Set color to red for inactive state
          )}
        </ListItem>
        <Divider />
        <ListItem
          button
          sx={{
            marginLeft: '-16px',
            width: '318px',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#3a475e',
            },
          }}
          onClick={handleSwitchAccount}
        >
          <ListItemText primary="Switch Account" sx={{ color: '#ffffff' }} />
          <CompareArrowsIcon />
        </ListItem>
      </List>
    </Box>
  );
}

export default SwitchAccount;

