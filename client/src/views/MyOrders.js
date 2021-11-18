import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';

function MyOrders({ userFromDB }) {
  return (
    <div>
      <Card className='income-cards'>
        <CardBody>
          <CardTitle tag="h3">This is your orders page</CardTitle>
          <CardText>{userFromDB.userFirst} {userFromDB.userLast}</CardText>
          <br />
          <Button className='mt-1' color='info'>Open Orders</Button>
          <Button className='ml-1 mt-1' color='info'>Completed Orders</Button>
        </CardBody>
      </Card>
    </div>
  );
}

MyOrders.propTypes = {
  userFromDB: PropTypes.any.isRequired
};

export default MyOrders;
