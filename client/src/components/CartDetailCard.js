import React, { useState, useEffect } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { getItemByItemID } from '../helpers/data/itemsData';
import CartDetailForm from './CartDetailForm';

function CartDetailCard({
  userID,
  itemID,
  itemQuantity,
  itemPrice
}) {
  const [item, setItem] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getItemByItemID(itemID).then((itemObject) => setItem(itemObject));
  }, []);

  const handleClick = (type) => {
    switch (type) {
      case 'edit':
        setEditing((prevState) => !prevState);
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
            />
          }
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
};

export default CartDetailCard;