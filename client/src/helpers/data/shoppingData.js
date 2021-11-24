import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getItemByName = (itemName) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/items/CGetItemByNameFromDB/${itemName}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getItemByName;
