import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import {
  Button, Form, Input, Label
} from 'reactstrap';
import { getItemByName } from '../helpers/data/itemsData';
import ItemCard from '../components/ItemCard';

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
        <div className='search-form'>
                <Form
                    id='SearchForm'
                    autoComplete='off'
                    onSubmit={handleSearch}
                >
                    <Label for="Search Items">Search Items</Label>
                    <Input
                        name='SearchInput'
                        id='SearchInput'
                        // value={item.itemName}
                        type='text'
                        placeholder='Search'
                        onChange={handleInputChange}
                    />
                    <Button type='submit'>Search</Button>
                </Form>
            <div className='item-container'>
                {
            searchItem.length > 0
              ? searchItem.map((item, itemID) => (
                    <ItemCard
                        key={itemID}
                        itemID={item[0].itemID}
                        itemName={item[0].itemName}
                        itemDescription={item[0].itemDescription}
                        itemPrice={item[0].itemPrice}
                        categoryID={item[0].categoryID}
                        sellerID={item[0].sellerID}
                        categoryName={item[0].categoryName}
                        sellerFirstName={item[0].sellerFirstName}
                        sellerLastName={item[0].sellerLastName}
                        // user={user}
                        // setItems={setItems}
                        // userFromDB={userFromDB}
                        />
              ))
              : ''
                }
            </div>
        </div>
  );
}
