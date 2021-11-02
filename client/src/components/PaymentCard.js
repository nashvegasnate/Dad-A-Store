import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card, CardText, CardBody, CardTitle
} from 'reactstrap';
import { deletePaymentType } from '../helpers/data/paymentTypesData';
import PaymentForm from '../forms/PaymentForm';

function PaymentTypeCard({
  user,
  firebaseKey,
  paymentID,
  paymentType,
  setPayments
}) {
  const [editing, setEditing] = useState(false);
  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deletePaymentType(firebaseKey)
          .then(setPayments);
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      case 'view':
        history.push(`/paymenttypes/${firebaseKey}`);
        break;
      default:
        console.warn('nothing selected');
    }
  };

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
  user: PropTypes.any.isRequired,
  firebaseKey: PropTypes.string,
  paymentID: PropTypes.any.isRequired,
  paymentType: PropTypes.any.isRequired,
  setPayments: PropTypes.func
};

export default PaymentTypeCard;
