import React, { useState } from 'react';
import {
  Card, CardText, CardBody, CardTitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import ItemsForm from './ItemsForm';
import { deleteItem } from '../helpers/data/itemsData';

function ItemCard({
  itemID,
  itemName,
  itemDescription,
  itemPrice,
  categoryID,
  sellerID,
  categoryName,
  sellerFirstName,
  sellerLastName,
  user,
  setItems,
  userFromDB
}) {
  const [editing, setEditing] = useState(false);

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteItem(itemID).then((itemsArray) => setItems(itemsArray));
        console.warn('Delete Item');
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      default:
        console.warn('default');
        break;
    }
  };

  return (
    <div>
      <Card className='item-cards'>
        <CardBody>
          <CardTitle tag="h3">Item: {itemName}</CardTitle>
          <CardText>Item Description: {itemDescription}</CardText>
          <CardText>Item Price: {itemPrice}</CardText>
          <CardText>Item Category: {categoryName}</CardText>
          <CardText>Seller : {sellerFirstName} {sellerLastName}</CardText>
          <CardText>Seller ID: {sellerID}</CardText>
          <CardText>User: {user.userName}</CardText>
          <Button
            color="success"
            onClick={() => handleClick('edit')}
            size="sm">
            {editing ? 'Close Form' : 'Edit Item' }
          </Button>
          <Button
            color="danger"
            onClick={() => handleClick('delete')}
            size="sm">Delete
          </Button>
            {editing && <ItemsForm
                          itemID={itemID}
                          itemName={itemName}
                          itemDescription={itemDescription}
                          itemPrice={itemPrice}
                          categoryID={categoryID}
                          categoryName={categoryName}
                          sellerFirstName={sellerFirstName}
                          sellerLastName={sellerLastName}
                          sellerID={sellerID}
                          formTitle='Edit Item'
                          setItems={setItems}
                          userFromDB={userFromDB} />}
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
  categoryName: PropTypes.any.isRequired,
  sellerFirstName: PropTypes.any.isRequired,
  sellerLastName: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired,
  setItems: PropTypes.any.isRequired,
  userFromDB: PropTypes.any.isRequired
};

export default ItemCard;
