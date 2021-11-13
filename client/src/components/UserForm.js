import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { addUserToDB } from '../helpers/data/usersData';

function UserForm() {
  const [newUser, setNewUser] = useState({
    userFirst: '',
    userLast: '',
    userAddress1: '',
    userAddress2: '',
    userCity: '',
    userState: '',
    userZip: 0,
    paymentID: '132fce4c-8d39-ec11-9141-6c6a77444a6b',
    userUID: '12345',
    userRole: 'CUSTOMER',
    paymentType: ''
  });

  const handleInputChange = (e) => {
    setNewUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleNumberInput = (e) => {
    setNewUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.valueAsNumber
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUserToDB(newUser);
    console.warn('Submitted');
  };

  return (
    <div>
      <form className='mt-3' id='add-expense-form' autoComplete='off' onSubmit={handleSubmit}>
        <h2>Create your Dad-A-Store account.</h2>
        <label>First Name:</label>
        <input
        className='ml-2'
        name='userFirst'
        type='text'
        placeholder='First'
        value={newUser.userFirst}
        onChange={handleInputChange} />
        <br/>
        <label>Last Name:</label>
        <input
        className='ml-2'
        name='userLast'
        type='text'
        placeholder='Last'
        value={newUser.userLast}
        onChange={handleInputChange} />
        <br/>
        <label>Address1:</label>
        <input
        className='ml-2'
        name='userAddress1'
        type='text'
        placeholder='Address'
        value={newUser.userAddress1}
        onChange={handleInputChange} />
        <br/>
        <label>Address2:</label>
        <input
        className='ml-2'
        name='userAddress2'
        type='text'
        placeholder='Apt #'
        value={newUser.userAddress2}
        onChange={handleInputChange} />
        <br/>
        <label>City:</label>
        <input
        className='ml-2'
        name='userCity'
        type='text'
        placeholder='City'
        value={newUser.userCity}
        onChange={handleInputChange} />
        <br/>
        <label>State:</label>
        <input
        className='ml-2'
        name='userState'
        type='text'
        placeholder='State'
        value={newUser.userState}
        onChange={handleInputChange} />
        <br/>
        <label>Zip Code:</label>
        <input
        className='ml-2'
        name='userZip'
        type='number'
        placeholder='37122'
        value={newUser.userZip}
        onChange={handleNumberInput} />
        <br/>
       <br/>
        <label>Payment Type:</label>
        <input
        className='ml-2'
        name='paymentType'
        type='text'
        placeholder='Visa, MasterCard...'
        value={newUser.paymentType}
        onChange={handleInputChange} />
        <br/>
        <Button color='success' type='submit'>Submit</Button>
      </form>
    </div>
  );
}

UserForm.propTypes = {
  user: PropTypes.any
};

export default UserForm;
