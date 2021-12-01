import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { getItemByItemID } from '../helpers/data/itemsData';

function SingleItemView({
  user, setItems, userFromDB
}) {
  const { itemParam } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    getItemByItemID(itemParam).then(setItem);
  }, []);

  return (
    <div>
      <h3>Single Item View</h3>
      {
        item.length > 0
        && <ItemCard
        itemID={item[0].itemID}
        itemName={item[0].itemName}
        itemDescription={item[0].itemDescription}
        itemPrice={item[0].itemPrice}
        categoryID={item[0].categoryID}
        sellerID={item[0].sellerID}
        categoryName={item[0].categoryName}
        sellerFirstName={item[0].sellerFirstName}
        sellerLastName={item[0].sellerLastName}
        user={user}
        setItems={setItems}
        userFromDB={userFromDB}
        />
      }
    </div>
  );
}

SingleItemView.propTypes = {
  user: PropTypes.any.isRequired,
  item: PropTypes.array,
  setItems: PropTypes.any,
  userFromDB: PropTypes.any.isRequired
};

export default SingleItemView;
