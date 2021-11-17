import React from 'react';
// import React, { useState, useEffect } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';
// import { getItemByItemID } from '../helpers/data/itemsData';
// import CartDetailForm from './CartDetailForm';

function ProfileCard({
  userFromDB
}) {
  // const [item, setItem] = useState(null);
  // const [editing, setEditing] = useState(false);

  // useEffect(() => {
  //   getItemByItemID(itemID).then((itemObject) => setItem(itemObject));
  // }, []);

  // const handleClick = (type) => {
  //   switch (type) {
  //     case 'edit':
  //       setEditing((prevState) => !prevState);
  //       break;
  //     default: console.warn('nothing selected');
  //   }
  // };

  return (
    <div>
      <Card className='expense-cards'>
        <CardBody>
           <CardTitle tag="h3">User name {userFromDB.userFirst} {userFromDB.userLast}</CardTitle>
          <CardText>Address: ${userFromDB.userAddress1}</CardText>
          <CardText>Address: ${userFromDB.userAddress2}</CardText>
          <CardText>City: ${userFromDB.userCity} Zip: ${userFromDB.userZip} State: ${userFromDB.userState}</CardText>
          <CardText>Role: ${userFromDB.userRole}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

ProfileCard.propTypes = {
  userFromDB: PropTypes.any.isRequired
  // userID: PropTypes.any.isRequired,
  // itemID: PropTypes.string.isRequired,
  // itemQuantity: PropTypes.number.isRequired,
  // itemPrice: PropTypes.number.isRequired,
  // setCartDetails: PropTypes.func.isRequired
};

export default ProfileCard;
