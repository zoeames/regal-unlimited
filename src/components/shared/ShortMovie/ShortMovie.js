import React from 'react';

import './ShortMovie.scss';

import defaultPoster from './unknown.png';

class ShortMovie extends React.Component {
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
            <button className="btn btn-primary">Add Movie</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShortMovie;
