import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Avatar, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const DrawerWithProfile = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          p: 2,
          textAlign: 'center',
        }}
      >
        <Avatar sx={{ mx: 'auto', mb: 1 }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography variant="body1">John Doe</Typography>
      </Box>
    </Drawer>
  );
};

export default DrawerWithProfile;

