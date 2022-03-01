import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
// import { Link } from "react-router-dom";
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  //Declare hook for each required input
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if(!username){
      setValues({...values, usernameErr: 'Username Required'});
      isReq = false;
    } else if (username.length < 5) {
      setValues({...values, usernameErr: 'Username must be at least 5 characters long'})
      isReq = false;
    }
    if(!password){
      setValues({...values, passwordErr: 'Password Required'});
      isReq = false;
    } else if(password.length < 6){
      setValues({...values, passwordErr: 'Password must be at least 6 characters long'})
      isReq = false;
    }
    if(!email) {
      setValues({...values, emailErr: 'Email required'});
      isReq = false;
    } else if(email.indexOf('@') === -1) {
      setValues({...values, emailErr: 'Email is invalid'});
      isReq = false;
    }

    return isReq;
  }

  //Assign variable isReq to validate function
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq){
      axios.post('https://superflix-db.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('Registration successful, please login!');
        window.open('/', '_self');
      })
      .catch(response => {
        console.error(response);
        alert('unable to register');
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Register</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
                    />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength="6"
                      placeholder='Your password must be 6 or more characters'
                    />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                    />
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="birthday"
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)}
                      placeholder='Optional'
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit"
                    onClick={handleSubmit}>
                    Register
                  </Button>
                  <p></p>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired,
  /* register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  }), */
};

