import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const addMovie = newMovie => axios.post(`${baseUrl}/movies.json`, newMovie);

export default {
  addMovie,
};
