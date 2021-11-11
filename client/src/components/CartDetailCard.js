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
  const [item, setItem] = useState(null);

  useEffect(() => {
    getItemByItemID(itemID).then((itemObject) => setItem(itemObject));
  }, []);
  return (
    <div>
      <Card className='expense-cards'>
        <CardBody>
           { item && <CardTitle tag="h3">{item[0].itemName}</CardTitle> }
           { item && <CardText>Description: {item[0].itemDescription}</CardText> }
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
