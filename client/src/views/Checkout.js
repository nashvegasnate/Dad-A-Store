import React, { useState, useEffect } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { getUserPaymentType } from '../helpers/data/paymentTypesData';

function Checkout({ userFromDB }) {
  const [userPayment, setUserPayment] = useState(null);
  const [orderPlaced] = useState(false);

  useEffect(() => {
    getUserPaymentType(userFromDB.paymentID).then((paymentObj) => setUserPayment(paymentObj));
  }, []);
  return (
    <div>
      <Card className='expense-cards'>
        <CardBody>
          <CardTitle tag="h3">Checkout information for {userFromDB.userFirst} {userFromDB.userLast}.</CardTitle>
          <CardText>Shipping Address: <br /> {userFromDB.userFirst} {userFromDB.userLast} <br />     {userFromDB.userAddress1} {userFromDB.userAddress2}
          <br />{userFromDB.userCity}, {userFromDB.userState} {userFromDB.userZip}</CardText>
          <br />
          {
            userPayment
            && <CardText>Payment Type: {userPayment[0].paymentType}</CardText>
          }
          { !orderPlaced && <Button className='mt-1' color='success'>Place Order</Button> }
        </CardBody>
      </Card>
    </div>
  );
}

Checkout.propTypes = {
  userFromDB: PropTypes.any.isRequired
};

export default Checkout;
