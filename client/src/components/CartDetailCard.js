import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';

function CartDetailCard({
  itemID,
  itemQuantity,
  itemPrice
}) {
  return (
    <div>
      <Card className='expense-cards'>
        <CardBody>
          <CardTitle tag="h3">{itemID}</CardTitle>
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
