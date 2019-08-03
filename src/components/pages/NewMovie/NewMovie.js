import React from 'react';

import './NewMovie.scss';
import omdb from '../../../helpers/data/omdb';

import ShortMovie from '../../shared/ShortMovie/ShortMovie';

const defaultNewMovie = {
  title: '',
  year: '',
};

class NewMovie extends React.Component {
  state = {
    newMovie: defaultNewMovie,
    movies: [],
  }

  movieSearch = (e) => {
    e.preventDefault();
    const tempMovie = { ...this.state.newMovie };
    const searchTitle = tempMovie.title.replace(' ', '+');
    omdb.searchForMovies(searchTitle, tempMovie.year)
      .then(res => this.setState({ movies: res.data.Search }))
      .catch(err => console.error(err));
  }

  formFieldStringState = (name, e) => {
    const tempMovie = { ...this.state.newMovie };
    tempMovie[name] = e.target.value;
    this.setState({ newMovie: tempMovie });
  }

  titleChange = e => this.formFieldStringState('title', e);

  yearChange = e => this.formFieldStringState('year', e);

  render() {
    const { movies, newMovie } = this.state;
    const makeMovies = movies.map(movie => <ShortMovie key={movie.imdbID} movie={movie}/>);
    return (
      <div className="NewMovie col">
        <h1>Search for Movies</h1>
        <div className="card col-md-6 offset-md-3">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="movieTitle">Movie Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="movieTitle"
                  placeholder="The Matrix"
                  value={newMovie.title}
                  onChange={this.titleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="movieYear">Movie Year</label>
                <input
                  type="text"
                  className="form-control"
                  id="movieYear"
                  placeholder="2019"
                  value={newMovie.year}
                  onChange={this.yearChange}
                />
              </div>
              <button className="btn btn-secondary" onClick={this.movieSearch}>Search</button>
            </form>
          </div>
        </div>

        <div className="d-flex flex-wrap col-12">
          {makeMovies}
        </div>

      </div>
    );
  }
}

export default NewMovie;
