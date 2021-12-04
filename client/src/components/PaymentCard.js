import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  CardText, CardBody, CardTitle, Button
} from 'reactstrap';
import { deletePaymentType } from '../helpers/data/paymentTypesData';
import PaymentForm from '../forms/PaymentForm';

const PayCard = styled.div`
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
      <PayCard className='payment-cards'>
        <CardBody>
          <CardTitle tag="h3">Payment Type: {paymentType}</CardTitle>
          <br />
          <CardText>User: {user.uid}</CardText>
          <Button className="deleteBtn md mr-2 ml-2 mt-2" color="danger" onClick={() => handleClick('delete')}>Delete</Button>
        <Button className="editBtn md mr-2 ml-2 mt-2" color="info" onClick={() => handleClick('edit')}>Edit</Button>
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
      </PayCard>
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
