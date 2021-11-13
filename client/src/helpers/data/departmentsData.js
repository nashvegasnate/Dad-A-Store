import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getDepartments = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/departments`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// This way doesn't show any departments in the departmentView
// const getDepartments = () => new Promise((resolve, reject) => {
//   axios.get(`${dbURL}/api/departments`)
//     .then(() => getDepartments().then(resolve))
//     .catch((error) => reject(error));
// });

// const addDepartment = (dept) => new Promise((resolve, reject) => {
//   axios.post(`${dbURL}/api/departments`, dept)
//     .then((response) => resolve(response.data))
//     .catch((error) => reject(error));
// });

const addDepartment = (dept) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/api/departments`, dept)
    .then(() => {
      getDepartments().then((resolve));
    }).catch((error) => reject(error));
});

const deleteDepartment = (ID) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/api/departments/${ID}`)
    .then(() => getDepartments().then(resolve))
    .catch((error) => reject(error));
});

const updateDepartment = (obj) => new Promise((resolve, reject) => {
  axios.put(`${dbURL}/api/departments/${obj.departmentID}`, obj)
    .then(() => getDepartments().then(resolve))
    .catch((error) => reject(error));
});

export {
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment
};
