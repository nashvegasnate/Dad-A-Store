import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card, CardText, CardBody, CardTitle
} from 'reactstrap';
import { deletePaymentType } from '../helpers/data/paymentTypesData';
import PaymentForm from '../forms/PaymentForm';

function PaymentTypeCard({
  paymentID,
  paymentType,
  user
}) {
  return (
    <div>
      <Card className='payment-cards'>
        <CardBody>
          <CardTitle tag="h3">Payment Type: {paymentType}</CardTitle>
          <CardText>PaymentID: {paymentID}</CardText>
          <CardText>User: {user.uid}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

PaymentTypeCard.propTypes = {
  paymentID: PropTypes.any.isRequired,
  paymentType: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired
};

export default PaymentTypeCard;
