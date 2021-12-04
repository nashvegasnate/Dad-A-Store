import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CardText, CardBody, CardTitle, Button
} from 'reactstrap';
import styled from 'styled-components';
import { deletePaymentType } from '../helpers/data/paymentTypesData';
import PaymentForm from '../forms/PaymentForm';

const StyledPaymentCard = styled.div`
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
`;
function PaymentTypeCard({
  user,
  paymentID,
  paymentType,
  setPayments
}) {
  const [editing, setEditing] = useState(false);

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deletePaymentType(paymentID)
          .then(setPayments);
        break;
      case 'edit':
      //  setEditing((prevState) => !prevState);
        setEditing(!editing);
        break;
      // case 'view':
      //   history.push(`paymenttypes/${paymentID}`);
      //   break;
      default:
        console.warn('nothing selected');
    }
  };

  return (
    <div className="paymentCard">
      <StyledPaymentCard className='payment-cards'>
        <CardBody>
          <CardTitle tag="h3">Payment Type: {paymentType}</CardTitle>
          <br />
          <CardText>User: {user.userName}</CardText>
          <Button className="deleteBtn" onClick={() => handleClick('delete')}>Delete</Button>
        <Button className="editBtn" onClick={() => handleClick('edit')}>Edit</Button>
        {editing
          && <PaymentForm
            formTitle='Edit Payment Type'
            user={user}
            paymentID={paymentID}
            paymentType={paymentType}
            setPayments={setPayments}
          />
        }
        </CardBody>
      </StyledPaymentCard>
    </div>
  );
}

PaymentTypeCard.propTypes = {
  user: PropTypes.any.isRequired,
  paymentID: PropTypes.any.isRequired,
  paymentType: PropTypes.string.isRequired,
  setPayments: PropTypes.func
};

export default PaymentTypeCard;
