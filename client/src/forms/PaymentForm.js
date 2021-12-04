import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Input, Label
} from 'reactstrap';
import { addPaymentType, updatePaymentType } from '../helpers/data/paymentTypesData';

const PaymentForm = ({
  formTitle,
  paymentID,
  paymentType,
  setPayments
}) => {
  const [paymentUpdate, setPaymentUpdate] = useState({
    paymentID: paymentID || null,
    paymentType: paymentType || ''
  });

  const handleInputChange = (e) => {
    setPaymentUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentUpdate.paymentID !== null) {
      updatePaymentType(paymentUpdate).then(setPayments);
      // setPaymentUpdate(!paymentUpdate);
    } else {
      const newPaymentType = { paymentType: paymentUpdate.paymentType };
      addPaymentType(newPaymentType).then((response) => {
        setPayments(response);
      });

      // Clears Input Fields
      setPaymentUpdate({
        // paymentID: null,
        paymentType: ''
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
            defaultValue={paymentType}
            type='text'
            placeholder='Enter Payment Type'
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button type='submit' color='success'>Submit</Button>
        </Form>
    </div>
  );
};

PaymentForm.propTypes = {
  formTitle: PropTypes.string,
  paymentID: PropTypes.any,
  paymentType: PropTypes.string,
  setPayments: PropTypes.func
};

export default PaymentForm;
