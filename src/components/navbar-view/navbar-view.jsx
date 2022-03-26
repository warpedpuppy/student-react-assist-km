import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import './navbar-view.scss';

export function NavbarView({user}) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar sticky="top" expand="lg" variant="light" className="mainNavbar">
      <Container fluid>
        <Navbar.Brand className="navbar-logo" href="/">
          <img
            src="https://superflix-db.herokuapp.com/img/SuperFlixLogo.svg"
            width="150"
            height="75"
            className="d-inline-block align-top"
            alt="SuperFlix logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link href="/profile">{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={() => {
                onLoggedOut()
              }}>Logout</Button>
            )}
            {!isAuth() && (
              <Nav.Link href="/">Login</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href="/register">Register</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}