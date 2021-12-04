import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getUserPaymentType } from '../helpers/data/paymentTypesData';

const OpenOrdCard = styled.div`
  display: flex;
  flex-flow: row-wrap;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-self: auto;
  flex-basis: 20em;
  margin: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: lightGrey;
  box-shadow: 10px;
  border: 5px double #2F8F20;
  width: 400px;
  height: 250px;
`;

function OpenOrderCard({
  userFromDB,
  orderID,
  paymentID,
  orderAmount,
  orderDate
}) {
  const [userPayment, setUserPayment] = useState(null);

  const history = useHistory();

  useEffect(() => {
    getUserPaymentType(paymentID).then((paymentObj) => setUserPayment(paymentObj));
  }, []);

  const handleClick = () => {
    history.push(`/singleOrder/${orderID}`);
  };

  return (
    <div>
      <OpenOrdCard className='expense-cards'>
        <CardBody>
          <CardTitle tag="h3">Order for {userFromDB.userFirst} {userFromDB.userLast}</CardTitle>
          <CardText>Order Number: {orderID}</CardText>
          <CardText>Order Amount: ${orderAmount}</CardText>
          { userPayment && <CardText>Payment Type: {userPayment[0].paymentType}</CardText> }
          <CardText>Order Date: {orderDate}</CardText>
          <Button className='mt-1' color='info' onClick={handleClick}>View Details</Button>
        </CardBody>
      </OpenOrdCard>
    </div>
  );
}

OpenOrderCard.propTypes = {
  userFromDB: PropTypes.any.isRequired,
  orderID: PropTypes.string.isRequired,
  paymentID: PropTypes.string.isRequired,
  orderAmount: PropTypes.number.isRequired,
  orderDate: PropTypes.any.isRequired
};

export default OpenOrderCard;
