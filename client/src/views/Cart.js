import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getOpenCart from '../helpers/data/cartData';
import getCartDetails from '../helpers/data/cartDetailsData';
import CartDetailCard from '../components/CartDetailCard';

function Cart({ userFromDB }) {
  const [cart, setCart] = useState(null);
  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
    getOpenCart(userFromDB.userID).then((cartArray) => setCart(cartArray));
    if (cart) {
      getCartDetails(cart.cartID).then((cartDetArr) => setCartDetails(cartDetArr));
    }
  }, []);

  useEffect(() => {
    if (cart) {
      getCartDetails(cart.cartID).then((cartDetArr) => setCartDetails(cartDetArr));
    }
  }, [cart]);

  return (
    <div>
      <h2> This is your cart</h2>
      {
        cartDetails.map((cartInfo) => (
          <CartDetailCard
          key={cartInfo.cartID + cartInfo.itemID}
          userID={userFromDB.userID}
          itemID={cartInfo.itemID}
          itemQuantity={cartInfo.itemQuantity}
          itemPrice={cartInfo.itemPrice}
          />
        ))
      }
    </div>
  );
}

Cart.propTypes = {
  userFromDB: PropTypes.any
};

export default Cart;
