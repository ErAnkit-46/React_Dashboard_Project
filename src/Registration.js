import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform registration logic here (e.g., send data to a backend server)
    const userData = {
      username,
      email,
      password,
      confirmPassword
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (response.ok) {
        console.log('User registered successfully');
        // Handle successful registration (e.g., show a success message)
      } else {
        console.error('Error registering user');
        // Handle registration error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error (e.g., show an error message)
    }
    // Perform registration logic here (e.g., send data to a backend server)
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Username:', username);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div
      style={{
        maxWidth: '390px',
        margin: '40px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        marginTop: '130px',
        backdropFilter: 'blur(5px)',
        height: '500px'
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2
          style={{
            fontWeight: 'bold',
            marginBottom: '15px'
          }}
        >
          New Registration
        </h2>
        <div
          style={{
            marginBottom: '15px'
          }}
        >
          <label
            htmlFor="username"
            style={{
              display: 'block',
              marginBottom: '5px',
            }}
          >
            Username:
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '95%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
            required
          />
        </div>
        <div
          style={{
            marginBottom: '15px'
          }}
        >
          <label
            htmlFor="email"
            style={{
              display: 'block',
              marginBottom: '5px',
            }}
          >
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
            }}
            required
          />
        </div>
        <div
          style={{
            marginBottom: '16px',
            position: 'relative' // Add relative positioning
          }}
        >
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '87%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '5px',
              paddingRight: '40px' // Add padding to the right
            }}
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={toggleShowPassword}
            style={{
              position: 'absolute',
              right: '10px',
              top: '63%',
              transform: 'translateY(-50%)',
              color: '#000000',
              cursor: 'pointer',
            }}
          />
        </div>
        <div
          style={{
            marginBottom: '16px',
            position: 'relative' // Add relative positioning
          }}
        >
          <label
            htmlFor="confirmPassword"
            style={{
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Confirm Password:
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: '87%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              paddingRight: '40px' // Add padding to the right
            }}
            required
          />
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEye : faEyeSlash}
            onClick={toggleShowConfirmPassword}
            style={{
              position: 'absolute',
              right: '10px',
              top: '68%',
              transform: 'translateY(-50%)',
              color: '#000000',
              cursor: 'pointer',
            }}
          />
        </div>
        {error && (
          <div
            style={{
              color: 'red',
              marginBottom: '20px'
            }}
          >
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '25px',
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
