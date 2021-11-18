import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getOrders = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/orders`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const placeOrderFromCart = (userID) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/api/orders/createFromCart/${userID}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export { getOrders, placeOrderFromCart };
