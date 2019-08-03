import React from 'react';
import PropTypes from 'prop-types';

import './ShortMovie.scss';

import omdbMovieShape from '../../../helpers/propz/omdbMovies';

import defaultPoster from './unknown.png';

class ShortMovie extends React.Component {
  static propTypes = {
    movie: omdbMovieShape.shortMovie,
    saveMovie: PropTypes.func.isRequired,
  }

  prepMovie = (e) => {
    e.preventDefault();
    const { movie, saveMovie } = this.props;
    const newMovie = {
      imageUrl: movie.Poster,
      title: movie.Title,
      year: movie.Year,
      imdbId: movie.imdbID,
    };

    saveMovie(newMovie);
  }

  render() {
    const { movie } = this.props;
    const imageSrc = movie.Poster === 'N/A' ? defaultPoster : movie.Poster;

    return (
      <div className="ShortMovie col-2">
        <div className="card">
          <img className="card-img-top movie-poster" src={imageSrc} alt="movie poster"/>
          <div className="card-body">
            <h5 className="card-title">{movie.Title}</h5>
            <p className="card-text">{movie.Year}</p>
            <button className="btn btn-primary" onClick={this.prepMovie}>Add Movie</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShortMovie;
