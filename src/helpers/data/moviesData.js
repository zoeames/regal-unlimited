import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllMovies = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/movies.json`)
    .then((res) => {
      const movies = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          movies.push(res.data[fbKey]);
        });
      }
      resolve(movies);
    })
    .catch(err => reject(err));
});

const addMovie = newMovie => axios.post(`${baseUrl}/movies.json`, newMovie);

const getSingleMovieById = movieId => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/movies/${movieId}.json`)
    .then((res) => {
      resolve(res.data);
    })
    .catch(err => reject(err));
});

export default {
  addMovie,
  getAllMovies,
  getSingleMovieById,
};
