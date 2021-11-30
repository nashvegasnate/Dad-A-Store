import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, CardText, CardBody, CardTitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import UserForm from './UserForm';

function ProfileCard({
  user,
  userFromDB,
  setUserFromDB
}) {
  const [editing, setEditing] = useState(false);
  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      default:
        console.warn('default');
        break;
    }
  };

  const handleShowOrdersCart = (type) => {
    switch (type) {
      case 'Order':
        console.warn('Order');
        history.push('/myorders');
        break;
      case 'Cart':
        console.warn('Cart');
        history.push('/cart');
        break;
      default:
        console.warn('Default');
        break;
    }
  };

  return (
    <div>
      <Card className='expense-cards'>
        <CardBody>
           <CardTitle tag="h3">User name {userFromDB.userFirst} {userFromDB.userLast}</CardTitle>
          <CardText>Address: ${userFromDB.userAddress1}</CardText>
          <CardText>Address: ${userFromDB.userAddress2}</CardText>
          <CardText>City: ${userFromDB.userCity} Zip: ${userFromDB.userZip} State: ${userFromDB.userState}</CardText>
          <CardText>Role: ${userFromDB.userRole}</CardText>
          <Button
            color="success"
            onClick={() => handleClick('edit')}
            size="sm">
            {editing ? 'Close Form' : 'Edit User' }
          </Button>
          <Button
            color="info"
            onClick={() => handleShowOrdersCart('Order')}
            size="sm">
            {'See my Orders'}
          </Button>
          <Button
            color="info"
            onClick={() => handleShowOrdersCart('Cart')}
            size="sm">
            {'See my Cart'}
          </Button>
            {editing && <UserForm
                          user={user}
                          userFirst={userFromDB.userFirst}
                          userLast={userFromDB.userLast}
                          userAddress1={userFromDB.userAddress1}
                          userAddress2={userFromDB.userAddress2}
                          userCity={userFromDB.userCity}
                          userState={userFromDB.userState}
                          userZip={userFromDB.userZip}
                          paymentID={userFromDB.paymentID}
                          userUID={userFromDB.userUID}
                          userRole={userFromDB.userRole}
                          paymentType={userFromDB.paymentType}
                          userID={userFromDB.userID}
                          setUserFromDB={setUserFromDB} />}
        </CardBody>
      </Card>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.any,
  userFromDB: PropTypes.any.isRequired,
  setUserFromDB: PropTypes.any
  // userID: PropTypes.any.isRequired,
  // itemID: PropTypes.string.isRequired,
  // itemQuantity: PropTypes.number.isRequired,
  // itemPrice: PropTypes.number.isRequired,
  // setCartDetails: PropTypes.func.isRequired
};

export default ProfileCard;
