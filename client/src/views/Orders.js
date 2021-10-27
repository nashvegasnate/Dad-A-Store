import React from 'react';
import PropTypes from 'prop-types';
import OrderCard from '../components/OrderCard';

function Orders({ user, orders }) {
  return (
    <div>
      <h2>This is Orders {user.uid}</h2>
      {
        orders.map((orderInfo) => (
          <OrderCard
          key={orderInfo.orderID}
          orderID={orderInfo.orderID}
          userID={orderInfo.userID}
          paymentID={orderInfo.paymentID}
          orderAmount={orderInfo.orderAmount}
          orderDate={orderInfo.orderDate}
          shipDate={orderInfo.shipDate}
          />
        ))
      }
    </div>
  );
}

Orders.propTypes = {
  user: PropTypes.any,
  orders: PropTypes.array.isRequired
};

export default Orders;
