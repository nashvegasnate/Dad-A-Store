import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Input, Label
} from 'reactstrap';
import getItemByName from '../helpers/data/shoppingData';
// import ItemCard from '../components/ItemCard';

const SearchBarElement = styled.div`
  input[type=text] {
    margin-top: 25px;
    padding: 12px;
    font-size: 15px;
    border: 2px solid #e7e7e7;
    background-color: #f3f3f3;
    align-content: center;
    width: 50%;
    border-radius: 25px;
    border-color: #7f7f7f;
  }
  `;

export default function SearchBar() {
  const [searchItem, setSearchItem] = useState([]);

  const handleInputChange = (e) => {
    setSearchItem((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchItem([]);
    getItemByName(e.target.value).then((Response) => {
      setSearchItem(Response);
    });
  };

  return (
    <div className='category-form'>
    <Form
      id='addCategoryForm'
      autoComplete='off'
      onSubmit={handleSearch}
    >

    </Form>
    </div>
  );
}
