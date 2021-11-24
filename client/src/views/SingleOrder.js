import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderDetailCard from '../components/OrderDetailCard';
import { getSingleOrder, getSingleOrderDetails } from '../helpers/data/ordersData';

function SingleOrder() {
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
      <p>Order info for order #: {thisOrder.orderID}</p>
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
    </div>
  );
}

export default SingleOrder;
