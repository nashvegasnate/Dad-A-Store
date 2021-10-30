import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import Orders from '../views/Orders';
import Items from '../views/Items';
import Payments from '../views/PaymentTypes';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (attributes) => (user
    ? (<Component {...attributes} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: attributes.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any
};
function Routes({
  user,
  orders,
  payments
}) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={() => <Home user={user} />} />
        <PrivateRoute
        user={user}
        path='/orders'
        component={() => <Orders
          user={user}
          orders={orders}
        />}
        />
        <PrivateRoute
        user={user}
        path='/items'
        component={() => <Items />}
        />
        <PrivateRoute
        user={user}
        path='/payments'
        component={() => <Payments />}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
  orders: PropTypes.array.isRequired,
  payments: PropTypes.array.isRequired,
};

export default Routes;
