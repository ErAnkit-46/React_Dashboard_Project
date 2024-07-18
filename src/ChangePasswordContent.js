import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorField, setErrorField] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = () => setShowTooltip(false);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (showTooltip && errorField === 'password') validateField('password', event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (showTooltip && errorField === 'confirmPassword') validateField('confirmPassword', event.target.value);
  };

  const validateField = (field, value) => {
    let validationMessage = '';
    if (field === 'password') validationMessage = validatePassword(value);
    else if (field === 'confirmPassword') validationMessage = validateConfirmPassword(value);

    setErrorMessage(validationMessage);
    if (validationMessage) {
      setErrorField(field);
      setShowTooltip(true);
    } else {
      setErrorField('');
      setShowTooltip(false);
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters long.";
    if (!/\d/.test(password)) return "Password must contain at least one number.";
    if (!/[a-zA-Z]/.test(password)) return "Password must contain at least one alphabet.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one capital letter.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character.";
    return '';
  };

  const validateConfirmPassword = (confirmPassword) => confirmPassword !== password ? "Please make sure your passwords match." : '';

  const handleSubmit = (event) => {
    event.preventDefault();
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    if (passwordError || confirmPasswordError) {
      setErrorMessage(passwordError || confirmPasswordError);
      setErrorField(passwordError ? 'password' : 'confirmPassword');
      setShowTooltip(true);
      return;
    }

    console.log('Current Password:', currentPassword);
    console.log('New Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // Display success message
    setSuccessMessage('Saved Successfully');
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/dash');
    }, 2000);
  };

  const handleReset = () => {
    setCurrentPassword('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    setErrorField('');
    setShowTooltip(false);
    setSuccessMessage('');
  };

  const errorStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
    position: 'absolute',
    top: '80%',
    left: '0',
  };

  const successStyle = {
    color: 'green',
    fontSize: '14px',
    marginTop: '10px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
    marginTop: '10px',
  };

  const renderInputField = (id, type, value, onChange, toggleShow, showPassword, showTooltipCondition, placeholder) => (
    <div className="form-group" style={{ position: 'relative', marginTop: '10px', height: '46px' }}>
      <label htmlFor={id}>{placeholder}:</label>
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        placeholder={`Enter ${placeholder.toLowerCase()}`}
        value={value}
        onChange={onChange}
        required
        style={{
          padding: '10px',
          width: '270px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          height: '28px',
        }}
      />
      <FontAwesomeIcon
        icon={showPassword ? faEye : faEyeSlash}
        onClick={toggleShow}
        style={{
          position: 'absolute',
          right: '20px',
          top: '70%',
          transform: 'translateY(-50%)',
          color: '#000000',
          cursor: 'pointer',
        }}
      />
      {showTooltip && showTooltipCondition && (
        <div style={errorStyle}>{errorMessage}</div>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
      {renderInputField('currentPassword', 'password', currentPassword, (e) => setCurrentPassword(e.target.value), () => setShowCurrentPassword(!showCurrentPassword), showCurrentPassword, errorField === 'currentPassword', 'Current Password')}
      {renderInputField('password', 'password', password, handlePasswordChange, () => setShowNewPassword(!showNewPassword), showNewPassword, errorField === 'password', 'New Password')}
      {renderInputField('confirmPassword', 'password', confirmPassword, handleConfirmPasswordChange, () => setShowConfirmPassword(!showConfirmPassword), showConfirmPassword, errorField === 'confirmPassword', 'Verify New Password')}
      <button type="submit" style={buttonStyle}>Save</button>
      <button type="button" onClick={handleReset} style={buttonStyle}>Reset</button>
      {successMessage && <div style={successStyle}>{successMessage}</div>}
    </form>
  );
};

export default Login;

