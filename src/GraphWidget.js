import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';
import MoreVertMenu from './MoreVertMenu'; // Import MoreVertMenu

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

const GraphWidget = ({ timeRange }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'My First dataset',
        data: [],
        fill: false,
        // backgroundColor: 'rgba(75,192,192,0.2)',
        // borderColor: 'rgba(75,192,192,1)',
        padding:20,
      },
    ],
  });
  const [isZoomed, setIsZoomed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor
  const chartRef = useRef(null);

  // Function to generate labels for past 30 minutes in hh:mm format at 1-minute intervals in IST
  const generateTimeLabels = (startTime, endTime) => {
    const labels = [];
    const offsetIST = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds

    for (let time = startTime.getTime(); time <= endTime.getTime(); time += 60 * 1000) {
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
    dataPoints: [],
  });

  useEffect(() => {
    // Initial data load
    const now = new Date();
    const startTime = new Date(now.getTime() - 30 * 60 * 1000); // 30 minutes ago
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
          // backgroundColor: 'rgba(75,192,192,0.2)',
          // borderColor: 'rgba(75,192,192,1)',
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

      // Keep only the last 30 minutes of data (30 minutes)
      if (dataRef.current.labels.length > 30) {
        dataRef.current.labels.shift();
        dataRef.current.dataPoints.shift();
      }

      const newData = {
        labels: dataRef.current.labels,
        datasets: [
          {
            label: 'My First dataset',
            data: dataRef.current.dataPoints,
            fill: false,
            // backgroundColor: 'rgba(75,192,192,0.2)',
            // borderColor: 'rgba(75,192,192,1)',
          },
        ],
      };
      setData(newData);
    }, 60000); // 1 minute interval

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const options = {
    responsive: true,
    animation: {
      duration: 0, // Disable all animations
    },
    plugins: {
      legend: {
        position: 'top',
      },
      zoom: {
        pan: {
          enabled: !isZoomed,
          mode: 'x',
        },
        zoom: {
          drag: {
            enabled: !isZoomed,
          },
          mode: 'x',
          onZoom: ({ chart }) => {
            setIsZoomed(true);
            chart.options.plugins.zoom.zoom.drag.enabled = false;
            chart.options.plugins.zoom.pan.enabled = false;
            chart.update();
          },
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: data.labels,
        ticks: {
          maxTicksLimit: 30, // Adjust the max ticks to fit 30 labels
          autoSkip: false,
        },
      },
    },
  };

  const resetZoom = () => {
    const chart = chartRef.current;
    chart.resetZoom();
    setIsZoomed(false);
    chart.options.plugins.zoom.zoom.drag.enabled = true;
    chart.options.plugins.zoom.pan.enabled = true;
    chart.update();
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

  const resetZoomButtonStyle = {
    position: 'absolute',
    top: '0px',
    right: '40px',
  };

  // Menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Filter data based on selected time range
  const filteredLabels = data.labels.slice(timeRange[0], timeRange[1] + 1);
  const filteredDataPoints = data.datasets[0].data.slice(timeRange[0], timeRange[1] + 1);
  const filteredData = {
    labels: filteredLabels,
    datasets: [
      {
        label: 'My First dataset',
        data: filteredDataPoints,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div style={{ position: 'relative', padding:20 }}>
      <div style={boxStyle}>
        <h2 style={titleStyle}>Data Graph Chart</h2>
        <MoreVertMenu
          anchorEl={anchorEl}
          handleMenuOpen={handleMenuOpen}
          handleMenuClose={handleMenuClose}
        />
        {isZoomed && (
          <IconButton style={resetZoomButtonStyle} onClick={resetZoom}>
            <RotateLeftRoundedIcon />
          </IconButton>
        )}
        <hr style={hrStyle} />
        <Line data={filteredData} options={options} ref={chartRef} />
      </div>
    </div>
  );
};

export default GraphWidget;