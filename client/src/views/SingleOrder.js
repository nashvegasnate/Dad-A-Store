import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import OrderDetailCard from '../components/OrderDetailCard';
import { getSingleOrder, getSingleOrderDetails } from '../helpers/data/ordersData';
import OpenOrderSingleCard from '../components/OpenOrderSingleCard';

function SingleOrder({ userFromDB }) {
  const [thisOrder, setThisOrder] = useState(null);
  const [thisOrderDetails, setThisOrderDetails] = useState(null);

  const params = useParams();

  useEffect(() => {
    getSingleOrder(params.orderID).then((orderArr) => setThisOrder(orderArr));
    getSingleOrderDetails(params.orderID).then((orderDets) => setThisOrderDetails(orderDets));
  }, []);

  return (
    <div>
      <h2>Single order view</h2>
    {
      thisOrderDetails && thisOrderDetails.map((orderInfo) => (
        <OrderDetailCard
        key={orderInfo.itemID}
        itemID={orderInfo.itemID}
        itemQuantity={orderInfo.itemQuantity}
        itemPrice={orderInfo.itemPrice}
        />
      ))
    }
    { thisOrder && <OpenOrderSingleCard
    userFromDB={userFromDB}
    orderID={thisOrder.orderID}
    paymentID={thisOrder.paymentID}
    orderAmount={thisOrder.orderAmount}
    orderDate={thisOrder.orderDate}
    />
    }
    </div>
  );
}

SingleOrder.propTypes = {
  userFromDB: PropTypes.any.isRequired
};

export default SingleOrder;
