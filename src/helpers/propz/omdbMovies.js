import PropTypes from 'prop-types';

const shortOmdbMovie = PropTypes.shape({
  Poster: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  Type: PropTypes.string.isRequired,
  Year: PropTypes.string.isRequired,
  imdbID: PropTypes.string.isRequired,
});

export default { shortOmdbMovie };
