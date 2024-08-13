import React, { useState, useEffect } from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import IconButton from '@mui/material/IconButton';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import InputBase from '@mui/material/InputBase';
import GraphWidget from './GraphWidget.js';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Slider from '@mui/material/Slider';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Dialog from '@mui/material/Dialog';
import SettingsPopup from './SettingsPopup';

const drawerWidth = 170;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(10px)',
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(10px)',
      },
    }),
  }),
);

const SearchBar = ({ expanded, onToggleSearch }) => {
  const [search, setSearch] = React.useState('');
  const [searchData, setSearchData] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(-1);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (searchData.length > 0) {
      if (e.key === 'ArrowUp' && selectedItem > 0) {
        setSelectedItem((prev) => prev - 1);
      } else if (e.key === 'ArrowDown' && selectedItem < searchData.length - 1) {
        setSelectedItem((prev) => prev + 1);
      } else if (e.key === 'Enter' && selectedItem >= 0) {
        const url = searchData[selectedItem].show.url;
        window.open(url, '_self');
      } else {
        setSelectedItem(-1);
      }
    }
  };

  React.useEffect(() => {
    if (search !== '') {
      fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
        .then((res) => res.json())
        .then((data) => {
          const filteredData = data.filter(
            (item) => item.show.name.toLowerCase().includes(search.toLowerCase())
          );
          setSearchData(filteredData);
        })
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      setSearchData([]);
    }
  }, [search]);

  if (!expanded) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <InputBase
        sx={{
          ml: 1,
          flex: 4,
          border: '1px solid #FFFFFF',
          borderRadius: '14px',
          padding: '3px',
          '& .MuiInputBase-input::placeholder': { color: '#FFFFFF' },
          width: expanded ? '220px' : '0px',
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          mb: '21px',
        }}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        value={search}
        onKeyDown={handleKeyDown}
      />
      {searchData.length > 0 && expanded && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            right: 45,
            bgcolor: 'background.paper',
            zIndex: 1,
            width: '200px',
            maxHeight: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            mt: 1.5,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {searchData.slice(0, 8).map((data, index) => (
            <a
              href={data.show.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '9px',
                backgroundColor: selectedItem === index ? 'rgba(0,0,0,0.1)' : 'transparent',
                textDecoration: 'none',
                color: 'black',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              onMouseEnter={() => setSelectedItem(index)}
              onMouseLeave={() => setSelectedItem(-1)}
            >
              {data.show.name}
            </a>
          ))}
        </Box>
      )}
    </Box>
  );
};

