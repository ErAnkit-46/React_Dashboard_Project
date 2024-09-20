import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from './MyProfileContent';
import './login.css';

function Login() {
  const { setEmail: setUserEmail } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const [errorField, setErrorField] = useState('');
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowTooltip(false);
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (showTooltip && errorField === 'email') {
      const emailValidationMessage = validateEmail(event.target.value);
      setValidationError(emailValidationMessage);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (showTooltip && errorField === 'password') {
      const passwordValidationMessage = validatePassword(event.target.value);
      setValidationError(passwordValidationMessage);
      if (!passwordValidationMessage) {
        setShowTooltip(false);
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      return "Email must contain '@'.";
    }
    return "";
  };

  const validatePassword = (password) => {
    const hasNumber = /\d/;
    const hasAlphabet = /[a-zA-Z]/;
    const hasCapitalLetter = /[A-Z]/;
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasNumber.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!hasAlphabet.test(password)) {
      return "Password must contain at least one alphabet.";
    }
    if (!hasCapitalLetter.test(password)) {
      return "Password must contain at least one capital letter.";
    }
    if (!hasSpecialCharacter.test(password)) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailValidationMessage = validateEmail(email);
    const passwordValidationMessage = validatePassword(password);
    if (emailValidationMessage || passwordValidationMessage) {
      setValidationError(emailValidationMessage || passwordValidationMessage);
      setErrorField(emailValidationMessage ? 'email' : 'password');
      setShowTooltip(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get('Content-Type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }

      if (response.status === 200) {
        setUserEmail(email);

        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }

        setShowLogoutPrompt(false);
        navigate('/dash');
      } else if (response.status === 401) {
        setShowLogoutPrompt(true);
      } else if (response.status === 404) {
        setErrorMessage(data.message || "Invalid credentials. Please try again.");
      } else {
        throw new Error(data.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An unexpected error occurred. Please try again later.');
    }
  };

  const handleLogoutOtherSession = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/logoutOtherSession`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setUserEmail(email);
        setShowLogoutPrompt(false);
        navigate('/dash');
      } else {
        throw new Error(data.message || 'Failed to log out other session.');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An unexpected error occurred. Please try again later.');
    }
  };

  const tooltipStyle = {
    position: 'absolute',
    marginTop: '-15px',
    padding: '10px',
    width: '220px',
    backgroundColor: '#fafafa',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    fontSize: '13px',
    color: '#000000',
    zIndex: 1,
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <div className="form-group" style={{ position: 'relative' }}>
          <h2>Login</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {showTooltip && errorField === 'email' && (
            <div role="alert" aria-live="assertive" style={{ ...tooltipStyle, left: '105%', top: '50%' }}>
              {validationError}
            </div>
          )}
        </div>

        <div className="form-group" style={{ position: 'relative' }}>
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            required
            style={{
              border: '1px solid #090101',
              boxSizing: 'border-box',
              borderRadius: '5px',
              padding: '10px 40px 10px 10px',
              width: '100%',
            }}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={toggleShowPassword}
            style={{
              position: 'absolute',
              right: '10px',
              top: '65%',
              transform: 'translateY(-50%)',
              color: '#000000',
              cursor: 'pointer',
            }}
          />
          {showTooltip && errorField === 'password' && (
            <div role="alert" aria-live="assertive" style={{ ...tooltipStyle, left: '105%', top: '50%' }}>
              {validationError}
            </div>
          )}
        </div>

        <div className="flex">
          <div className="check">
            <input 
              type="checkbox" 
              id="rememberMe" 
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <div>
            <a href="/forget" className="green">Forgot password?</a>
          </div>
        </div>

        <button type="submit">Log In</button>
        {errorMessage && (
          <div role="alert" aria-live="assertive" style={{ color: 'red', marginTop: '10px' }}>
            {errorMessage}
          </div>
        )}
        <p className="color">Don't have an account? <a className="green" href="/register">Register</a></p>
      </form>
      {showLogoutPrompt && (
        <div className="logout-prompt">
          <p>Another session is active. Do you want to log out the other session?</p>
          <button onClick={handleLogoutOtherSession}>Yes, log out other session</button>
        </div>
      )}
    </div>
  );
}

export default Login;
