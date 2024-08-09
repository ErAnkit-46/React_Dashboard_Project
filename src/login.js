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
  const [userNotFound, setUserNotFound] = useState(false);
  const navigate = useNavigate();

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

    // Check if user exists and login
    try {
      const response = await fetch('http://localhost:5000/api/login', {
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
        setUserEmail(email); // Set the user email in the context
        navigate('/dash'); // Navigate to the dashboard
      } else if (response.status === 401 || response.status === 404) {
        setUserNotFound(true);
        setErrorMessage(data.message || "Invalid credentials. Please try again.");
      } else {
        throw new Error(data.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage(error.message || 'An unexpected error occurred. Please try again later.');
    }
  };

  const tooltipStyle = {
    position: 'absolute',
    marginTop: '-15px',
    padding: '10px',
    width: '220px',
    backgroundColor: '#EFDBA1',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    fontSize: '12px',
    color: '#333',
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
            <div style={{ ...tooltipStyle, left: '105%', top: '50%' }}>
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
              padding: '10px',
              width: '330px',
              border: '1px solid #ccc',
              borderRadius: '5px',
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
            <div style={{ ...tooltipStyle, left: '105%', top: '50%' }}>
              {validationError}
            </div>
          )}
        </div>

        <div className="flex">
          <div className="check">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <div>
            <a href="/forget" className="green">Forgot password?</a>
          </div>
        </div>

        <button type="submit">Log In</button>
        {errorMessage && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            {errorMessage}
          </div>
        )}
        <p className="color">Don't have an account? <a className="green" href="/register">Register</a></p>
      </form>
    </div>
  );
}

export default Login;
