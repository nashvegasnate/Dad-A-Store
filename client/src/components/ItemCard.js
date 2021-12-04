import React, { useState } from 'react';
import {
  CardText, CardBody, CardTitle, Button
} from 'reactstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ItemsForm from './ItemsForm';
import { deleteItem } from '../helpers/data/itemsData';
import { addItemCart } from '../helpers/data/cartData';

const SingleItemCard = styled.div`
  display: flex;
  flex-flow: row-wrap;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-self: auto;
  flex-basis: 20em;
  margin: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: lightGrey;
  box-shadow: 10px;
  border: 5px double #2F8F20;
`;

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
  const [thisItem] = useState({
    itemID,
    quantity: 1
  });

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteItem(itemID).then((itemsArray) => setItems(itemsArray));
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      default:
        console.warn('default');
        break;
    }
  };

  const handleAddItemToCart = () => {
    addItemCart(userFromDB.userID, thisItem);
  };

  return (
    <div>
      <SingleItemCard className='item-cards'>
        <CardBody>
          <CardTitle tag="h3">Item: {itemName}</CardTitle>
          <CardText>Item Description: {itemDescription}</CardText>
          <CardText>Item Price: ${itemPrice}</CardText>
          <CardText>Item Category: {categoryName}</CardText>
          <CardText>Seller : {sellerFirstName} {sellerLastName}</CardText>
          <CardText>Seller ID: {sellerID}</CardText>
          <CardText>User: {user.userName}</CardText>
          <Button
            className="btn-md mr-2 ml-2 mt-2"
            color="info"
            onClick={() => handleClick('edit')}
            size="sm">
            {editing ? 'Close Form' : 'Edit Item' }
          </Button>
          <Button
            className="btn-md mr-2 ml-2 mt-2"
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
          <Button
            className="btn-md mr-2 ml-2 mt-2"
            color="success"
            onClick={() => handleAddItemToCart()}
            size="sm">Add To Cart
          </Button>
        </CardBody>
      </SingleItemCard>
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
