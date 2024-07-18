import React, { useState } from 'react';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here (e.g., send data to a backend server)
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Username:', username);
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '40px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        marginTop: '130px',
        backdropFilter: 'blur(5px)', // Use camelCase and no semicolon
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}
        >
          New Registration
        </h2>
        <div
          style={{
            marginBottom: '20px'
          }}
        >
          <label
            htmlFor="username"
            style={{
              display: 'block',
              marginBottom: '10px',
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
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
            required
          />
        </div>
        <div
          style={{
            marginBottom: '20px'
          }}
        >
          <label
            htmlFor="email"
            style={{
              display: 'block',
              marginBottom: '10px',
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
              fontSize: '16px',
              border: '1px solid #ccc',
            }}
            required
          />
        </div>
        <div
          style={{
            marginBottom: '20px',
          }}
        >
          <label
            htmlFor="password">Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '95%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px'

            }}
            required
          />
        </div>
        <div
          style={{
            marginBottom: '18px',
          }}
        >
          <label
            htmlFor="confirmPassword"
            style={{
              display: 'block',
              marginBottom: '8px',
            }}
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: '95%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            // marginBottom:'5px'
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;

