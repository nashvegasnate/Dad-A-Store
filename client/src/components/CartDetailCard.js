import React, { useState, useEffect } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { getItemByItemID } from '../helpers/data/itemsData';
import CartDetailForm from './CartDetailForm';
import { getOpenCart, removeItemCart } from '../helpers/data/cartData';

function CartDetailCard({
  userID,
  itemID,
  itemQuantity,
  itemPrice,
  setCartDetails,
  setCart
}) {
  const [item, setItem] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getItemByItemID(itemID).then((itemObject) => setItem(itemObject));
  }, []);

  const handleUpdate = () => {
    getOpenCart(userID).then((cartArray) => setCart(cartArray));
  };

  const handleClick = (type) => {
    switch (type) {
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      case 'delete':
        removeItemCart(userID, itemID).then((cartDetArr) => setCartDetails(cartDetArr)).then(() => handleUpdate());
        break;
      default: console.warn('nothing selected');
    }
  };

  return (
    <div>
      <Card className='expense-cards'>
        <CardBody>
           { item && <CardTitle tag="h3">{item[0].itemName}</CardTitle> }
           { item && <CardText>Description: {item[0].itemDescription}</CardText> }
          <CardText>Item Price: ${itemPrice}</CardText>
          <CardText>Quantity: {itemQuantity}</CardText>
          <Button className='mt-1' color='info' onClick={() => handleClick('edit')}> {editing ? 'Close' : 'Edit'}
          </Button>
          {
            editing && <CartDetailForm
            userID={userID}
            itemID={itemID}
            quantity={itemQuantity}
            setCartDetails={setCartDetails}
            setCart={setCart}
            />
          }
          <Button className='mt-1' color='danger' onClick={() => handleClick('delete')}>Remove</Button>
          <br />
        </CardBody>
      </Card>
    </div>
  );
}

CartDetailCard.propTypes = {
  userID: PropTypes.any.isRequired,
  itemID: PropTypes.string.isRequired,
  itemQuantity: PropTypes.number.isRequired,
  itemPrice: PropTypes.number.isRequired,
  setCartDetails: PropTypes.func.isRequired,
  setCart: PropTypes.func.isRequired
};

export default CartDetailCard;
