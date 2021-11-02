import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getItems = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/items`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const additem = (itemObject, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/api/items`, itemObject)
    .then(() => {
      getItems(uid).then((itemsArray) => resolve(itemsArray));
    }).catch((error) => reject(error));
});

const updateItem = (itemObject, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbURL}/api/items/${itemObject.itemID}`, itemObject)
    .then(() => {
      getItems(uid).then((itemsArray) => resolve(itemsArray));
    }).catch((error) => reject(error));
});

export { getItems, additem, updateItem };
