import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';
import getItems from '../helpers/data/itemsData';
import getOrders from '../helpers/data/ordersData';
import getDepartments from '../helpers/data/departmentsData';

function App() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          userName: authed.displayName,
          uid: authed.uid
        };
        setUser(userInfoObj);
        getOrders().then((ordersArray) => setOrders(ordersArray));
        getItems().then((itemsArray) => setItems(itemsArray));
        getDepartments().then((departmentsAray) => setDepartments(departmentsAray));
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
        items={items}
        departments={departments}
        />
      </Router>
    </div>
  );
}

export default App;
