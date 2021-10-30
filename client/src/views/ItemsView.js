import React from 'react';
import PropTypes from 'prop-types';
import ItemCard from '../components/OrderCard';
// import Routes from '../helpers/Routes';

function Items({ user, items }) {
  return (
    <div>
      <h3> Items Info for {user.userName} </h3>
      {
        items.map((itemInfo) => (
          <ItemCard
          Key={itemInfo.itemID}
          itemID={itemInfo.itemID}
          itemName={itemInfo.itemName}
          itemDescription={itemInfo.itemDescription}
          itemPrice={itemInfo.itemPrice}
          categoryID={itemInfo.categoryID}
          sellerID={itemInfo.SellerID}
          user={user}
          />
        ))
      }
    </div>
  );
}

Items.propTypes = {
  user: PropTypes.any,
  items: PropTypes.array.isRequired
};

export default Items;
