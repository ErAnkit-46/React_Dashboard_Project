import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    navigate('/dash');
    // window.location.href = 'http://192.168.56.1:3001';
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder='Enter email address'
            value={email}
            onChange={handleEmailChange}
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder='Enter password'  
            value={password}
            onChange={handlePasswordChange}
            // required
          />
        </div>

        <div className='flex'>
          <div className='check'>
          <div><input type="checkbox" /></div>
          <label htmlFor="rememberMe">Remember me </label>
          </div>
          <div>
          <a href="/forget" className='green'>Forgot password?</a>
          </div>
        </div>

        <button type="submit"><a href="/dash"></a>Log In</button>
        <p className='color'>Don't have an account? <a className='green' href="/register">Register</a></p>
      </form>
    </div>
  );
}

export default Login;
