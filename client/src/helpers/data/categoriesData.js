import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getCategories = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/categories`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getCategories;
