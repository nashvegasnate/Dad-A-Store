import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';
import { getItems } from '../helpers/data/itemsData';

function App() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          user: authed.displayName,
          uid: authed.uid
        };
        setUser(userInfoObj);
        getItems().then((itemsArray) => setCategories(itemsArray));
        categories
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
        categories={categories}

        />
      </Router>
    </div>
  );
}

export default App;
