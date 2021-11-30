import React, { useState, useEffect } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getUserPaymentType } from '../helpers/data/paymentTypesData';
import { placeOrderFromCart } from '../helpers/data/ordersData';

function Checkout({ userFromDB }) {
  const [userPayment, setUserPayment] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  const history = useHistory();

  useEffect(() => {
    getUserPaymentType(userFromDB.paymentID).then((paymentObj) => setUserPayment(paymentObj));
  }, []);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    placeOrderFromCart(userFromDB.userID).then((orderObj) => setOrderInfo(orderObj));
    setOrderPlaced(true);
  };

  const handleViewOrders = () => {
    history.push('/myorders');
  };

  const orderIsPlaced = () => (
    <>
      <Card className='expense-cards'>
        <CardBody>
          <CardTitle tag="h3">Order Placed!</CardTitle>
          <CardText>Order Number: {orderInfo.orderID}</CardText>
          <CardText>Order Total: ${orderInfo.orderAmount}</CardText>
          <CardText>Payment Type: {userPayment[0].paymentType}</CardText>
          <CardText>Order Date: {orderInfo.orderDate}</CardText>
          <br />
          <Button className='mt-1' color='info' onClick={handleViewOrders}>View my orders</Button>
        </CardBody>
      </Card>
    </>
  );

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
          { !orderPlaced && <Button className='mt-1' color='success' onClick={handlePlaceOrder}>Place Order</Button> }
        </CardBody>
      </Card>
      { orderInfo && orderIsPlaced() }
    </div>
  );
}

Checkout.propTypes = {
  userFromDB: PropTypes.any.isRequired
};

export default Checkout;
