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
  // departmentID,
  departmentName,
  setCategories
}) => {
  const [categoryUpdate, setCategoryUpdate] = useState({
    categoryID: categoryID || null,
    categoryName: categoryName || '',
    categoryDescription: categoryDescription || '',
    // departmentID: departmentID || '',
    departmentName: departmentName || ''
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
      const newCategory = ({
        categoryName: categoryUpdate.categoryName,
        categoryDescription: categoryUpdate.categoryDescription,
        // departmentID: categoryUpdate.departmentID,
        departmentName: categoryUpdate.departmentName
      });
      // console.warn(newCategory);
      addCategory(newCategory).then((response) => {
        setCategories(response);
      });

      // Clears Input Fields
      setCategoryUpdate({
        categoryName: '',
        categoryDescription: '',
        // departmentID: '',
        departmentName: ''
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
        <FormGroup>
          <Label for="category">Department Name: </Label>
          <Input
            name='departmentName'
            id='departmentName'
            defaultValue={departmentName}
            type='text'
            placeholder='Enter Department Name'
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
  // departmentID: PropTypes.string,
  departmentName: PropTypes.string,
  setCategories: PropTypes.func
};

export default CategoryForm;
