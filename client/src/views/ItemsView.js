import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const ItemButton = styled.div`
  border: solid 3px;
  border-color: #2F8F20;
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
  items
}) {
  const history = useHistory();

  const handlePush = (itemID) => {
    history.push(`/itemsSingleView/${itemID}`);
    console.warn(itemID);
  };

  return (
    <>
        {items.map((item, itemID) => (
          <h3 key={itemID}>
            <ItemButton className='mt-5' color='info' onClick={() => handlePush(item.itemID)}>{item.itemName}</ItemButton>
          </h3>
        ))}
    </>
  );
}

Items.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Items;
