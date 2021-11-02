import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import PaymentTypeCard from '../components/PaymentCard';
import PaymentForm from '../forms/PaymentForm';

export default function Payments({ user, payments }) {
  return (
    <div>
      <h2>Payment Type Info for {user.userName}</h2>
      {
        payments.map((paymentInfo) => (
          <PaymentTypeCard
          Key={paymentInfo.paymentID}
          paymentID={paymentInfo.paymentID}
          paymentType={paymentInfo.paymentType}
          user={user}
          />
        ))
      }
    </div>
  );
}

Payments.propTypes = {
  user: PropTypes.any,
  payments: PropTypes.array.isRequired
};
