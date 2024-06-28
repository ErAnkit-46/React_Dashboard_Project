import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraphWidget = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'My First dataset',
        data: [],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });
  const openMenu = Boolean(anchorEl);
  const openDropdown = Boolean(dropdownAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDropdownAnchorEl(null);
  };

  const handleDropdownClick = (event) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  // Function to generate labels for past 4 hours in hh:mm format at 15-minute intervals in IST
  const generateTimeLabels = (startTime, endTime) => {
    const labels = [];
    const offsetIST = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds

    for (let time = startTime.getTime(); time <= endTime.getTime(); time += 15 * 60 * 1000) {
      const labelTime = new Date(time + offsetIST);
      const hours = labelTime.getUTCHours().toString().padStart(2, '0');
      const minutes = labelTime.getUTCMinutes().toString().padStart(2, '0');
      labels.push(`${hours}:${minutes}`);
    }
    return labels;
  };

  // Ref to store data points across updates
  const dataRef = useRef({
    labels: [],
    dataPoints: []
  });

  useEffect(() => {
    // Initial data load
    const now = new Date();
    const startTime = new Date(now.getTime() - 4 * 60 * 60 * 1000);
    const initialLabels = generateTimeLabels(startTime, now);
    const initialDataPoints = Array.from({ length: initialLabels.length }, () => Math.floor(Math.random() * 100));

    dataRef.current.labels = initialLabels;
    dataRef.current.dataPoints = initialDataPoints;

    const initialData = {
      labels: dataRef.current.labels,
      datasets: [
        {
          label: 'My First dataset',
          data: dataRef.current.dataPoints,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
    setData(initialData);

    // Set interval to update data every 1 minute
    const interval = setInterval(() => {
      const now = new Date();
      const newLabel = generateTimeLabels(now, now)[0];
      const newDataPoint = Math.floor(Math.random() * 100);

      // Append new data point and label
      dataRef.current.labels.push(newLabel);
      dataRef.current.dataPoints.push(newDataPoint);

      const newData = {
        labels: dataRef.current.labels,
        datasets: [
          {
            label: 'My First dataset',
            data: dataRef.current.dataPoints,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      };
      setData(newData);
    }, 60000); // 1 minute interval

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: data.labels,
      },
    },
  };

  const boxStyle = {
    border: '1.5px solid #000',
    borderRadius: '10px',
    padding: '10px',
    width: '600px',
    height: '400px',
    position: 'relative',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  };

  const titleStyle = {
    position: 'absolute',
    top: '2px',
    left: '12px',
    margin: 0,
    fontSize: '14px',
    fontWeight: 'bold',
  };

  const hrStyle = {
    width: '100%',
    border: '1px solid #ddd',
    margin: '18px 0',
  };

  const settingsButtonStyle = {
    position: 'absolute',
    top: '-5px',
    right: '0px',
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={boxStyle}>
        <h2 style={titleStyle}>Data Graph Chart</h2>
        <IconButton style={settingsButtonStyle} onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleClose}>
            Widget Settings
            <IconButton
              onClick={handleDropdownClick}
              aria-haspopup="true"
              aria-owns={openDropdown ? 'dropright-menu' : undefined}
              size="small"
              style={{ marginLeft: '3px', color: 'black' }}
            >
              <ArrowRightRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            Compare Graph
            <IconButton
              onClick={handleDropdownClick}
              aria-haspopup="true"
              aria-owns={openDropdown ? 'dropright-menu' : undefined}
              size="small"
              style={{ marginLeft: '3px', color: 'black' }}
            >
              <ArrowRightRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>Generate Report</MenuItem>
          <MenuItem onClick={handleClose}>About</MenuItem>
        </Menu>
        <hr style={hrStyle} />
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default GraphWidget;

