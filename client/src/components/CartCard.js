import React, { useState } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function CartCard({
  userFromDB,
  cart
}) {
  const [orderTax] = useState(cart.orderAmount * 0.10);
  const [orderShipping] = useState(25);
  const [orderTotal] = useState(cart.orderAmount + orderTax + orderShipping);

  const history = useHistory();

  const handleOrder = () => {
    history.push('/orders');
  };

  return (
    <div>
     <Card className='expense-cards'>
        <CardBody>
          <CardTitle tag="h3">{userFromDB.userFirst} {userFromDB.userLast} cart total</CardTitle>
          <CardText>Cart Subtotal: ${cart.orderAmount}</CardText>
          <CardText>Tax: ${orderTax}</CardText>
          <CardText>Shipping: ${orderShipping}</CardText>
          <CardText>OrderTotal: ${orderTotal}</CardText>
          <Button className='mt-1' color='info' onClick={handleOrder}>{userFromDB.paymentID}</Button>
        </CardBody>
      </Card>
    </div>
  );
}

CartCard.propTypes = {
  userFromDB: PropTypes.any.isRequired,
  cart: PropTypes.any.isRequired
};

export default CartCard;
