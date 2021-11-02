import React, { useState } from 'react';
import {
  FormGroup, Form, Label, Input, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { additem, updateItem } from '../helpers/data/itemsData';

const ItemsForm = ({
  itemID,
  itemName,
  itemDescription,
  itemPrice,
  categoryID,
  sellerID,
  user,
  setItems
}) => {
  const [item, setItem] = useState({
    itemID: itemID || null,
    itemName: itemName || '',
    itemDescription: itemDescription || '',
    itemPrice: itemPrice || '',
    categoryID: categoryID || '',
    sellerID: user ? user.uid : ''
  });

  const handleInputChange = (e) => {
    setItem((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      sellerID: user ? user.uid : '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.itemID) {
      updateItem(item, user.uid).then((itemsArray) => setItems(itemsArray));
    } else {
      additem(item, user.uid).then((itemsArray) => setItems(itemsArray));
    }
  };

  setItem({
    itemID: null,
    itemName: '',
    itemDescription: '',
    itemPrice: '',
    categoryID: '',
    sellerID: ''
  });

  return (
    <>
      <div className='item-form'>
        <Form id='add-item-form' autoComplete='off' onSubmit={handleSubmit}>
          <h2>FORM TITLE HERE</h2>
          <FormGroup>
            <Label>Item Name</Label>
            <Input
              name='itemName'
              id='itemName'
              type='text'
              placeholder='Please enter the item&#39;s name'
              value={item.itemName}
              onChange={handleInputChange}
             />
          </FormGroup>
          <FormGroup>
            <Label>Item Description</Label>
            <Input
              name='itemDescription'
              id='itemDescription'
              type='text'
              placeholder='Please enter the item&#39;s Description'
              value={item.itemDescription}
              onChange={handleInputChange}
             />
          </FormGroup>
          <FormGroup>
            <Label>Item Price</Label>
            <Input
              name='itemPrice'
              id='itemPrice'
              type='text'
              placeholder='Please enter the item&#39;s price'
              value={item.itemPrice}
              onChange={handleInputChange}
             />
          </FormGroup>
          <FormGroup>
            <Label>Item Category</Label>
            <Input
              name='categoryID'
              id='categoryID'
              type='text'
              placeholder='Please enter the item&#39;s categoryID'
              value={item.categoryID}
              onChange={handleInputChange}
             />
          </FormGroup>
          <FormGroup>
            <Label>Item SellerID{sellerID}</Label>
            <Input
              name='sellerID'
              id='sellerID'
              type='text'
              placeholder='Please enter the item&#39;s Description'
              value={item.sellerID}
              onChange={handleInputChange}
             />
          </FormGroup>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    </>
  );
};

ItemsForm.propTypes = {
  itemID: PropTypes.any.isRequired,
  itemName: PropTypes.any.isRequired,
  itemDescription: PropTypes.any.isRequired,
  itemPrice: PropTypes.any.isRequired,
  categoryID: PropTypes.any.isRequired,
  sellerID: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired,
  setItems: PropTypes.any.isRequired
};

export default ItemsForm;
