import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getOpenCart = (userID) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/userCart/${userID}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateCartSingleItem = (userID, cartObj) => new Promise((resolve, reject) => {
  axios.put(`${dbURL}/updateCartDetailItem/${userID}`, cartObj)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default { getOpenCart, updateCartSingleItem };
