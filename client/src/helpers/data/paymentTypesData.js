import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getPaymentTypes = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/paymenttypes`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getUserPaymentType = (paymentID) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/paymenttypes/GetPaymentmentByPaymentID/${paymentID}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getPaymentTypeByPaymentID = (paymentID) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/paymenttypes/GetPaymentByPaymentID/${paymentID}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const addPaymentType = (paymentObj) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/api/paymenttypes`, paymentObj)
    .then(() => getPaymentTypes().then(resolve))
    // resolve(resp.data);
    .catch((error) => reject(error));
});

const deletePaymentType = (paymentID) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/api/paymenttypes/${paymentID}`)
    .then(() => getPaymentTypes().then((paymentArray) => resolve(paymentArray)))
    .catch((error) => reject(error));
});

const updatePaymentType = (payment) => new Promise((resolve, reject) => {
  axios.put(`${dbURL}/api/paymenttypes/${payment.paymentID}`, payment)
    .then(() => getPaymentTypes().then((paymentArray) => resolve(paymentArray)))
    .catch((error) => reject(error));
});

export {
  getPaymentTypes, getUserPaymentType, getPaymentTypeByPaymentID,
  addPaymentType, deletePaymentType, updatePaymentType
};
