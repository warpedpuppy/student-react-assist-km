import React from "react";
import PropTypes from 'prop-types';
import { Row, Col, Button, Card, CardGroup } from "react-bootstrap";

import './movie-view.scss';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="movie-view">
        <Col lg={4}>
          <div className="movie-poster">
            <img src={movie.ImagePath} />
          </div>
        </Col>

        <Col lg={8}>
          <div className="movie-view_title-line">
            <Button id="back-button" onClick={() => { onBackClick(null); }}></Button>
            <span className="movie-view_title">{movie.Title}</span>
            <Button id="favorite-button" ></Button>
            <span className="value">{movie.Title}</span>
          </div>

          <div className="movie-view_line description">
            <span className="movie-view_line_label">Description: </span>
            <span className="movie-view_line_value">{movie.Description}</span>
          </div>

          <div className="movie-series">
            <span className="label">Series: </span>
            <span className="value">{movie.Series.Name}</span>
          </div>

          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
          </div>
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