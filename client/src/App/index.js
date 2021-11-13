import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';
import { getItems } from '../helpers/data/itemsData';
import getOrders from '../helpers/data/ordersData';
<<<<<<< HEAD
import { getCategories } from '../helpers/data/categoriesData';
=======
import { getDepartments } from '../helpers/data/departmentsData';
>>>>>>> a21766d0983c7f1bd6b4234cc07e964f1bab87a2
import { getValidUser, getUserWithUID } from '../helpers/data/usersData';
<<<<<<< HEAD
=======
import { getPaymentTypes } from '../helpers/data/paymentTypesData';
<<<<<<< HEAD

>>>>>>> e8855fdb5f70070d61968e8e6e189fc50b5dee3d
=======
>>>>>>> 5abb8935e27baad712b9f4ce3d3604fc6a589ee2
import './App.scss';

function App() {
  const [user, setUser] = useState(null);
  const [userFromDB, setUserFromDB] = useState(null);
  const [registeredUser, setRegisteredUser] = useState(false);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
<<<<<<< HEAD
<<<<<<< HEAD
  const [categories, setCategories] = useState([]);
=======
=======
  const [departments, setDepartments] = useState([]);
>>>>>>> a21766d0983c7f1bd6b4234cc07e964f1bab87a2
  const [payments, setPayments] = useState([]);
>>>>>>> e8855fdb5f70070d61968e8e6e189fc50b5dee3d

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
<<<<<<< HEAD
        getCategories().then((categoriesArray) => setCategories(categoriesArray));
=======
=======
        getDepartments().then((departmentsAray) => setDepartments(departmentsAray));
>>>>>>> a21766d0983c7f1bd6b4234cc07e964f1bab87a2
        getPaymentTypes().then((paymentsArray) => setPayments(paymentsArray));
>>>>>>> e8855fdb5f70070d61968e8e6e189fc50b5dee3d
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
        orders={orders}
        items={items}
<<<<<<< HEAD
<<<<<<< HEAD
        categories={categories}
        setCategories={setCategories}
=======
=======
        departments={departments}
        setDepartments={setDepartments}
>>>>>>> a21766d0983c7f1bd6b4234cc07e964f1bab87a2
        payments={payments}
        setPayments={setPayments}
>>>>>>> e8855fdb5f70070d61968e8e6e189fc50b5dee3d
        registeredUser={registeredUser}
        userFromDB={userFromDB}
        setItems={setItems}
        />
      </Router>
    </div>
  );
}

export default App;
