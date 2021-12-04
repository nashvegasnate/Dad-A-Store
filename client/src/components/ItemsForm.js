import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FormGroup, Label, Input, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { additem, updateItem } from '../helpers/data/itemsData';

const NewItemForm = styled.div`
  border: 3px;
  border-bottom-style: double;
  border-color: #2F8F20;
  background-color: lightGrey;
  display: inline-block;
  align-items: center;
  text-align: center;
  margin: 10px;
  justify-content: space-between;
  padding: 20px;
  width: 450px;
  justify-items: center;
  `;

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
  setItems,
  userFromDB
}) => {
  const [item, setItem] = useState({
    itemID: itemID || '',
    itemName: itemName || '',
    itemDescription: itemDescription || '',
    itemPrice: itemPrice || '',
    categoryID: categoryID || '',
    sellerID: userFromDB.userID || sellerID,
    categoryName: categoryName || '',
    sellerFirstName: sellerFirstName || '',
    sellerLastName: sellerLastName || '',
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    setItem((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleNumberInput = (e) => {
    setItem((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.valueAsNumber
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.itemID) {
      updateItem(item).then((itemsArray) => setItems(itemsArray));
      history.push('/items');
    } else {
      additem(item).then((itemsArray) => setItems(itemsArray));
      history.push('/items');
    }
  };

  return (
    <>
      <div className='item-form'>
        <NewItemForm autoComplete='off'>
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
              required
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
              required
             />
          </FormGroup>
          <FormGroup>
            <Label>Item Price</Label>
            <Input
              name='itemPrice'
              id='itemPrice'
              type='number'
              placeholder='Please enter the item&#39;s price'
              value={item.itemPrice}
              onChange={handleNumberInput}
              required
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
              required
             />
          </FormGroup>
          <Button type='submit' color='success' onClick={handleSubmit}>Submit</Button>
        </NewItemForm>
      </div>
    </>
  );
};

ItemsForm.propTypes = {
  itemID: PropTypes.any,
  itemName: PropTypes.any,
  itemDescription: PropTypes.any,
  itemPrice: PropTypes.any,
  categoryID: PropTypes.any,
  categoryName: PropTypes.any,
  sellerFirstName: PropTypes.any,
  sellerLastName: PropTypes.any,
  sellerID: PropTypes.any,
  formTitle: PropTypes.any,
  setItems: PropTypes.func.isRequired,
  userFromDB: PropTypes.any.isRequired
};

export default ItemsForm;
