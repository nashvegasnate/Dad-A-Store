import React from 'react';
import PropTypes from 'prop-types';
import OrderCard from '../components/OrderCard';

function Orders({ user, orders }) {
  console.warn(typeof orders);
  return (
    <div>
      <h3>Order Info {user.userName}</h3>
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
