import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

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
    if (user) {
      return true
    } else {
      return false;
    }
  };

  return (
    <Container fluid>
      <Navbar sticky="top" expand="lg" variant="dark" className="mainNavbar">
        <Navbar.Brand className="navbar-logo" to="/" as={Link}>
          <img
            src="https://superflix-db.herokuapp.com/img/SuperFlixLogo.svg"
            width="150"
            height="75"
            className="d-inline-block align-top"
            alt="SuperFlix logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav" className="mainNavbar">
          {/* <Nav className="ml-auto">
            {isAuth() && user && (
              <Nav.Link href="/profile">{user.user}</Nav.Link>
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
          </Nav> */}
          <div className="ml-auto mainNavbar">
            {isAuth() && (
              <Link to="/profile">{user.Username}</Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={() => {
                onLoggedOut()
              }}>Logout</Button>
            )}
            {!isAuth() && (
              <Link to="/">Login</Link>
            )}
            {!isAuth() && (
              <Link to="/register">Register</Link>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}