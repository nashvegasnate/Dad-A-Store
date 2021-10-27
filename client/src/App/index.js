import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';
import getOrders from '../helpers/data/ordersData';

function App() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          user: authed.displayName,
          uid: authed.uid
        };
        setUser(userInfoObj);
        getOrders().then((ordersArray) => setOrders(ordersArray));
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className='App'>
      <Router>
        <NavBar user={user} />
        <Routes
        user={user}
        orders={orders}
        />
      </Router>
    </div>
  );
}

export default App;
