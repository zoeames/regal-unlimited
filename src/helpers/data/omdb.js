import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseUrl } = apiKeys.omdbApi;

const searchForMovies = (title, year) => axios.get(`${baseUrl}?apikey=${apiKeys.omdbApi.apiKey}&s=${title}&y=${year}`);

const movieDetailById = imdbId => axios.get(`${baseUrl}?apikey=${apiKeys.omdbApi.apiKey}&i=${imdbId}`);

export default {
  searchForMovies,
  movieDetailById,
};
