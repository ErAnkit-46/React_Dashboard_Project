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
  const [errorField, setErrorField] = useState('');
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
      setErrorMessage(emailValidationMessage);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (showTooltip && errorField === 'password') {
      const passwordValidationMessage = validatePassword(event.target.value);
      setErrorMessage(passwordValidationMessage);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailValidationMessage = validateEmail(email);
    const passwordValidationMessage = validatePassword(password);
    if (emailValidationMessage || passwordValidationMessage) {
      setErrorMessage(emailValidationMessage || passwordValidationMessage);
      setErrorField(emailValidationMessage ? 'email' : 'password');
      setShowTooltip(true);
      return;
    }
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    setUserEmail(email); // Set the user email in the context
    navigate('/dash');
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
              {errorMessage}
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
            icon={showPassword ? faEye : faEyeSlash }
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
              {errorMessage}
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
        <p className="color">Don't have an account? <a className="green" href="/register">Register</a></p>
      </form>
    </div>
  );
}

export default Login;

