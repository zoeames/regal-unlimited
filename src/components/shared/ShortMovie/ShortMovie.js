import React from 'react';
import { Link } from 'react-router-dom';

import './ShortMovie.scss';

import movieShape from '../../../helpers/propz/movies';

import defaultPoster from './unknown.png';

class ShortMovie extends React.Component {
  static propTypes = {
    movie: movieShape.movie,
  }

  render() {
    const { movie } = this.props;
    const imageSrc = movie.imageUrl === 'N/A' ? defaultPoster : movie.imageUrl;
    const singlePage = `/movie/${movie.id}`;
    return (
      <div className="ShortMovie col-md-3">
        <div className="card">
          <img className="card-img-top movie-poster" src={imageSrc} alt="movie poster"/>
          <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            <p className="card-text">{movie.year}</p>
            <Link className="btn btn-primary" to={singlePage}><i className="fas fa-eye"></i></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ShortMovie;
