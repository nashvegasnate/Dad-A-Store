import React, { useState, useEffect } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getUserPaymentType } from '../helpers/data/paymentTypesData';

function CompletedOrderCard({
  userFromDB,
  orderID,
  paymentID,
  orderAmount,
  orderDate,
  shipDate
}) {
  const [userPayment, setUserPayment] = useState(null);

  const history = useHistory();

  useEffect(() => {
    getUserPaymentType(paymentID).then((paymentObj) => setUserPayment(paymentObj));
  }, []);

  const handleClick = () => {
    history.push(`/singleCompleteOrder/${orderID}`);
  };

  return (
    <div>
      <Card className='expense-cards'>
        <CardBody>
          <CardTitle tag="h3">Order for {userFromDB.userFirst} {userFromDB.userLast}</CardTitle>
          <CardText>Order Number: {orderID}</CardText>
          <CardText>Order Amount: ${orderAmount}</CardText>
          { userPayment && <CardText>Payment Type: {userPayment[0].paymentType}</CardText> }
          <CardText>Order Date: {orderDate}</CardText>
          <CardText>Ship Date: {shipDate}</CardText>
          <Button className='mt-1' color='info' onClick={handleClick}>View Details</Button>
        </CardBody>
      </Card>
    </div>
  );
}

CompletedOrderCard.propTypes = {
  userFromDB: PropTypes.any.isRequired,
  orderID: PropTypes.string.isRequired,
  paymentID: PropTypes.string.isRequired,
  orderAmount: PropTypes.number.isRequired,
  orderDate: PropTypes.any.isRequired,
  shipDate: PropTypes.any.isRequired
};

export default CompletedOrderCard;
