import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getOpenCart from '../helpers/data/cartData';

function Cart({ userFromDB }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getOpenCart(userFromDB.userID).then((cartArray) => setCart(cartArray));
  }, []);

  console.warn(cart);

  return (
    <div>
      <h2> This is your cart</h2>
    </div>
  );
}

Cart.propTypes = {
  userFromDB: PropTypes.any
};

export default Cart;
