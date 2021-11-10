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
  categoryName,
  sellerFirstName,
  sellerLastName,
  sellerID,
  formTitle,
  // user,
  setItems
}) => {
  const [item, setItem] = useState({
    itemID: itemID || '',
    itemName: itemName || '',
    itemDescription: itemDescription || '',
    itemPrice: itemPrice || '',
    categoryID: categoryID || '',
    sellerID: sellerID || '',
    categoryName: categoryName || '',
    sellerFirstName: sellerFirstName || '',
    sellerLastName: sellerLastName || '',
    // userID: user ? user.id : '',
  });

  const handleInputChange = (e) => {
    setItem((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.itemID) {
      updateItem(item).then((itemsArray) => setItems(itemsArray));
    } else {
      additem(item).then((itemsArray) => setItems(itemsArray));

      // setItem({
      //   itemName: '',
      //   itemDescription: '',
      //   itemPrice: '',
      //   categoryName: '',
      //   sellerID: ''
      // });
    }
  };

  return (
    <>
      <div className='item-form'>
        <Form id='add-item-form' autoComplete='off' onSubmit={handleSubmit}>
          <h2>{formTitle}</h2>
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
            <Label>Category Name</Label>
            <Input
              name='categoryName'
              id='categoryName'
              type='text'
              placeholder='Please enter the item&#39;s category Name'
              value={item.categoryName}
              onChange={handleInputChange}
             />
          </FormGroup>
          <FormGroup>
            <Label>SellerID</Label>
            <Input
              name='sellerID'
              id='sellerID'
              type='text'
              placeholder='Please enter the item&#39;s SellerID'
              value={item.sellerID}
              onChange={handleInputChange}
             />
          </FormGroup>
          {/* <FormGroup>
            <Label>User ID</Label>
            <Input
              name='userID'
              id='userID'
              type='text'
              placeholder='Please enter the item&#39;s user ID'
              value={item.userID}
              onChange={handleInputChange}
             />
          </FormGroup> */}
          {/* <FormGroup>
            <Label>Item SellerID{sellerID}</Label>
            <Input
              name='sellerID'
              id='sellerID'
              type='text'
              placeholder='Please enter the item&#39;s Description'
              value={item.sellerID}
              onChange={handleInputChange}
             />
          </FormGroup> */}
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
  categoryName: PropTypes.any.isRequired,
  sellerFirstName: PropTypes.any.isRequired,
  sellerLastName: PropTypes.any.isRequired,
  sellerID: PropTypes.any.isRequired,
  formTitle: PropTypes.any.isRequired,
  // user: PropTypes.any.isRequired,
  setItems: PropTypes.func.isRequired
};

export default ItemsForm;
