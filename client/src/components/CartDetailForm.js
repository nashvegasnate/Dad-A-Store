import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { getOpenCart, updateCartSingleItem } from '../helpers/data/cartData';

function CartDetailForm({
  userID,
  itemID,
  quantity,
  setCartDetails,
  setCart
}) {
  const [cartDetail, setCartDetail] = useState({
    itemID: itemID || '',
    quantity: quantity || 1
  });

  const handleNumberInput = (e) => {
    setCartDetail((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.valueAsNumber
    }));
  };

  const handleUpdate = () => {
    getOpenCart(userID).then((cartArray) => setCart(cartArray));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCartSingleItem(userID, cartDetail).then((cartDetArr) => setCartDetails(cartDetArr)).then(() => handleUpdate());
  };

  useEffect(() => {
    getOpenCart(userID).then((cartArray) => setCart(cartArray));
  }, []);

  return (
    <div className='form-group'>
      <form className='mt-3' id='add-expense-form' autoComplete='off' onSubmit={handleSubmit}>
        <h2>Edit Cart Item</h2>
        <label>Update Quantity:</label>
        <input
        className='ml-2'
        name='quantity'
        type='number'
        placeholder='1'
        value={cartDetail.quantity}
        onChange={handleNumberInput} />
        <br/>
        <Button color='success' type='submit'>Submit</Button>
      </form>
    </div>
  );
}

CartDetailForm.propTypes = {
  userID: PropTypes.any.isRequired,
  itemID: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  setCartDetails: PropTypes.func.isRequired,
  setCart: PropTypes.func.isRequired
};

export default CartDetailForm;
