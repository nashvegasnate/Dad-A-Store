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
    departmentID: departmentID || ''
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
    } else {
      const newCategory = { paymentType: categoryUpdate.categoryName };
      addCategory(newCategory).then((response) => {
        setCategories(response);
      });

      // Clears Input Fields
      setCategoryUpdate({
        categoryName: '',
        categoryDescription: '',
        departmentID: ''
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
          <Label for="category">Category Name: </Label>
          <Input
            name='categoryName'
            id='categoryName'
            defaultValue={categoryName}
            type='text'
            placeholder='Enter Category'
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">Category Description: </Label>
          <Input
            name='categoryDescription'
            id='categoryDescription'
            defaultValue={categoryDescription}
            type='text'
            placeholder='Enter Description'
            onChange={handleInputChange}
          />
        </FormGroup>
        {/* <FormGroup>
          <Label for="category">Department ID: </Label>
          <Input
            name='departmentID'
            id='departmentID'
            defaultValue={departmentID}
            type='text'
            placeholder='Enter Department ID'
            onChange={handleInputChange}
          />
        </FormGroup> */}
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
  departmentID: PropTypes.string,
  setCategories: PropTypes.func
};

export default CategoryForm;
