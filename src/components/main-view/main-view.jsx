import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        //{ _id: 1, Title: 'Captain America: The First Avenger', Description: 'Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a "Super-Soldier serum". But being Captain America comes at a price as he attempts to take down a war monger and a terrorist organization.', ImagePath: 'https://raw.githubusercontent.com/k8molony/superFlix-client/main/img/FirstAvenger.jpeg', Series: 'Marvel Cinematic Universe', Director: 'Joe Johnston' },
        //{ _id: 2, Title: 'Captain Marvel', Description: 'Carol Danvers becomes one of the universe\'s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races.', ImagePath: 'https://raw.githubusercontent.com/k8molony/superFlix-client/main/img/captainmarvel.jpg', Series: 'Marvel Cinematic Universe', Director: 'Ryan Fleck' },
        //{ _id: 3, Title: 'Iron Man', Description: 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.', ImagePath: 'https://github.com/k8molony/superFlix-client/blob/main/img/iron-man.jpg?raw=true', Series: 'Marvel Cinematic Universe', Director: 'Jon Favreau' }
      ],
      selectedMovie: null
    };
  }

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

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}