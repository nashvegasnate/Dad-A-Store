import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getOpenCart } from '../helpers/data/cartData';
import getCartDetails from '../helpers/data/cartDetailsData';
import CartDetailCard from '../components/CartDetailCard';
import CartCard from '../components/CartCard';

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  z-index: -1;
  `;

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
      <CartContainer>
      {
        cartDetails.map((cartInfo) => (
          <CartDetailCard
          key={cartInfo.cartID + cartInfo.itemID}
          userID={userFromDB.userID}
          itemID={cartInfo.itemID}
          itemQuantity={cartInfo.itemQuantity}
          itemPrice={cartInfo.itemPrice}
          setCartDetails={setCartDetails}
          setCart={setCart}
          />
        ))
      }
      { cart && <CartCard
      userFromDB={userFromDB}
      cart={cart}
      />
      }
      </CartContainer>
    </div>
  );
}

Cart.propTypes = {
  userFromDB: PropTypes.any
};

export default Cart;
