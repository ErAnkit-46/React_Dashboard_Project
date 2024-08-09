// MoreVertMenu.js
import React, { useState } from 'react';
import {
  IconButton, Menu, MenuItem, Grow
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MoreVertMenu = ({ onOptionSelect }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    handleMenuClose();
    onOptionSelect(option);
  };

  return (
    <div>
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        TransitionComponent={Grow}
        PaperProps={{
          style: {
            transformOrigin: anchorEl ? 'center top' : 'center bottom',
            marginLeft: '-86px', 
            marginTop: '10px', 
          },
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick('Contact info')}>Contact info</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Select messages')}>Select messages</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Mute notifications')}>Mute notifications</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Clear chat')}>Clear chat</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Delete chat')}>Delete chat</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Block')}>Block</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Report')}>Report</MenuItem>
      </Menu>
    </div>
  );
};

export default MoreVertMenu;
