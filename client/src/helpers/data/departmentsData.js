import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getDepartments = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/departments`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getDepartmentByDepartmentID = (departmentID) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/departments/GetDepartmentByDepartmentID/${departmentID}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

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
  getDepartmentByDepartmentID,
  addDepartment,
  updateDepartment,
  deleteDepartment
};
