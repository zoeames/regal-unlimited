import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllTheaters = uid => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/theaters.json`)
    .then((res) => {
      const theaters = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          theaters.push(res.data[fbKey]);
        });
      }
      resolve(theaters);
    })
    .catch(err => reject(err));
});

const addTheater = newTheater => axios.post(`${baseUrl}/theaters.json`, newTheater);

const getSingleTheater = theaterId => axios.get(`${baseUrl}/theaters/${theaterId}.json`);

export default {
  addTheater,
  getAllTheaters,
  getSingleTheater,
};
