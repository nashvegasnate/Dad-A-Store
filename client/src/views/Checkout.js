import React from 'react';
import PropTypes from 'prop-types';

function Checkout({ userFromDB }) {
  return (
    <div>
      <h2>This is the checkout page</h2>
      <p>{userFromDB.userFirst}</p>
      <p>{userFromDB.userLast}</p>
    </div>
  );
}

Checkout.propTypes = {
  userFromDB: PropTypes.any.isRequired
};

export default Checkout;
