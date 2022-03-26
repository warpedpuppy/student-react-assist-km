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
      selectedMovie: null,
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
        user:null,
      });
      window.open('/', '_self');
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

    return (
      <Router>
        <NavbarView user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
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
                    movie={movies.find(m => m._id === match.params.movieId)} 
                    user={user}
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
                  <ProfileView movies={movies} onBackClick={() => history.goBack()} />
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