const TimeRangeFilterBar = ({ timeRange, handleSliderChange, handleClose }) => {
  const theme = useTheme();


  const generateMarks = () => {
    const marks = [];
    for (let i = 0; i <= 1440; i += 60) {
      marks.push({ value: i });
    }
    return marks;
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#724385", height: '40px', top: '45px', zIndex: theme => theme.zIndex.drawer + 2 }}>
      <Toolbar sx={{ minHeight: '40px', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', mb: '20px' }}>
          <Slider
            className="custom-slider"
            value={timeRange}
            onChange={handleSliderChange}
            valueLabelDisplay="off"
            step={1}
            min={0}
            max={1440}
            marks={generateMarks()}
            aria-labelledby="time-slider"
            sx={{
              width: '100%',
              '& .MuiSlider-rail': {
                backgroundColor: '#FF5733',
                height: '4px',
                opacity: 0.8,
              },
              '& .MuiSlider-track': {
                backgroundColor: '#00BFFF',
                height: '4px',
              },
              '& .MuiSlider-thumb': {
                backgroundColor: '#FF0000',
                height: '12px',
                width: '12px',
              },
              '& .MuiSlider-valueLabel': {
                backgroundColor: 'transparent',
                color: '#000000',
                fontWeight: 'bold',
              },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [timeRange, setTimeRange] = React.useState([0, 1440]);
  const [showTimeFilter, setShowTimeFilter] = useState(false);
  const [searchExpanded, setSearchExpanded] = React.useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCurrentTime = (time) => {
    const options = { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(time);
  };

  const formatCurrentDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return new Intl.DateTimeFormat('en-IN', options).format(date);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSliderChange = (event, newValue) => {
    setTimeRange(newValue);
  };

  const handleToggleTimeFilter = () => {
    setShowTimeFilter(!showTimeFilter);
    setSearchExpanded(false);
  };

  const handleToggleSearch = (expanded) => {
    setSearchExpanded(expanded);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const formatTimeRange = (range) => {
    const [start, end] = range;
    const currentDate = new Date().toLocaleDateString();
    const startHours = Math.floor(start / 60);
    const startMinutes = start % 60;
    const endHours = Math.floor(end / 60);
    const endMinutes = end % 60;

    return `${currentDate}: ${startHours}h ${startMinutes}m to ${currentDate}: ${endHours}h ${endMinutes}m`;
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#fafafa',backgroundSize: 'cover',backgroundPosition: 'center',minHeight: '100vh', }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#724385", height: '45px',padding: 0, overflow: 'hidden', boxSizing: 'border-box'  }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label={open ? "close drawer" : "open drawer"}
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            sx={{ mb: '25px', ml:'-15px' }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ mb: '25px', ml: '15px' }}>
            My Application
          </Typography>

          <Typography variant="subtitle1" noWrap component="div" sx={{ mb: '20px', ml: '20px' }}>
            {formatCurrentDate(new Date())} {formatCurrentTime(currentTime)} (IST)
          </Typography>

          <Typography variant="subtitle1" noWrap component="div" sx={{ flexGrow: 1, mb: '20px', ml: '20px' }}>
            Selected Time Range: {formatTimeRange(timeRange)}
          </Typography>

          <SearchBar expanded={searchExpanded} onToggleSearch={handleToggleSearch} />
          <IconButton
            color="inherit"
            onClick={() => setSearchExpanded(!searchExpanded)}
            aria-label="toggle search"
            sx={{ mb: '25px' }}
          >
            <SearchTwoToneIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleToggleTimeFilter}
            aria-label="toggle filter"
            sx={{ mb: '25px' }}
          >
            <FilterAltTwoToneIcon />
          </IconButton>

	   <IconButton
            color="inherit"
            aria-label="toggle filter"
            sx={{ mb: '25px' }}
          >
            <NotificationsIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
      {showTimeFilter && (
        <TimeRangeFilterBar
          timeRange={timeRange}
          handleSliderChange={handleSliderChange}
        />
      )}
      <Drawer variant="permanent" open={open} sx={{maxHeight:'100px'}}>
        <DrawerHeader />
        <List sx={{ mt: -3, mb: -2,}}>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{width:'20px'}}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mb: 55, width: '100%', maxWidth: '100%', flexShrink: 0, transform: 'translateZ(0)'}} />

        <List sx={{ mt: -1, mb: -2, width: '100%', maxWidth: '100%', boxSizing: 'border-box', }}>
          {['Settings'].map((text) => (
            <ListItem key={text} disablePadding button onClick={handleDialogOpen} sx={{ display: 'block', width: '100%',boxSizing: 'border-box'}}>
              <ListItemButton
                sx={{
                  minHeight: 20,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1.5,
                }}
              >
                <SettingsOutlinedIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    fontSize: 23,
                    ml: 0.7,
		                position: 'relative',
		                transform: 'translateZ(0)',
                  }}
                />
                <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box style={{ display:'flex', flexWrap: 'wrap' }}>
	        <Dialog open={dialogOpen} onClose={handleDialogClose}>
             <SettingsPopup open={dialogOpen} onClose={handleDialogClose} />
          </Dialog>
          <GraphWidget timeRange={timeRange} />
          <GraphWidget timeRange={timeRange} />
          <GraphWidget timeRange={timeRange} />
        </Box>
      </Box>
    </Box>
  );
}


