import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
// import ItemHeaderCard from '../components/ItemHeaderCard';
// import ItemCard from '../components/ItemCard';
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// function Items({
//   user, items, setItems, userFromDB
// }) {
//   return (
//     <div>
//       <h3> Items Info for {user.userName} </h3>
//       {
//         items.map((itemInfo) => (
//           <ItemCard
//           Key={itemInfo.itemID}
//           itemID={itemInfo.itemID}
//           itemName={itemInfo.itemName}
//           itemDescription={itemInfo.itemDescription}
//           itemPrice={itemInfo.itemPrice}
//           categoryID={itemInfo.categoryID}
//           sellerID={itemInfo.sellerID}
//           categoryName={itemInfo.categoryName}
//           sellerFirstName={itemInfo.sellerFirstName}
//           sellerLastName={itemInfo.sellerLastName}
//           user={user}
//           setItems={setItems}
//           userFromDB={userFromDB}
//           />
//         ))
//       }
//     </div>
//   );
// }

// Items.propTypes = {
//   user: PropTypes.any,
//   items: PropTypes.array.isRequired,
//   setItems: PropTypes.any.isRequired,
//   userFromDB: PropTypes.any.isRequired
// };

// export default Items;

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
