import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const ItemContainer = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: center;
align-items: center;
padding: 10px;
margin: 10px;
z-index: -1;
`;

const ItemButton = styled.div`
  border: 3px double;
  border-color: #2F8F20;
  background-color: lightgray;
  justify-content: center;
  width: 20em;
  font-family: Calibri;
  font-size: 30px;
  flex-wrap: wrap;
  padding: 15px;
  margin: 10px;
  border-radius: 20px;
  `;

function Items({
  items
}) {
  const history = useHistory();

  const handlePush = (itemID) => {
    history.push(`/itemsSingleView/${itemID}`);
  };

  return (
    <div className='col-lg-12'>
      <h3>ALL ITEMS</h3>
      <ItemContainer className="item-container">
        {items.map((item, itemID) => (
          <h3 key={itemID}>
            <ItemButton className='mt-5' onClick={() => handlePush(item.itemID)}>{item.itemName}</ItemButton>
          </h3>
        ))}
      </ItemContainer>
    </div>
  );
}

Items.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Items;
