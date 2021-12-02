import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

function Items({
  items
}) {
  const history = useHistory();

  const handlePush = (itemID) => {
    history.push(`/itemsSingleView/${itemID}`);
  };

  return (
    <>
        {items.map((item, itemID) => (
          <h3 key={itemID}>
            <Button className='mt-1' color='info' onClick={() => handlePush(item.itemID)}>{item.itemName}</Button>
          </h3>
        ))}
    </>
  );
}

Items.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Items;
