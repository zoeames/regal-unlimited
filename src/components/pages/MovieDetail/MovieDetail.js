import React from 'react';
import moment from 'moment';

import './MovieDetail.scss';
import moviesData from '../../../helpers/data/moviesData';
import omdb from '../../../helpers/data/omdb';

const defaultMovie = {
  imageUrl: '',
  imdbId: '',
  title: '',
  year: '',
};

class MovieDetail extends React.Component {
  state = {
    movie: defaultMovie,
    imdbMovie: {},
  }

  componentDidMount() {
    const movieId = this.props.match.params.id;
    moviesData.getSingleMovieById(movieId)
      .then((movie) => {
        this.setState({ movie });
        omdb.movieDetailById(movie.imdbId)
          .then(imdbMovie => this.setState({ imdbMovie: imdbMovie.data }))
          .catch(err => console.error('unable to get imdb details', err));
      })
      .catch(err => console.error('could not get single movie', err));
  }

  render() {
    const { movie, imdbMovie } = this.state;
    const movieDetail = () => (
      <div className="text-left">
        <h2>Release Date: {moment(imdbMovie.Released).format('LL')}</h2>
        <br/>
        <h3>Genre: {imdbMovie.Genre}</h3>
        <h3>Rating: {imdbMovie.Rated}</h3>
        <br/>
        <h4>Actors: {imdbMovie.Actors}</h4>
        <h4>Directors: {imdbMovie.Director}</h4>
        <h4>Awards: {imdbMovie.Awards}</h4>
        <br/>
        <h5>Plot:</h5>
        <p>{imdbMovie.Plot}</p>
      </div>
    );

    return (
      <div className="MovieDetail col-12">
        <div className='row'>
          <div className='col-md-4'>
            <img src={movie.imageUrl} alt=""/>
          </div>
          <div className='col-md-8 text-center'>
            <h1>{movie.title}</h1>
            <br/>
            {Object.keys(imdbMovie).length > 0 ? (movieDetail()) : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetail;
