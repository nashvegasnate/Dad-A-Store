import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getOpenCart from '../helpers/data/cartData';
import getCartDetails from '../helpers/data/cartDetailsData';

function Cart({ userFromDB }) {
  const [cart, setCart] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
    getOpenCart(userFromDB.userID).then((cartArray) => setCart(cartArray));
    getCartDetails(cart.cartID).then((cartDetailsArray) => setCartDetails(cartDetailsArray));
  }, []);

  console.warn(cart);
  console.warn(cartDetails);

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
