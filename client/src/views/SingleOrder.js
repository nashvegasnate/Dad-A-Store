import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleOrder } from '../helpers/data/ordersData';

function SingleOrder() {
  const [thisOrder, setThisOrder] = useState(null);

  const params = useParams();

  useEffect(() => {
    getSingleOrder(params.orderID).then((orderArr) => setThisOrder(orderArr));
  }, []);

  console.warn(thisOrder);

  return (
    <div>
      <h2>Single order view</h2>
      <p>{params.orderID}</p>
    </div>
  );
}

export default SingleOrder;
