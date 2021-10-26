import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getOrders = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/orders`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export default getOrders;
