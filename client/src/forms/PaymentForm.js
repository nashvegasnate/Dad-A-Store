import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Input, Label
} from 'reactstrap';
import styled from 'styled-components';
import { addPaymentType, updatePaymentType } from '../helpers/data/paymentTypesData';

const NewPaymentForm = styled.div`
  border: 3px;
  border-bottom-style: double;
  border-color: #2F8F20;
  background-color: lightGrey;
  display: inline-block;
  align-items: center;
  text-align: center;
  margin: 10px;
  justify-content: space-between;
  padding: 20px;
  width: 450px;
  justify-items: center;
  `;

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
            required
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
  paymentID: PropTypes.any,
  paymentType: PropTypes.string,
  setPayments: PropTypes.func
};

export default PaymentForm;
