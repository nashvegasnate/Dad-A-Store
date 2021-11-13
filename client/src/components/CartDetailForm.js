import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { updateCartSingleItem } from '../helpers/data/cartData';

function CartDetailForm({
  userID,
  itemID,
  quantity,
  setCartDetails
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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCartSingleItem(userID, cartDetail).then((cartDetArr) => setCartDetails(cartDetArr));
  };

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
  setCartDetails: PropTypes.func.isRequired
};

export default CartDetailForm;
