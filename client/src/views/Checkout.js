import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';

function Checkout({ userFromDB }) {
  return (
    <div>
      <Card className='expense-cards'>
        <CardBody>
          <CardTitle tag="h3">Checkout information for {userFromDB.userFirst} {userFromDB.userLast}.</CardTitle>
          <CardText>Shipping Address: <br /> {userFromDB.userFirst} {userFromDB.userLast} <br />     {userFromDB.userAddress1} {userFromDB.userAddress2}
          <br />{userFromDB.userCity}, {userFromDB.userState} {userFromDB.userZip}</CardText>
          <br />
          <Button className='mt-1' color='danger'>Delete</Button>
        </CardBody>
      </Card>
    </div>
  );
}

Checkout.propTypes = {
  userFromDB: PropTypes.any.isRequired
};

export default Checkout;
