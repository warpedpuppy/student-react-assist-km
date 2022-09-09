import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { movies, user } = state;
  return { movies, user };
};

export class MovieCard extends React.Component {

  constructor(props) {
    super(props);
    //Create state variables that will be used to add/remove a movie from a users favorite list
    this.state = {
      // isFavorite: props.FavoriteMovies.includes(this.props.movie._id),
      FavoriteMovies: [],
      userDetails: []
    }
  }

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
              this.setState({ isFavorite: false });
              console.log("Movie removed", response);
            })
            .catch(function (error) {
              console.log(error);
            });
        };
    
  render() {
    const { movie } = this.props;
    // const { isFavorite } = this.state;
    const tempArray = this.props.FavoriteMovies;


    return (
      <Card className="movie-card" bg='dark'>
        <Card.Img variant="top" src={ movie.ImagePath } />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="light">More info</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Series: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
      Name: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  onMovieClick: PropTypes.func
};

export default connect(mapStateToProps)(MovieCard);
