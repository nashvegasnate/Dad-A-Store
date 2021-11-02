import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getItems = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/items`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getItems;
