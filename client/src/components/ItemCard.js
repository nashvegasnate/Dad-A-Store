import React from 'react';
import {
  Card, CardText, CardBody, CardTittle
} from 'reactstrap';
import PropTypes from 'prop-types';

function ItemCard({
  itemID,
  itemName,
  itemDescription,
  itemPrice,
  categoryID,
  sellerID,
  user
}) {
  return (
    <div>
      <Card className='item-cards'>
        <CardBody>
          <CardTittle tag="h3">Item: {itemName}</CardTittle>
          <CardText>Item Description: {itemDescription}</CardText>
          <CardText>Item Price: {itemPrice}</CardText>
          <CardText>Item Category: {categoryID}</CardText>
          <CardText>Item ID: {itemID}</CardText>
          <CardText>Seller ID: {sellerID}</CardText>
          <CardText>User: {user.uid}</CardText>

        </CardBody>
      </Card>
    </div>
  );
}

ItemCard.propTypes = {
  itemID: PropTypes.any.isRequired,
  itemName: PropTypes.any.isRequired,
  itemDescription: PropTypes.any.isRequired,
  itemPrice: PropTypes.any.isRequired,
  categoryID: PropTypes.any.isRequired,
  sellerID: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired
};
