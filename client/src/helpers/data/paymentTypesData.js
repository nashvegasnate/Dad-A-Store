import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getPaymentTypes = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/paymenttypes`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const addPaymentType = (obj) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/api/paymenttypes.json`, obj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbURL}/api/paymenttypes/${response.data.name}.json`, body)
        .then(() => {
          getPaymentTypes().then((resp) => resolve(resp));
        });
    }).catch((error) => reject(error));
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

export {
  getPaymentTypes, addPaymentType,
  deletePaymentType, updatePaymentType
};
