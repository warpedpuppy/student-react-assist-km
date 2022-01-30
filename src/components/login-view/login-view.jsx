import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    props.onLoggedIn(username);
  };

  const handleClickRegister = (e) => {
    e.preventDefault();
    PerformancePaintTiming.toRegistrationView('');
  }

  return (
    <div className="login-view">
      <h2> Login to SuperFlix</h2>

      <form className="login-form">

        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>

        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>

        <button type="submit" onClick={handleSubmit}>Log In</button>
      </form>

      <div>
        <span>New User? </span>
        <button type="submit" onClick={handleClickRegister}>Register</button>
      </div>

    </div>
  )
}

//prop-types
//Give warnings in browser if data does not match required shape
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  toRegistrationView: PropTypes.func.isRequired
};