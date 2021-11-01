import React from 'react';
import {
  Card, CardText, CardBody, CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';

function PaymentTypeCard({
  paymentID,
  paymentType
}) {
  return (
    <div>
      <Card className='payment-cards'>
        <CardBody>
          <CardTitle tag="h3">Payment Type: {paymentType}</CardTitle>
          <CardText>PaymentID: {paymentID}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

PaymentTypeCard.propTypes = {
    paymentID: PropTypes.any.isRequired,
    paymentType: PropTypes.any.isRequired
};