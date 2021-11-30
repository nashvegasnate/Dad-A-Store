import React, { useState, useEffect } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { getCompletedOrders, getOpenOrders } from '../helpers/data/ordersData';
import OpenOrderCard from '../components/OpenOrderCard';
import CompletedOrderCard from '../components/CompletedOrderCard';

function MyOrders({ userFromDB }) {
  const [openOrders, setOpenOrders] = useState(null);
  const [completedOrders, setCompletedOrders] = useState(null);
  const [viewingOpen, setViewingOpen] = useState(false);
  const [viewingCompleted, setViewingCompleted] = useState(false);

  useEffect(() => {
    getOpenOrders(userFromDB.userID).then((openOrderArray) => setOpenOrders(openOrderArray));
    getCompletedOrders(userFromDB.userID).then((completedOrdersArray) => setCompletedOrders(completedOrdersArray));
  }, []);

  const handleClick = (type) => {
    switch (type) {
      case 'open':
        setViewingCompleted(false);
        setViewingOpen(true);
        break;
      case 'completed':
        setViewingOpen(false);
        setViewingCompleted(true);
        break;
      default: console.warn('nothing selected');
    }
  };

  return (
    <div>
      <Card className='income-cards'>
        <CardBody>
          <CardTitle tag="h3">This is your orders page</CardTitle>
          <CardText>{userFromDB.userFirst} {userFromDB.userLast}</CardText>
          <br />
          {
            openOrders && <Button className='mt-1' color='info' onClick={() => handleClick('open')}>Open Orders</Button>
          }
          {
            completedOrders && <Button className='ml-1 mt-1' color='info' onClick={() => handleClick('completed')}>Completed Orders</Button>
          }
          {
            viewingOpen && <h2>Open Orders View</h2>
          }
          {
            viewingOpen && openOrders.map((orderInfo) => (
              <OpenOrderCard
              key={orderInfo.orderID}
              userFromDB={userFromDB}
              orderID={orderInfo.orderID}
              paymentID={orderInfo.paymentID}
              orderAmount={orderInfo.orderAmount}
              orderDate={orderInfo.orderDate}
              />
            ))
          }
          {
            viewingCompleted && <h2>Completed Orders View</h2>
          }
          {
            viewingCompleted && completedOrders.map((orderInfo) => (
              <CompletedOrderCard
              key={orderInfo.orderID}
              userFromDB={userFromDB}
              orderID={orderInfo.orderID}
              paymentID={orderInfo.paymentID}
              orderAmount={orderInfo.orderAmount}
              orderDate={orderInfo.orderDate}
              shipDate={orderInfo.shipDate}
              />
            ))
          }
        </CardBody>
      </Card>
    </div>
  );
}

MyOrders.propTypes = {
  userFromDB: PropTypes.any.isRequired
};

export default MyOrders;
