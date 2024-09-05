import React, { useState, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';

const MoreVertMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const [hovered, setHovered] = useState(false);

  const graphRef = useRef(null);
  const reportRef = useRef(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenSubMenu(null);
    setSubMenuAnchorEl(null);
  };

  const handleSubMenuOpen = (event, subMenu, ref) => {
    setHovered(true);
    setOpenSubMenu(subMenu);
    setSubMenuAnchorEl(ref.current);
  };

  const handleSubMenuClose = () => {
    setHovered(false);
    setTimeout(() => {
      if (!hovered) {
        setOpenSubMenu(null);
        setSubMenuAnchorEl(null);
      }
    }, 200); // Delay to prevent accidental close
  };

  const handleSubOptionSelect = (option) => {
    console.log(`Selected: ${option}`);
    handleMenuClose();
  };

  const getSubMenuPosition = (ref) => {
    if (ref) {
      const rect = ref.getBoundingClientRect();
      return {
        top: rect.top,
        left: rect.right,
      };
    }
    return { top: 0, left: 0 };
  };

  const handleMenuItemEnter = (event, subMenu, ref) => {
    if (subMenu) {
      handleSubMenuOpen(event, subMenu, ref);
    } else {
      setOpenSubMenu(null);
      setSubMenuAnchorEl(null);
    }
  };

  return (
    <div>
      <IconButton
        style={{ position: 'absolute', top: '0px', right: '0px' }}
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            backgroundColor: '#ffffff',
            color: '#000000',
            marginLeft: '-108px',
          },
        }}
      >
        <MenuItem
          ref={graphRef}
          onMouseEnter={(event) => handleMenuItemEnter(event, 'graph', graphRef)}
          onMouseLeave={handleSubMenuClose}
        >
          Graph Widget
          <ArrowRightRoundedIcon style={{ marginLeft: 'auto' }} />
        </MenuItem>
        <MenuItem
          onMouseEnter={(event) => handleMenuItemEnter(event)}
          onClick={handleMenuClose}
        >
          Compare Graph
        </MenuItem>
        <MenuItem
          ref={reportRef}
          onMouseEnter={(event) => handleMenuItemEnter(event, 'report', reportRef)}
          onMouseLeave={handleSubMenuClose}
        >
          Generate Report
          <ArrowRightRoundedIcon style={{ marginLeft: 'auto' }} />
        </MenuItem>
        <MenuItem
          onMouseEnter={(event) => handleMenuItemEnter(event)}
          onClick={handleMenuClose}
        >
          Help
        </MenuItem>
      </Menu>

      {/* Sub-menu */}
      <Popper
        open={Boolean(openSubMenu)}
        anchorEl={null}
        placement="right-start"
        transition
        style={{
          position: 'absolute',
          top: subMenuAnchorEl ? getSubMenuPosition(subMenuAnchorEl).top : 0,
          left: subMenuAnchorEl ? getSubMenuPosition(subMenuAnchorEl).left : 0,
          zIndex: 1300,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleSubMenuClose}
      >
        <Paper style={{ padding: '8px' }}>
          <MenuList>
            {openSubMenu === 'graph' && (
              <>
                <MenuItem onClick={() => handleSubOptionSelect('Graph Option 1')}>Graph Option 1</MenuItem>
                <MenuItem onClick={() => handleSubOptionSelect('Graph Option 2')}>Graph Option 2</MenuItem>
              </>
            )}
            {openSubMenu === 'report' && (
              <>
                <MenuItem onClick={() => handleSubOptionSelect('Report Option 1')}>Report Option 1</MenuItem>
                <MenuItem onClick={() => handleSubOptionSelect('Report Option 2')}>Report Option 2</MenuItem>
              </>
            )}
          </MenuList>
        </Paper>
      </Popper>
    </div>
  );
};

export default MoreVertMenu;
