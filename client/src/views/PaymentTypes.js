import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import PaymentTypeCard from '../components/PaymentCard';
import PaymentForm from '../forms/PaymentForm';

export default function Payments({
  user, payments, setPayments
}) {
  const [showAddPayment, setAddPayment] = useState(false);

  const handleClick = () => {
    setAddPayment((prevState) => !prevState);
  };

  return (
    <div className="paymentView">
      <div className="card-container">
      <br />

    <div>
    {!showAddPayment
      ? <Button className="addPayBtn" onClick={handleClick}>Add Payment</Button>
      : <div>
            <Button className="closeForm" onClick={handleClick}>Close Form</Button>
            <PaymentForm
            setAddPayment={setAddPayment}
              setPayments={setPayments}
              user={user}
            />
        </div>
    }
    </div>
      <h2>Payment Type Info for {user.userName}</h2>
      {
        payments.length > 0
          ? payments.map((paymentInfo, i) => (
          <PaymentTypeCard
          Key={i}
          paymentID={paymentInfo.paymentID}
          paymentType={paymentInfo.paymentType}
          user={user}
          setPayments={setPayments}
          />
          ))
          : <h1>No Payments</h1>
      }
      </div>
    </div>
  );
}

Payments.propTypes = {
  user: PropTypes.any,
  payments: PropTypes.array,
  setPayments: PropTypes.func
};
