import React from 'react';

const ErrorPopup = ({ message, onClose }) => {
  return (
    <div style={popupStyles}>
      <div style={popupContentStyles}>
        <span style={closeButtonStyles} onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

const popupStyles = {
  position: 'fixed',
  top: '-60px',
  right: '120px',
//   width: '300px',
  backgroundColor: '#ffdddd',
  color: '#d8000c',
  border: '1px solid #d8000c',
  borderRadius: '5px',
//   padding: '1px',
//   zIndex: '1000',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  display: 'flex',
//   justifyContent: 'space-between',
  alignItems: 'center'
};

const popupContentStyles = {
  display: 'flex',
//   justifyContent: 'space-between',
  alignItems: 'center',
  padding:1,
  width: '100%'
};

const closeButtonStyles = {
//   marginLeft: '20px',
padding:0.5,
  cursor: 'pointer'
};

export default ErrorPopup;
