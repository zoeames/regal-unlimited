import visitsData from './visitsData';
import moviesData from './moviesData';

const getCompleteVisits = () => new Promise((resolve, reject) => {
  const fullVisits = [];
  let visits = [];
  let movies = [];

  visitsData.getAllVisits()
    .then((fbVisits) => {
      visits = fbVisits;
      moviesData.getAllMovies()
        .then((fbMovies) => {
          movies = fbMovies;
          visits.forEach((visit) => {
            const newVisit = { ...visit };
            const movie = movies.find(x => x.id === visit.movieId);
            newVisit.movie = movie;
            fullVisits.push(newVisit);
          });
          resolve(fullVisits);
        });
    })
    .catch(err => reject(err));
});

export default {
  getCompleteVisits,
};
