import React from 'react';
import axios from 'axios';
import { Row, Col, Navbar, Nav, Container } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: true
    };
  }

  //load in movies from my database after rendering MainView
  componentDidMount() {
    axios.get('https://superflix-db.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Passed to MovieCard
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // Passed to LoginView
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  // Passed to RegistrationView
  onRegister(registered, user) {
    this.setState({
      registered,
      user
    });
  }

  toRegistrationView(asdf) {
    this.setState({
      registered: false
    });
  }

  render() {

    const { movies, selectedMovie, user, registered } = this.state;

    // RegistrationView if user is not registered
    if (!registered) return <RegistrationView onRegister={(registered, username) => this.onRegister(registered, username)} />;

    // LoginView if user is registered but not logged in
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toRegistrationView={asdf => this.toRegistrationView(asdf)} />;

    // Empty MainView if there are no movies
    if (movies.length === 0) return <div className="main view" />;

    // If user is registered and logged in
    // Render list of MovieCard comps if no movie is selected
    // Go to MovieView if a movie is selected
    return (
      <div className="main-view">
        <Navbar sticky="top" expand="lg" variant="dark" className="mainNavbar">
          <Container>
            <Navbar.Brand href="#superflix">
              <img
                src="/SFLogo.png"
                width="24"
                height="12"
                className="d-inline-block align-top"
                alt="SuperFlix logo"
              />
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#profile">Profile</Nav.Link>
              <Nav.Link href="#logout">Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            ))
          }
        </Row>
      </div>
    );
  }
}

