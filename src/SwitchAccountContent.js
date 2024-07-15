import React, { useState, useEffect } from 'react';

function SwitchAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedInUserEmail');
    const storedUsername = localStorage.getItem('loggedInUsername');
    if (storedEmail && storedUsername) {
      setEmail(storedEmail);
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="switch-account-container">
      <div className="account-info">
        <span className="account-name">{username}</span>
        <span className="account-email">{email}</span>
        <span className="account-status">
          <svg className="green-tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="18px" height="18px">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.6-7.6 1.4 1.4z"/>
          </svg>
        </span>
      </div>
    </div>
  );
}

export default SwitchAccount;

