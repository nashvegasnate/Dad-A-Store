import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getPaymentTypes = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/paymenttypes`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deletePaymentType = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/api/paymenttypes/${firebaseKey}.json`)
    .then(() => getPaymentTypes().then((paymentsArray) => resolve(paymentsArray)))
    .catch((error) => reject(error));
});

const updatePaymentType = (payment) => new Promise((resolve, reject) => {
  axios.patch(`${dbURL}/api/paymenttypes/${payment.firebaseKey}.json`, payment)
    .then(() => getPaymentTypes().then(resolve))
    .catch((error) => reject(error));
});

export { getPaymentTypes, deletePaymentType, updatePaymentType };
