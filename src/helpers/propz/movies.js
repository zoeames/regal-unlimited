import PropTypes from 'prop-types';

const movie = PropTypes.shape({
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  imdbId: PropTypes.string.isRequired,
});

export default { movie };
