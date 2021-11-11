import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getCartDetails = (cartID) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/getByCartID/${cartID}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getCartDetails;
