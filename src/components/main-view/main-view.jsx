import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieView } from '../movie-view/movie-view';
import {DirectorView} from '../director-view/director-view';
import {ProfileView} from '../profile-view/profile-view';
import {SeriesView} from '../series-view/series-view';
import {NavbarView} from '../navbar-view/navbar-view';

import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
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
      this.props.setUser(
        authData
      ); 
  
      // localStorage.setItem('token', authData.token);
      // localStorage.setItem('user', authData.user.Username);
      // this.getMovies(authData.token);
    }   

    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.props.setUser({
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
          this.props.setMovies(response.data);
          })
        .catch(function (error) {
          console.log(error);
        });
    }  

  render () {
    let { movies } = this.props;
    let { user } = this.props;

    return (
      <Router>
        <NavbarView user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;

              return <MoviesList movies={movies}/>;
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

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser } ) (MainView);


