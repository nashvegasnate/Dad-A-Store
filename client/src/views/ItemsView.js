import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import ItemsForm from '../components/ItemsForm';
import ShoppingForm from '../forms/ShoppingForm';

const ItemButton = styled.div`
  border: 3px;
  border-bottom-style: double;
  border-color: #2F8F20;
  background-color: lightGrey;
  display: flex;
  justify-content: center;
  width: auto;
  font-family: Calibri;
  font-size: 30px;
  flex-wrap: wrap;
  padding: 15px;
  margin: 10px;
  `;

function Items({
  user, items, setItems, userFromDB
}) {
  const [showAddItem, setAddItem] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    setAddItem((prevState) => !prevState);
  };

  const handlePush = (itemID) => {
    history.push(`/itemsSingleView/${itemID}`);
  };

  return (
    <div className='col-lg-12'>
    <div>
      <h1>Shop and Find</h1>
      <ShoppingForm
        user={user}
        setItems={setItems}
        userFromDB={userFromDB}
      />
      </div>
      <br/>
    <div>
      {!showAddItem
        ? <Button className="addItmBtn" onClick={handleClick}>Add Item</Button>
        : <div>
              <Button className="closeForm" onClick={handleClick}>Close Form</Button>
              <ItemsForm
              setAddItem={setAddItem}
              setItems={setItems}
                userFromDB={userFromDB}
                user={user}
              />
          </div>
      }
    </div>
      <h3>ALL ITEMS</h3>
        {items.map((item, itemID) => (
          <h3 key={itemID}>
            <ItemButton className='mt-5' color='info' onClick={() => handlePush(item.itemID)}>{item.itemName}</ItemButton>
          </h3>
        ))}
    </div>
  );
}

Items.propTypes = {
  user: PropTypes.any,
  items: PropTypes.array.isRequired,
  setItems: PropTypes.func.isRequired,
  userFromDB: PropTypes.any.isRequired
};

export default Items;
