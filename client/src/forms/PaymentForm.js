import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Button, Form, FormGroup, Input, Label
} from 'reactstrap';
import { addPaymentType, updatePaymentType } from '../helpers/data/paymentTypesData';

const PaymentForm = ({
  formTitle,
  setPayments,
  paymentType,
  paymentID,
  firebaseKey,
}) => {
  const [payment, setPayment] = useState({
    paymentType: paymentType || '',
    paymentID: paymentID || null,
    firebaseKey: firebaseKey || null
  });

  const handleInputChange = (e) => {
    setPayment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (payment.firebaseKey) {
      updatePaymentType(payment).then(setPayments);
    } else {
      addPaymentType(payment).then((Response) => {
        setPayments(Response);
        history.push('/payments');
      });

      // Clears Input Fields
      setPayment({
        paymentType: '',
        firebaseKey: null
      });
    }
  };

  return (
    <div className='payment-form'>
      <Form
        id='addPaymentForm'
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <h2>{formTitle}</h2>

        <FormGroup>
          <Label for="paymentType">Payment Type: </Label>
          <Input
            name='paymentType'
            id='paymentType'
            value={payment.paymentType}
            type='text'
            placeholder='Enter Payment Type'
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button type='submit'>Submit</Button>
        </Form>
    </div>
  );
};

PaymentForm.propTypes = {
  formTitle: PropTypes.string,
  setPayments: PropTypes.func,
  paymentType: PropTypes.string,
  paymentID: PropTypes.string,
  firebaseKey: PropTypes.string
};

export default PaymentForm;
