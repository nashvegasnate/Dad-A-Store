import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import firebaseConfig from './helpers/apiKeys';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import './styles/index.scss';
=======
>>>>>>> b5f6802ce811b254c8f287ead9c70b1131626038
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
