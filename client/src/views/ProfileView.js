import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getOpenCart } from '../helpers/data/cartData';
import getCartDetails from '../helpers/data/cartDetailsData';
import CartDetailCard from '../components/CartDetailCard';
import ProfileCard from '../components/ProfileCard';

function ProfileView({ userFromDB }) {
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
      <h2>Profile</h2>
      {
        <ProfileCard userFromDB={userFromDB}/>
      }
      {
        cartDetails.map((cartInfo) => (
          <CartDetailCard
          key={cartInfo.cartID + cartInfo.itemID}
          userID={userFromDB.userID}
          itemID={cartInfo.itemID}
          itemQuantity={cartInfo.itemQuantity}
          itemPrice={cartInfo.itemPrice}
          setCartDetails={setCartDetails}
          />
        ))
      }
    </div>
  );
}

ProfileView.propTypes = {
  userFromDB: PropTypes.any
};

export default ProfileView;
