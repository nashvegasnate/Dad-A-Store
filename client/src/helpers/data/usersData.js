import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getValidUser = (userUID) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/users/validateUser/${userUID}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getUserWithUID = (userUID) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/users/getUserByUserUID/${userUID}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const addUserToDB = (object) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/api/users`, object)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export { getValidUser, getUserWithUID, addUserToDB };
