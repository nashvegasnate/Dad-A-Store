import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getDepartments = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/api/departments`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getDepartments;
