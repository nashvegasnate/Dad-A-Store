import React from 'react';
import {
  Card, CardText, CardBody, CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';

function PaymentTypeCard({
  orderID,
  userID
}) {
  return (
    <div>
      <Card className='order-cards'>
        <CardBody>
          <CardTitle tag="h3">User: {userName}</CardTitle>
          <CardText>UserID: {userID}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}