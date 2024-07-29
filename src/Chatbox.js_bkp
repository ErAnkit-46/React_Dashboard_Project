// Chatbox.js
import React, { useState, useEffect } from 'react';
import {
  TextField, Button, List, ListItem, ListItemText, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
  Avatar, InputBase, Paper, Slide, Popover, Card, CardContent, CardMedia, CardActionArea, Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import MicControls from './mic'; // Import the MicControls component

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Chatbox = ({ currentUser, profilePictureUrl }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [chatActive, setChatActive] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [chatHistories, setChatHistories] = useState({});

  useEffect(() => {
    if (chatActive) {
      const chatHistory = chatHistories[recipientEmail] || { messages: [], selectedFiles: [] };
      setMessages(chatHistory.messages);
      setSelectedFiles(chatHistory.selectedFiles);
    }
  }, [chatActive, recipientEmail]);

  const handleSendMessage = () => {
    if (!currentUser || !currentUser.email) {
      console.error('currentUser is undefined or does not have an email property.');
      return;
    }

    if (message.trim() === '' && selectedFiles.length === 0) return;

    const newMessage = {
      sender: currentUser.email,
      recipient: recipientEmail,
      content: message,
      timestamp: new Date().toISOString(),
      files: selectedFiles,
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setMessage('');
    setSelectedFiles([]);

    setChatHistories((prev) => ({
      ...prev,
      [recipientEmail]: { messages: updatedMessages, selectedFiles: [] },
    }));
  };

  const handleStartChat = () => {
    if (recipientEmail.trim() === '') return;

    if (chatActive && recipientEmail) {
      setChatHistories((prev) => ({
        ...prev,
        [recipientEmail]: { messages, selectedFiles },
      }));
    }

    setMessage(''); 
    setSelectedFiles([]); 

    setChatActive(true);
    const chatHistory = chatHistories[recipientEmail] || { messages: [], selectedFiles: [] };
    setMessages(chatHistory.messages);
    setSelectedFiles(chatHistory.selectedFiles);
  };

  const handleCloseChat = () => {
    if (chatActive && recipientEmail) {
      setChatHistories((prev) => ({
        ...prev,
        [recipientEmail]: { messages, selectedFiles },
      }));
    }
    setChatActive(false);
  };

  const handleProfileClick = () => {
    setProfileOpen(true);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.native);
  };

  const handleEmojiOpen = (event) => {
    setEmojiAnchorEl(event.currentTarget);
  };

  const handleEmojiClose = () => {
    setEmojiAnchorEl(null);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const updatedFiles = [...selectedFiles, ...files];
    setSelectedFiles(updatedFiles);

    setChatHistories((prev) => ({
      ...prev,
      [recipientEmail]: { messages, selectedFiles: updatedFiles },
    }));
  };

  const handleFileRemove = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);

    setChatHistories((prev) => ({
      ...prev,
      [recipientEmail]: { messages, selectedFiles: updatedFiles },
    }));
  };

  const isSendButtonEnabled = message.trim() !== '' || selectedFiles.length > 0;

  return (
    <Box sx={{ width: '100%', maxWidth: 480, margin: 'auto', mt: 5 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Start Chat</Typography>
        <TextField
          label="Recipient Email"
          variant="outlined"
          fullWidth
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          sx={{ mt: 2, mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleStartChat}
        >
          Start Chat
        </Button>
      </Paper>
      <Dialog
        open={chatActive}
        onClose={handleCloseChat}
        fullWidth
        maxWidth="md"
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', p: 1, borderBottom: 1, borderColor: 'divider' }}>
          <Avatar
            sx={{ mr: 2, cursor: 'pointer' }}
            onClick={handleProfileClick}
            src={profilePictureUrl}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>{recipientEmail}</Typography>
          <IconButton sx={{ ml: 1 }} onClick={handleCloseChat}><CloseIcon /></IconButton>
          <IconButton sx={{ ml: 1 }}><SearchIcon /></IconButton>
          <IconButton sx={{ ml: 1 }}><MoreVertIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, backgroundImage: 'url(/path/to/your/background/image)', backgroundSize: 'cover', minHeight: 400 }}>
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {messages.map((msg, index) => (
              <Slide
                key={index}
                direction="left"
                in={true}
                mountOnEnter
                unmountOnExit
                >
                  <ListItem alignItems="flex-start" sx={{ justifyContent: msg.sender === currentUser?.email ? 'flex-end' : 'flex-start' }}>
                    <ListItemText
                      primary={msg.content}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {msg.sender}
                          </Typography>
                          {' — '}
                          {new Date(msg.timestamp).toLocaleString()}
                        </>
                      }
                      sx={{
                        bgcolor: msg.sender === currentUser?.email ? '#DCF8C6' : '#FFFFFF',
                        borderRadius: 2,
                        p: 1,
                        maxWidth: '75%',
                        wordWrap: 'break-word',
                        alignSelf: msg.sender === currentUser?.email ? 'flex-end' : 'flex-start',
                      }}
                    />
                  </ListItem>
                </Slide>
              ))}
            </List>
          </DialogContent>
          <DialogActions sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper
              component="form"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                p: '2px 4px',
                borderRadius: 2,
                border: '1px solid #ccc',
                mb: selectedFiles.length > 0 ? 2 : 0,
              }}
            >
              {selectedFiles.length > 0 && (
                <>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1, width: '100%' }}>
                    {selectedFiles.map((file, index) => (
                      <Card key={index} sx={{ maxWidth: 150, mx: 1, mb: 1, position: 'relative' }}>
                        <CardActionArea>
                          {file.type.startsWith('image/') ? (
                            <CardMedia
                              component="img"
                              height="100"
                              image={URL.createObjectURL(file)}
                              alt={file.name}
                            />
                          ) : (
                            <CardContent>
                              <Typography variant="body2" noWrap>
                                {file.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {(file.size / 1024).toFixed(2)} KB
                              </Typography>
                            </CardContent>
                          )}
                          <IconButton
                            size="small"
                            sx={{ position: 'absolute', top: 5, right: 5 }}
                            onClick={() => handleFileRemove(index)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </CardActionArea>
                      </Card>
                    ))}
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                      <IconButton component="label">
                        <AddRoundedIcon />
                        <input
                          type="file"
                          multiple
                          hidden
                          onChange={handleFileChange}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                  <Divider sx={{ width: '100%', mb: 1 }} />
                </>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <IconButton onClick={handleEmojiOpen}><InsertEmoticonIcon /></IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1, mr: 1 }}
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                {isSendButtonEnabled && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    sx={{ borderRadius: 20 }}
                  >
                    <SendIcon />
                  </Button>
                )}
                <IconButton component="label" sx={{ ml: 1 }}>
                  <AttachFileIcon />
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={handleFileChange}
                  />
                </IconButton>
                <MicControls
                  onRecordStart={() => console.log('Recording started')}
                  onRecordStop={() => console.log('Recording stopped')}
                  onPause={() => console.log('Recording paused')}
                  onPlay={() => console.log('Recording played')}
                />
              </Box>
            </Paper>
          </DialogActions>
        </Dialog>
        <Dialog open={profileOpen} onClose={handleProfileClose}>
          <DialogContent>
            {profilePictureUrl ? (
              <img src={profilePictureUrl} alt="Profile" style={{ width: '100%' }} />
            ) : (
              <Typography variant="h6" align="center">
                No Profile Photo
              </Typography>
            )}
          </DialogContent>
        </Dialog>
        <Popover
          open={Boolean(emojiAnchorEl)}
          anchorEl={emojiAnchorEl}
          onClose={handleEmojiClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Picker onSelect={handleEmojiClick} />
        </Popover>
      </Box>
    );
  };
  
  export default Chatbox;
  
