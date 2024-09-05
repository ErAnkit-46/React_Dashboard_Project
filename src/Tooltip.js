import React, { useState } from 'react';

  const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [timer, setTimer] = useState(null);
  const [clicked, setClicked] = useState(false);

  const showTooltip = (e) => {
    if (clicked) return; 
    const tooltipWidth = 50;
    setPosition({ 
      top: e.target.offsetTop + e.target.offsetHeight + 5,
      left: e.target.offsetLeft + e.target.offsetWidth / 2 - tooltipWidth / 2,
    });
    setTimer(setTimeout(() => setVisible(true), 1000));
  };

  const hideTooltip = () => {
    clearTimeout(timer);
    setTimer(null);
    setVisible(false);
  };

  const handleClick = () => {
    setClicked(true); 
    hideTooltip();
  };

  const handleMouseLeave = () => {
    setClicked(false); 
    hideTooltip();
  };

  return (
    <div 
      style={{ position: 'relative' }} 
      onMouseEnter={showTooltip} 
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
      {visible && (
        <div 
          style={{
            position: 'absolute',
            top: position.top + 'px',
            left: position.left + 'px',
            padding: '2px 6px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderRadius: '2px',
            border: '1px solid #000000',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            fontSize: '12px',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;