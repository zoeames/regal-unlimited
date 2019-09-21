import visitsData from './visitsData';
import moviesData from './moviesData';
import theatersData from './theatersData';
import userVisitsData from './userVisitsData';

const getCompleteVisits = () => new Promise((resolve, reject) => {
  const fullVisits = [];
  let visits = [];
  let movies = [];
  let theaters = [];
  let userVisits = [];

  visitsData.getAllVisits()
    .then((fbVisits) => {
      visits = fbVisits;
      moviesData.getAllMovies()
        .then((fbMovies) => {
          movies = fbMovies;
          theatersData.getAllTheaters()
            .then((fbTheaters) => {
              theaters = fbTheaters;
              userVisitsData.getAllUserVisits()
                .then((fbUserVisits) => {
                  userVisits = fbUserVisits;
                  visits.forEach((visit) => {
                    const newVisit = { ...visit };
                    const movie = movies.find(x => x.id === visit.movieId);
                    const theater = theaters.find(x => x.id === visit.theaterId);
                    const userVisitsArray = userVisits.filter(x => x.visitId === visit.id);
                    newVisit.movie = movie;
                    newVisit.theater = theater;
                    newVisit.guests = userVisitsArray;
                    fullVisits.push(newVisit);
                  });
                  resolve(fullVisits);
                });
            });
        });
    })
    .catch(err => reject(err));
});

export default {
  getCompleteVisits,
};
