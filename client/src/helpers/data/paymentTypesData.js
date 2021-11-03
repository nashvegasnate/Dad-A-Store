import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getPaymentTypes = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/paymenttypes`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const addPaymentType = (obj) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/api/paymenttypes`, obj)
    .then(() => {
      // const body = { paymentID: response.paymentID };
      axios.put(`${dbURL}/api/paymenttypes`)
        .then(() => {
          getPaymentTypes().then((resp) => resolve(resp));
        });
    }).catch((error) => reject(error));
});

const deletePaymentType = (paymentID) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/api/paymenttypes/${paymentID}`)
    .then(() => getPaymentTypes().then((paymentsArray) => resolve(paymentsArray)))
    .catch((error) => reject(error));
});

const updatePaymentType = (payment) => new Promise((resolve, reject) => {
  console.warn(payment);
  axios.put(`${dbURL}/api/paymenttypes/${payment.paymentID}`, payment)
    .then(() => getPaymentTypes().then(resolve))
    .catch((error) => reject(error));
});

export {
  getPaymentTypes, addPaymentType,
  deletePaymentType, updatePaymentType
};
