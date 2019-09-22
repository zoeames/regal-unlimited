import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllUserVisits = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/userVisits.json`)
    .then((res) => {
      const userVisits = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          userVisits.push(res.data[fbKey]);
        });
      }
      resolve(userVisits);
    })
    .catch(err => reject(err));
});

const getAllUserVisitsForSingleVisit = visitId => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/userVisits.json?orderBy="visitId"&equalTo="${visitId}"`)
    .then((res) => {
      const userVisits = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          userVisits.push(res.data[fbKey]);
        });
      }
      resolve(userVisits);
    })
    .catch(err => reject(err));
});

export default {
  getAllUserVisits,
  getAllUserVisitsForSingleVisit,
};
