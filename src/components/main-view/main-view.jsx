import React from 'react';
import axios from 'axios';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import {DirectorView} from '../director-view/director-view';
import {ProfileView} from '../profile-view/profile-view';
import {SeriesView} from '../series-view/series-view';
import {NavbarView} from '../navbar-view/navbar-view';
//import { Redirect } from 'react-router';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      //selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  } 

    //Passed to LoginView
    onLoggedIn(authData) {
      console.log(authData);
      this.setState({
        user: authData.user.Username
      }); 
  
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);
    }   

    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
        user:null
      });
    }

    getMovies(token) {
      axios.get('https://superflix-db.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          //Assign the result to the state
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }  

  render () {
    const { movies, user } = this.state;

    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <NavbarView user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
              /* if (!user) return <Col>
                <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" /> */
              if (!user) {
                return <Redirect to="/login" />;
              }

              return (
                <>
                  {movies.map(m => (
                    <Col md={3} key={m._id}>
                      <MovieCard movie={m} onMovieClick={() => {}} />
                    </Col>
                  ))}
                </>
              );
            }} />

            <Route path="/login" render={() => {
              if (user) {
                return <Redirect to="/" />;
              }

              return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
            }} />

            <Route path="/register" render={() => {
              if (user) {
                return <Redirect to="/" />;
              }

              return (
                <Col lg={8} md={8}>
                  <RegistrationView />
                </Col>
              );
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) {
                return (
                  <Col md={8}>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }
              
              if (movies.length === 0) {
                return <div className="main-view" />;
              }

              return (
                <Col md={8}>
                  <MovieView 
                    movie={movies.find(m => m._id === match.params.id)} 
                    onBackClick={() => history.goBack()} />
                </Col>
              );
            }} />

            <Route path="/profile" render={({ history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }

              return (
                <Col md={8}>
                  <ProfileView movies={m} onBackClick={() => history.goBack()} />
                </Col>
              );
            }} />

            <Route path="/series/:name" render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }

              if (movies.length === 0) {
                return <div className="main-view" />;
              }

              return (
                <Col md={8}>
                  <SeriesView
                    series={movies.find(m => m.Series.Name === match.params.name).Series}
                    onBackClick={() => history.goBack()}
                    movies={movies.filter(m => m.Series.Name === match.params.name)}/>
                </Col>
              )
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }

              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col onMouseDown={8}>
                  <DirectorView 
                    director={movies.find(m => m.Director.Name === match.params.name).Director} 
                    onBackClick={() => history.goBack()}
                    movies={movies.filter(m => m.Director.Name === match.params.name)} />
                </Col>
              );
            }} />
          </Row>
        </Container>
      </Router>
    );
  }
}

/*  // Passed to RegistrationView
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

  // To log out
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user:null
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
                src="https://superflix-db.herokuapp.com/img/SuperFlixLogo.svg"
                width="150"
                height="75"
                className="d-inline-block align-top"
                alt="SuperFlix logo"
              />
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#profile">Profile</Nav.Link>
            </Nav>
            <button onClick={() => { this.onLoggedOut()}}>Logout</button>
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
} */

