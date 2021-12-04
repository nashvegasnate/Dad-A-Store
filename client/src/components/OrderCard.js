import React from 'react';
// import styled from 'styled-components';
import {
  Card, CardText, CardBody, CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';

// const OrdCard = styled.div`
//   display: flex;
//   flex-flow: row-wrap;
//   flex-wrap: wrap;
//   flex-direction: row;
//   justify-content: space-around;
//   align-self: auto;
//   flex-basis: 20em;
//   margin: 15px;
//   margin-top: 20px;
//   margin-bottom: 20px;
//   background-color: lightGrey;
//   box-shadow: 10px;
//   border: 5px double #2F8F20;
//   width: 400px;
//   height: 250px;
// `;

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
