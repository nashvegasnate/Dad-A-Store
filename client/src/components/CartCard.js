import React, { useState } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';

function CartCard({
  userFromDB,
  orderAmount
}) {
  const [orderTax] = useState(orderAmount * 0.10);
  const [orderShipping] = useState(25);
  const [orderTotal] = useState(orderAmount + orderTax + orderShipping);

  return (
    <div>
      <Card className='expense-cards'>
        <CardBody>
          <CardTitle tag="h3">{userFromDB.userFirst} {userFromDB.userLast} cart total</CardTitle>
          <CardText>Cart Subtotal: ${orderAmount}</CardText>
          <CardText>Tax: ${orderTax}</CardText>
          <CardText>Shipping: ${orderShipping}</CardText>
          <CardText>OrderTotal: ${orderTotal}</CardText>
          <Button className='mt-1' color='info'>{userFromDB.paymentID}</Button>
        </CardBody>
      </Card>
    </div>
  );
}

CartCard.propTypes = {
  userFromDB: PropTypes.any.isRequired,
  orderAmount: PropTypes.number.isRequired
};

export default CartCard;
