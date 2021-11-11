import React, { useState, useEffect } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import { getItemByItemID } from '../helpers/data/itemsData';

function CartDetailCard({
  itemID,
  itemQuantity,
  itemPrice
}) {
  const [item, setItem] = useState({});

  useEffect(() => {
    getItemByItemID(itemID).then((itemObject) => setItem(itemObject));
  }, []);
  return (
    <div>
      <Card className='expense-cards'>
        <CardBody>
          <CardTitle tag="h3">{item.itemName}</CardTitle>
          <CardText>Description: {item.itemDescription}</CardText>
          <CardText>Item Price: ${itemPrice}</CardText>
          <CardText>Quantity: {itemQuantity}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

CartDetailCard.propTypes = {
  itemID: PropTypes.string.isRequired,
  itemQuantity: PropTypes.number.isRequired,
  itemPrice: PropTypes.number.isRequired,
};

export default CartDetailCard;
