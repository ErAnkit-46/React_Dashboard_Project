import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ForgetPasswordContainer = styled.div`
  max-width: 400px;
  margin: 150px auto;
  padding: 20px;
  border: 1px solid #000000;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  height: 430px;
`;

const FormHeading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Group = styled.div`
  margin-bottom: 18px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 3px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px;
  font-size: 16px;
  border: 1px solid #000000;
  border-radius: 5px;
  &::placeholder {
    font-size: 13px;    /* Placeholder text size */
  }
`;

const PasswordInput = styled(Input)`
  width: 88%;
  boxsizing: border-box;
`;

const FormButton = styled.button`
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 68%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Password must contain at least one special character.';
    }
    if (/\s/.test(password)) {
      return 'Password must not contain spaces.';
    }
    return ''; // No error
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.put('http://localhost:5000/api/reset-password', {
        email,
        newPassword: password,
        confirmPassword,
      });

      if (response.status === 200) {
        setMessage('Password has been updated');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
        navigate('/'); // Navigate to home or another page after reset
      } else {
        setError('Error resetting password');
        setMessage('');
      }
    } catch (err) {
      setError('Error resetting password');
      setMessage('');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <ForgetPasswordContainer>
      <form onSubmit={handleSubmit}>
        <FormHeading>Forget Password</FormHeading>
        <Group>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter email address"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </Group>
        <Group>
          <Label htmlFor="password">New Password:</Label>
          <PasswordInput
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter new password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <IconWrapper onClick={toggleShowPassword}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={{ color: '#000', cursor: 'pointer' }} />
          </IconWrapper>
        </Group>
        <Group>
          <Label htmlFor="confirmPassword">Confirm New Password:</Label>
          <PasswordInput
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <IconWrapper onClick={toggleShowConfirmPassword}>
            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} style={{ color: '#000', cursor: 'pointer' }} />
          </IconWrapper>
        </Group>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <FormButton type="submit">Reset Password</FormButton>
      </form>
    </ForgetPasswordContainer>
  );
};

export default ForgetPasswordForm;
