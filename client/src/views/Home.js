import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { signInUser, signOutUser } from '../helpers/auth';
import grill from '../assets/grill.jpg';
import lawnmower from '../assets/lawnmower.jpg';
import tools from '../assets/tools.jpg';
import tools2 from '../assets/tools2.jpg';
// import shoes from '../assets/shoes.jpg';
import UserForm from '../components/UserForm';

const images = [grill, lawnmower, tools, tools2];

function Home({
  user,
  registeredUser,
}) {
  const isNotRegistered = () => (
    <>
      <h2>You must register before continuing </h2>
      <UserForm />
    </>
  );

  const authenticated = () => (
    <>
    <CardText>Get started by browsing our items.</CardText>
    <Button color='danger' onClick={signOutUser}> Sign Out </Button>
    </>
  );

  const notAuthenticated = () => (
    <>
    <CardText>Sign in to start using the app</CardText>
    <Button color='info' onClick={signInUser}> Sign In </Button>
    </>
  );

  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(images[Math.floor(Math.random() * images.length)]);
    }, 3500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Card className='home-card'>
        <CardBody>
          <CardTitle tag="h5">Dad-A-Store</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">An e-commerce platform for the Dad in your life.</CardSubtitle>
          <CardText>Our goal is to be the one stop shop for all Dad needs.</CardText>
          { user ? authenticated() : notAuthenticated() }
          { (user && registeredUser) && isNotRegistered() }
        </CardBody>
      </Card>
      <div className="home-page"><img src={[currentImage]}></img></div>
    </div>
  );
}

Home.propTypes = {
  user: PropTypes.any,
  registeredUser: PropTypes.bool.isRequired,
  userFromDB: PropTypes.any
};

export default Home;
