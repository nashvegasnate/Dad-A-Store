import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getItems = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/items`)
    .then((response) => {
      if (response) {
        resolve(response.data);
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const getItemByItemID = (itemID) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/items/CGetItemByItemID/${itemID}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getItemByName = (itemName) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/items/CGetItemByNameFromList/${itemName}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const additem = (itemObject) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/api/items`, itemObject)
    .then(() => {
      getItems().then((resolve));
    }).catch((error) => reject(error));
});

const updateItem = (itemObject) => new Promise((resolve, reject) => {
  axios.put(`${dbURL}/api/items/${itemObject.itemID}`, itemObject)
    .then(() => {
      getItems().then((resolve));
    }).catch((error) => reject(error));
});

const deleteItem = (itemID) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/api/items/${itemID}`)
    .then(() => {
      getItems().then((resolve));
    }).catch((error) => reject(error));
});

export {
  getItems, getItemByItemID, getItemByName, additem, updateItem, deleteItem
};
