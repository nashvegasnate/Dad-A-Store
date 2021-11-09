import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Input, Label
} from 'reactstrap';
import { addCategory, updateCategory } from '../helpers/data/categoriesData';

const CategoryForm = ({
  formTitle,
  categoryID,
  categoryName,
  categoryDescription,
  departmentID,
  setCategories
}) => {
  const [categoryUpdate, setCategoryUpdate] = useState({
    categoryID: categoryID || null,
    categoryName: categoryName || '',
    categoryDescription: categoryDescription || '',
    departmentID: departmentID || null
  });

  const handleInputChange = (e) => {
    setCategoryUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryUpdate.categoryID !== null) {
      // console.warn(categoryUpdate); .categoryID
      updateCategory(categoryUpdate).then(setCategories);
      // setCategoryUpdate(!categoryUpdate);
    } else {
      const newCategory = { paymentType: categoryUpdate.categoryName };
      addCategory(newCategory).then((response) => {
        setCategories(response);
      });

      // Clears Input Fields
      setCategoryUpdate({
        // paymentID: null,
        categoryName: '',
        categoryDescription: '',
        departmentID: null
      });
    }
  };

  return (
    <div className='category-form'>
      <Form
        id='addCategoryForm'
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <h2>{formTitle}</h2>

        <FormGroup>
          <Label for="category">Category: </Label>
          <Input
            name='paymentType'
            id='paymentType'
            defaultValue={categoryName}
            type='text'
            placeholder='Enter Category'
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button type='submit'>Submit</Button>
        </Form>
    </div>
  );
};

CategoryForm.propTypes = {
  formTitle: PropTypes.string,
  categoryID: PropTypes.any,
  categoryName: PropTypes.string,
  categoryDescription: PropTypes.string,
  departmentID: PropTypes.any,
  setCategories: PropTypes.func
};

export default CategoryForm;
