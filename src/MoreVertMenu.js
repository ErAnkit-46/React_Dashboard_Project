import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

const MoreVertMenu = ({ anchorEl, handleMenuOpen, handleMenuClose }) => {
  const [anchorElSubMenu, setAnchorElSubMenu] = useState(null);
  const [anchorElSubMenuItem, setAnchorElSubMenuItem] = useState(null);

  const handleSubMenuOpen = (event) => {
    setAnchorElSubMenu(event.currentTarget);
    setAnchorElSubMenuItem(event.currentTarget);
  };

  const handleSubMenuClose = () => {
    setAnchorElSubMenu(null);
    setAnchorElSubMenuItem(null);
  };

  return (
    <>
      <IconButton
        style={{ position: 'absolute', top: '-5px', right: '0px' }}
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onMouseOver={handleSubMenuOpen}
          onClick={handleMenuClose}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          Option 1
          <ArrowRightRoundedIcon />
        </MenuItem>
        <MenuItem
          onMouseOver={handleSubMenuOpen}
          onClick={handleMenuClose}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          Option 2
          <ArrowRightRoundedIcon />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
        <Menu
          anchorEl={anchorElSubMenuItem}
          open={Boolean(anchorElSubMenu)}
          onClose={handleSubMenuClose}
          style={{ marginTop: '0', marginLeft: '100px' }} // Adjust marginLeft to position the submenu
        >
          <MenuItem onClick={handleSubMenuClose}>Sub-Option 1</MenuItem>
          <MenuItem onClick={handleSubMenuClose}>Sub-Option 2</MenuItem>
        </Menu>
      </Menu>
    </>
  );
};

export default MoreVertMenu;
