import React, { useContext, useState, createContext } from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
  Switch,
} from '@mui/material';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isActive, setIsActive] = useState(true); // State to track account activation status

  return (
    <UserContext.Provider value={{ email, setEmail, profilePicture, setProfilePicture, isActive, setIsActive }}>
      {children}
    </UserContext.Provider>
  );
};

const MyProfileContent = () => {
  const { email, profilePicture, setProfilePicture, isActive, setIsActive } = useContext(UserContext);
  const [editNameMode, setEditNameMode] = useState(false);
  const [name, setName] = useState('Ankit Kumar Sahoo');
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewImageOpen, setViewImageOpen] = useState(false);

  const handleAvatarClick = (event) => {
    if (profilePicture) {
      setAnchorEl(event.currentTarget);
    } else {
      document.getElementById('fileInput').click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
        setAnchorEl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfilePicture(null);
    setAnchorEl(null);
  };

  const handleViewImage = () => {
    setViewImageOpen(true);
    setAnchorEl(null);
  };

  const handleViewImageClose = () => {
    setViewImageOpen(false);
  };

  const handleSaveName = () => {
    setEditNameMode(false);
  };

  const handleToggleAccount = () => {
    setIsActive(!isActive); // Toggle the account activation status
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="profile-content">
      <Box display="flex" alignItems="center" flexDirection="column" mt={2}>
        <Box position="relative">
          <Avatar src={profilePicture} sx={{ bgcolor: '#546E7A', width: 100, height: 100 }} />
          <IconButton
            onClick={handleAvatarClick}
            sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: '#212F3D', '&:hover': { bgcolor: '#333F48' } }}
          >
            <CameraAltRoundedIcon sx={{ color: '#FFFFFF' }} />
          </IconButton>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Box>
        <Box mt={2} textAlign="center" width="100%">
          {editNameMode ? (
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ flexGrow: 1, marginRight: '8px' }}
              />
              <Button variant="contained" color="primary" onClick={handleSaveName}>
                Save
              </Button>
            </Box>
          ) : (
            <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
              <Typography variant="body1" sx={{ marginRight: '8px' }}>{name}</Typography>
              <IconButton onClick={() => setEditNameMode(true)}>
                <EditRoundedIcon sx={{ color: '#FFFFFF' }} />
              </IconButton>
            </Box>
          )}
          <Typography variant="body2" sx={{ marginTop: '8px' }}>Email: {email}</Typography>
          <Box mt={2} display="flex" alignItems="center">
            <Typography variant="body2" sx={{ marginRight: '8px', fontSize: '1.2rem' }}>Account Status:</Typography>
            <Switch
              checked={isActive}
              onChange={handleToggleAccount}
              color="primary"
              inputProps={{ 'aria-label': 'toggle account status' }}
            />
            <Typography variant="body2" sx={{ marginLeft: '8px' }}>
              {isActive ? (
                <Box component="span" sx={{ color: 'green' }}>Active</Box>
              ) : (
                <Box component="span" sx={{ color: 'red' }}>Inactive</Box>
              )}
            </Typography>
          </Box>
          {profilePicture && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: '#212F3D',
                  color: '#FFFFFF',
                },
              }}
            >
              <MenuItem>
                <label htmlFor="fileInput" style={{ cursor: 'pointer', display: 'block', width: '100%' }}>Change Profile</label>
              </MenuItem>
              <MenuItem onClick={handleRemoveImage}>Remove Image</MenuItem>
              <MenuItem onClick={handleViewImage}>View Image</MenuItem>
            </Menu>
          )}
          <Dialog open={viewImageOpen} onClose={handleViewImageClose}>
            <DialogContent>
              <img src={profilePicture} alt="Profile" style={{ width: '100%' }} />
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </div>
  );
};

export { UserProvider, UserContext, MyProfileContent };

