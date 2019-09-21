import visitsData from './visitsData';
import moviesData from './moviesData';
import theatersData from './theatersData';

const getCompleteVisits = () => new Promise((resolve, reject) => {
  const fullVisits = [];
  let visits = [];
  let movies = [];
  let theaters = [];

  visitsData.getAllVisits()
    .then((fbVisits) => {
      visits = fbVisits;
      moviesData.getAllMovies()
        .then((fbMovies) => {
          movies = fbMovies;
          theatersData.getAllTheaters()
            .then((fbTheaters) => {
              theaters = fbTheaters;
              visits.forEach((visit) => {
                const newVisit = { ...visit };
                const movie = movies.find(x => x.id === visit.movieId);
                const theater = theaters.find(x => x.id === visit.theaterId);
                newVisit.movie = movie;
                newVisit.theater = theater;
                fullVisits.push(newVisit);
              });
              resolve(fullVisits);
            });
        });
    })
    .catch(err => reject(err));
});

export default {
  getCompleteVisits,
};
