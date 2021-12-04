import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button, Form, Input, Label
} from 'reactstrap';
import { getItemByName } from '../helpers/data/itemsData';
import ItemCard from '../components/ItemCard';

export default function ShoppingForm({
    user, setItems, userFromDB }) {
    const [searchItem, setSearchItem] = useState('');
    const [resultSearch, setResultSearch] = useState([]);

    const handleInputChange = (e) => {
        setSearchItem((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        getItemByName(searchItem.SearchInput).then((Response) => {
            setResultSearch(Response);
        });
    };

    console.warn(resultSearch);

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
                    resultSearch.length > 0
                        ? <ItemCard
                            key={resultSearch[0].itemID}
                            itemID={resultSearch[0].itemID}
                            itemName={resultSearch[0].itemName}
                            itemDescription={resultSearch[0].itemDescription}
                            itemPrice={resultSearch[0].itemPrice}
                            categoryID={resultSearch[0].categoryID}
                            sellerID={resultSearch[0].sellerID}
                            categoryName={resultSearch[0].categoryName}
                            sellerFirstName={resultSearch[0].sellerFirstName}
                            sellerLastName={resultSearch[0].sellerLastName}
                            user={user}
                            setItems={setItems}
                            userFromDB={userFromDB}
                        />
                        : ''
                }
            </div>
        </div>
    );
}

ShoppingForm.propTypes = {
    user: PropTypes.any.isRequired,
    item: PropTypes.array,
    setItems: PropTypes.any,
    userFromDB: PropTypes.any.isRequired
};
