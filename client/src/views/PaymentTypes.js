import React from 'react';
import PropTypes from 'prop-types';
import PaymentTypeCard from '../components/PaymentCard';

export default function Payments({user, payments}) {
  return (
    <div>
      <h2>{user.userName} Payment Type Info </h2>
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