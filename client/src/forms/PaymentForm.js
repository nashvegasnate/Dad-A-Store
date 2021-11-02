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
    firebaseKey,
  }) => {
    const [payment, setPayments] = useState({
      paymentType: paymentType || '',
      firebaseKey: firebaseKey || null
    });

    const handleInputChange = (e) => {
        setProject((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
};

const history = useHistory();


  }