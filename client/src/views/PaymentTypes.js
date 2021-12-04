import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import PaymentTypeCard from '../components/PaymentCard';
import PaymentForm from '../forms/PaymentForm';

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  z-index: -1;
  `;

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
    {!showAddPayment
      ? <Button className="addPayBtn" color="success" onClick={handleClick}>Add Payment</Button>
      : <div>
            <Button className="closeForm" color="danger" onClick={handleClick}>Close Form</Button>
            <PaymentForm
            setAddPayment={setAddPayment}
              setPayments={setPayments}
              user={user}
            />
        </div>
    }
    </div>
      <h3>Payments</h3>
      <PaymentContainer className="payments-container align-content-center" id="payments-container">
      {
         payments.map((paymentInfo) => (
          <PaymentTypeCard
          key={paymentInfo.paymentID}
          paymentID={paymentInfo.paymentID}
          paymentType={paymentInfo.paymentType}
          user={user}
          setPayments={setPayments}
          />
         ))
      }
      </PaymentContainer>
    </div>
  );
}

Payments.propTypes = {
  user: PropTypes.any,
  payments: PropTypes.array,
  setPayments: PropTypes.func
};
