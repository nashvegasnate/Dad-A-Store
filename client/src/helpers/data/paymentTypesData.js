import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getPaymentTypes = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/paymenttypes`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

//  .then(() => getPaymentTypes()
const addPaymentType = (paymentObj) => new Promise((resolve, reject) => {
  // console.warn(paymentObj);
  axios.post(`${dbURL}/api/paymenttypes`, paymentObj)
    .then((resp) => {
      resolve(resp.data);
    }).catch((error) => reject(error));
});

// const addPaymentType = (obj) => new Promise((resolve, reject) => {
//   axios.post(`${dbURL}/api/paymenttypes`, obj)
//     .then((response) => {
//       const body = { paymentID: response.data.name };
//       axios.put(`${dbURL}/api/paymenttypes/${response.data.name}`, body)
//         .then(() => {
//           getPaymentTypes().then((resp) => resolve(resp));
//         });
//     }).catch((error) => reject(error));
// });

const deletePaymentType = (paymentID) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/api/paymenttypes/${paymentID}`)
    .then(() => getPaymentTypes().then((paymentArray) => resolve(paymentArray)))
    .catch((error) => reject(error));
});

// console.warn(payment); resolve(response.data))    .then(() => getPaymentTypes()
const updatePaymentType = (payment) => new Promise((resolve, reject) => {
  axios.put(`${dbURL}/api/paymenttypes/${payment.paymentID}`, payment)
    .then((paymentArray) => resolve(paymentArray))
    .catch((error) => reject(error));
});

export {
  getPaymentTypes, addPaymentType,
  deletePaymentType, updatePaymentType
};
