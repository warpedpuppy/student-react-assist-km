import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Container, Card, CardGroup } from 'react-bootstrap';

import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    props.onLoggedIn(username);
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://superflix-db.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error logging in the user');
        alert('Something wasn\'t entered right');
      });
    }; */

  const handleClickRegister = (e) => {
    e.preventDefault();
    props.toRegistrationView('');
  }

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Login to SuperFlix</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                      <Form.Control 
                        type="text" 
                        onChange={e => setUsername(e.target.value)} 
                        required
                        placeholder="Enter your username"
                      />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                      type="text" 
                      onChange={e => setPassword(e.target.value)} 
                      required
                      placeholder="Enter your password"
                    />
                  </Form.Group>

                  <Button variant="success" type="submit" 
                    onClick={handleSubmit}>
                    Log In
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>

      <Row className="register-row">
        <Col>
            <p>New user?</p>
            <Button variant="outline-secondary" type="submit" onClick={handleClickRegister}>Register</Button>
          </Col>
        </Row>
    </Container>
  );
}

//prop-types
//Give warnings in browser if data does not match required shape
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  toRegistrationView: PropTypes.func.isRequired
};