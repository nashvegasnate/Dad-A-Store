import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { addUserToDB, updateUser } from '../helpers/data/usersData';

function UserForm({
  userFirst,
  userLast,
  userAddress1,
  userAddress2,
  userCity,
  userState,
  userZip,
  paymentID,
  userUID,
  userRole,
  paymentType,
  userID,
  setUserFromDB
}) {
  const [newUser, setNewUser] = useState({
    userFirst: userFirst || '',
    userLast: userLast || '',
    userAddress1: userAddress1 || '',
    userAddress2: userAddress2 || '',
    userCity: userCity || '',
    userState: userState || '',
    userZip: userZip || 0,
    paymentID: paymentID || '132fce4c-8d39-ec11-9141-6c6a77444a6b',
    userUID: userUID || '12345',
    userRole: userRole || 'CUSTOMER',
    paymentType: paymentType || '',
    userID: userID || ''
  });

  const history = useHistory();

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
    if (newUser.userUID) {
      updateUser(newUser).then((userArray) => setUserFromDB(userArray));
      history.push('/profile');
    } else {
      addUserToDB(newUser);
    }
  };

  return (
    <div>
      <form className='mt-3' id='add-expense-form' autoComplete='off' onSubmit={handleSubmit}>
        <h4>Create your Dad-A-Store account</h4>
        <label>First Name:</label>
        <input
        className='ml-2'
        name='userFirst'
        type='text'
        placeholder='First'
        value={newUser.userFirst}
        onChange={handleInputChange}
        required />
        <br/>
        <label>Last Name:</label>
        <input
        className='ml-2'
        name='userLast'
        type='text'
        placeholder='Last'
        value={newUser.userLast}
        onChange={handleInputChange}
        required />
        <br/>
        <label>Address1:</label>
        <input
        className='ml-2'
        name='userAddress1'
        type='text'
        placeholder='Address'
        value={newUser.userAddress1}
        onChange={handleInputChange}
        required
        />
        <br/>
        <label>Address2:</label>
        <input
        className='ml-2'
        name='userAddress2'
        type='text'
        placeholder='Apt #'
        value={newUser.userAddress2}
        onChange={handleInputChange}
        />
        <br/>
        <label>City:</label>
        <input
        className='ml-2'
        name='userCity'
        type='text'
        placeholder='City'
        value={newUser.userCity}
        onChange={handleInputChange}
        required />
        <br/>
        <label>State:</label>
        <input
        className='ml-2'
        name='userState'
        type='text'
        placeholder='State'
        value={newUser.userState}
        onChange={handleInputChange}
        required />
        <br/>
        <label>Zip Code:</label>
        <input
        className='ml-2'
        name='userZip'
        type='number'
        placeholder='37122'
        value={newUser.userZip}
        onChange={handleNumberInput}
        required />
        <br/>
       <br/>
        <label>Payment Type:</label>
        <input
        className='ml-2'
        name='paymentType'
        type='text'
        placeholder='Visa, MasterCard...'
        value={newUser.paymentType}
        onChange={handleInputChange}
        required />
        <br/>
        <Button color='success' type='submit'>Submit</Button>
      </form>
    </div>
  );
}

UserForm.propTypes = {
  userFirst: PropTypes.any,
  userLast: PropTypes.any,
  userAddress1: PropTypes.any,
  userAddress2: PropTypes.any,
  userCity: PropTypes.any,
  userState: PropTypes.any,
  userZip: PropTypes.any,
  paymentID: PropTypes.any,
  userUID: PropTypes.any,
  userRole: PropTypes.any,
  paymentType: PropTypes.any,
  userID: PropTypes.any,
  setUserFromDB: PropTypes.any
};

export default UserForm;
