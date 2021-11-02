import React from 'react';
import PropTypes from 'prop-types';
import ItemsForm from '../components/ItemsForm';
// import Routes from '../helpers/Routes';

function Items({ user, items, setItems }) {
  return (
    <div>
      <h3> Items Info for {user.userName} </h3>
      {
        items.map((itemInfo) => (
          <ItemsForm
          Key={itemInfo.itemID}
          itemID={itemInfo.itemID}
          itemName={itemInfo.itemName}
          itemDescription={itemInfo.itemDescription}
          itemPrice={itemInfo.itemPrice}
          categoryID={itemInfo.categoryID}
          sellerID={itemInfo.SellerID}
          user={user}
          setItems={setItems}
          />
        ))
      }
    </div>
  );
}

Items.propTypes = {
  user: PropTypes.any,
  items: PropTypes.array.isRequired,
  setItems: PropTypes.func.isRequired
};

export default Items;
