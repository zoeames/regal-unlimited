import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllVisits = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/visits.json`)
    .then((res) => {
      const visits = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          visits.push(res.data[fbKey]);
        });
      }
      resolve(visits);
    })
    .catch(err => reject(err));
});

export default {
  getAllVisits,
};
