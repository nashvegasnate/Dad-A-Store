import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card, CardText, CardBody, CardTitle, Button
} from 'reactstrap';
import { deletePaymentType } from '../helpers/data/paymentTypesData';
import PaymentForm from '../forms/PaymentForm';

function PaymentTypeCard({
  user,
  paymentID,
  paymentType,
  setPayments
}) {
  const [editing, setEditing] = useState(false);
  // const history = useHistory();

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
      <Card className='payment-cards'>
        <CardBody>
          <CardTitle tag="h3">Payment Type: {paymentType}</CardTitle>
          <br />
          <CardText>User: {user.uid}</CardText>
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
      </Card>
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
