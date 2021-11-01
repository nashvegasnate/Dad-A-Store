import React from 'react';
import {
  Card, CardText, CardBody, CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';

function OrderCard({
  orderID,
  userID,
  paymentID,
  orderAmount,
  orderDate,
  shipDate
}) {
  return (
    <div>
      <Card className='order-cards'>
        <CardBody>
          <CardTitle tag="h3">Order: {orderID}</CardTitle>
          <CardText>UserID: {userID}</CardText>
          <CardText>PaymentID: {paymentID}</CardText>
          <CardText>Order Amount: {orderAmount}</CardText>
          <CardText>Order Date: {orderDate}</CardText>
          <CardText>Ship Date: {shipDate}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

OrderCard.propTypes = {
  orderID: PropTypes.any.isRequired,
  userID: PropTypes.any.isRequired,
  paymentID: PropTypes.any.isRequired,
  orderAmount: PropTypes.any.isRequired,
  orderDate: PropTypes.any.isRequired,
  shipDate: PropTypes.any.isRequired
};

export default OrderCard;
