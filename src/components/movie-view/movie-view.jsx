import React from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { Row, Col, Button, Card, CardGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './movie-view.scss';

const mapStateToProps = state => {
  const { movies, user } = state;
  return { movies, user };
};

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
    //Create state variables that will be used to add/remove a movie from a users favorite list
    this.state = {
      isFavoriteNew: props.FavoriteMovies.includes(this.props.movie._id),
      FavoriteMovies: [],
      userDetails: []
    }
    
    // // Bind these additional functions that will get called by onClick events to 'this'
    // this.addFavorite = this.addFavorite.bind(this);
    // this.removeFavorite = this.removeFavorite.bind(this);
    // this.getUser = this.getUser.bind(this);
  }

  // componentDidMount() {
  //   const token = localStorage.getItem('token');
  //   this.setUser(token);
  // }

  // getUser(token) {
  //   axios.get(`https://superflix-db.herokuapp.com/users/${this.props.user}`, {
  //     headers: { Authorization: `Bearer ${token}`}
  //   }).then(response => {
  //     // Use the response to set the user details in the state variables
  //     this.setState({
  //       userDetails: response.data,
  //       FavoriteMovies: response.data.FavoriteMovies
  //     });
  //   }).catch(function(error) {
  //     console.log(error);
  //   });
  // }

  // addFavorite(){
  //   const token = localStorage.getItem('token');
  //   // const user = localStorage.getItem('user');
  //     axios.post(`https://superflix-db.herokuapp.com/users/${Username}/movies/${this.props.movie._id}`, {}, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   }).then(_response => {
  //     //Set isFavorite state to true, now that this movie has been added to the list of Favorites
  //     this.setState({ isFavorite: true });
  //     // window.open(`/movies/${this.props.movie._id}`, '_self');
  //   }).catch(function(error) {
  //     console.log(error);
  //   });
  // }

    // add a movie to FavoriteMovies list
    addFavorite = (e) => {
      e.preventDefault();
      const Username = localStorage.getItem('user');
      const token = localStorage.getItem('token');
  
      axios.post(`https://superflix-db.herokuapp.com/users/${Username}/movies/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then((response) => {
          console.log(response);
          this.setState({ isFavorite: true });
          // window.open(`/movies/${this.props.movie._id}`, '_self');
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  

  // removeFavorite() {
  //   const token = localStorage.getItem('token');
  //     axios.delete(`https://superflix-db.herokuapp.com/users/${this.props.user.Username}/movies/${this.props.movie._id}`, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   }).then(_response => {
  //     //Set isFavorite state to false
  //     this.setState({isFavorite: false });
  //     // window.open(`/movies/${this.props.movie._id}`, '_self');
  //   }).catch(function(error) {
  //     console.log(error);
  //   });
  // }

    // Delete a movie from FavoriteMovies list
    removeFavorite = (e) => {
      e.preventDefault();
      const Username = localStorage.getItem('user');
      const token = localStorage.getItem('token');
  
      axios.delete(`https://superflix-db.herokuapp.com/users/${Username}/movies/${this.props.movie._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          //Set isFavorite state to false
          this.setState({ isFavoriteNew: false });
          console.log("Movie removed", response);
          // this.componentDidMount();
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  

  render() {
    const { movie, onBackClick } = this.props;
    const { isFavoriteNew } = this.state;


    const tempArray = this.props.FavoriteMovies;

    return (
      <Row>
        <Col>
          <CardGroup>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" type="fluid" src= {movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>
                  <div className="movie-view_line description">
                    <span className="movie-view_line_label">Description: </span>
                    <span className="movie-view_line_value">{movie.Description}</span>
                  </div>

                  <div className="movie-series">
                    <span className="label">Series: </span>
                    <Link to={`/series/${movie.Series.Name}`}>
                      <Button variant="link">{movie.Series.Name}</Button>
                    </Link>
                  </div>

                  <div className="movie-director">
                    <span className="label">Director: </span>
                    <Link to={`/directors/${movie.Director.Name}`}>
                      <Button variant="link">{movie.Director.Name}</Button>
                    </Link>
                  </div>

                  <div>
                    <Button onClick={() => { onBackClick(null); }} variant="dark">Back</Button>
                    {isFavoriteNew ? 
                      <Button className="float-right" variant="outline-warning" onClick={this.removeFavorite}>Remove from Favorites</Button>
                     : 
                      <Button className="float-right" variant="warning" onClick={this.addFavorite}>Add to Favorites</Button>
                    }
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    ImagePath: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    Series: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      BirthYear: PropTypes.number,
      DeathYear: PropTypes.number
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired 
};

export default connect(mapStateToProps)(MovieView);
