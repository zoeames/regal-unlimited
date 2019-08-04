import React from 'react';

import './ListMovies.scss';
import moviesData from '../../../helpers/data/moviesData';

import ShortMovie from '../../shared/ShortMovie/ShortMovie';

class ListMovies extends React.Component {
  state = {
    movies: [],
  }

  componentDidMount() {
    moviesData.getAllMovies()
      .then((movies) => {
        movies.sort((a, b) => ((a.title > b.title) ? 1 : -1));
        this.setState({ movies });
      })
      .catch(err => console.error('unable to get moves', err));
  }

  render() {
    const { movies } = this.state;
    const makeMovieCards = movies.map(movie => (<ShortMovie key={movie.id} movie={movie} />));

    return (
      <div className="ListMovies col">
        <h1>Movie List</h1>
        <div className="movie-list d-flex flex-wrap">
          {makeMovieCards}
        </div>
      </div>
    );
  }
}

export default ListMovies;
