import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';
import { getValidUser, getUserWithUID } from '../helpers/data/usersData';
import getOrders from '../helpers/data/ordersData';
<<<<<<< HEAD
import { getItems } from '../helpers/data/itemsData';
import { getCategories } from '../helpers/data/categoriesData';
=======
<<<<<<< HEAD
import { getCategories } from '../helpers/data/categoriesData';
=======
import { getDepartments } from '../helpers/data/departmentsData';
>>>>>>> a21766d0983c7f1bd6b4234cc07e964f1bab87a2
import { getValidUser, getUserWithUID } from '../helpers/data/usersData';
<<<<<<< HEAD
=======
>>>>>>> main
import { getPaymentTypes } from '../helpers/data/paymentTypesData';

import './App.scss';

function App() {
  const [user, setUser] = useState(null);
  const [userFromDB, setUserFromDB] = useState(null);
  const [registeredUser, setRegisteredUser] = useState(false);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
<<<<<<< HEAD
  const [categories, setCategories] = useState([]);
=======
<<<<<<< HEAD
<<<<<<< HEAD
  const [categories, setCategories] = useState([]);
=======
=======
  const [departments, setDepartments] = useState([]);
>>>>>>> a21766d0983c7f1bd6b4234cc07e964f1bab87a2
>>>>>>> main
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          userName: authed.displayName,
          uid: authed.uid
        };
        getUserWithUID(authed.uid).then((resp) => setUserFromDB(resp));
        getValidUser(authed.uid).then((validResp) => setRegisteredUser(validResp));
        getOrders().then((ordersArray) => setOrders(ordersArray));
        getItems().then((itemsArray) => setItems(itemsArray));
<<<<<<< HEAD
        getCategories().then((categoriesArray) => setCategories(categoriesArray));
=======
<<<<<<< HEAD
<<<<<<< HEAD
        getCategories().then((categoriesArray) => setCategories(categoriesArray));
=======
=======
        getDepartments().then((departmentsAray) => setDepartments(departmentsAray));
>>>>>>> a21766d0983c7f1bd6b4234cc07e964f1bab87a2
>>>>>>> main
        getPaymentTypes().then((paymentsArray) => setPayments(paymentsArray));
        setUser(userInfoObj);
      } else if (user || user === null) {
        setUser(false);
        setRegisteredUser(false);
        setUserFromDB(false);
      }
    });
  }, []);

  return (
    <div className='App'>
      <Router>
        <NavBar
        user={user}
        registeredUser={registeredUser}
        />
        <Routes
        user={user}
        registeredUser={registeredUser}
        userFromDB={userFromDB}
        orders={orders}
        items={items}
<<<<<<< HEAD
        setItems={setItems}
        categories={categories}
        setCategories={setCategories}
=======
<<<<<<< HEAD
<<<<<<< HEAD
        categories={categories}
        setCategories={setCategories}
=======
=======
        departments={departments}
        setDepartments={setDepartments}
>>>>>>> a21766d0983c7f1bd6b4234cc07e964f1bab87a2
>>>>>>> main
        payments={payments}
        setPayments={setPayments}
        />
      </Router>
    </div>
  );
}

export default App;
