import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getCategories = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/categories`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const addCategory = (categoryObj) => new Promise((resolve, reject) => {
  // console.warn(paymentObj);
  axios.post(`${dbURL}/api/categories`, categoryObj)
    .then(() => getCategories().then(resolve))
    // resolve(resp.data);
    .catch((error) => reject(error));
});

const deleteCategory = (categoryID) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/api/categories/${categoryID}`)
    .then(() => getCategories().then((categoryArray) => resolve(categoryArray)))
    .catch((error) => reject(error));
});

export { getCategories, addCategory, deleteCategory };
