import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import Orders from '../views/Orders';
import ItemsView from '../views/ItemsView';

const PrivateRoute = ({
  component: Component,
  user,
  registeredUser,
  ...rest
}) => {
  const routeChecker = (attributes) => ((user && registeredUser)
    ? (<Component {...attributes} user={user} registeredUser={registeredUser} />)
    : (<Redirect to={{ pathname: '/', state: { from: attributes.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any,
  registeredUser: PropTypes.bool
};
function Routes({
  user,
  orders,
  items,
  registeredUser
}) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={() => <Home
        user={user}
        registeredUser={registeredUser} />} />
        <PrivateRoute
        user={user}
        registeredUser={registeredUser}
        path='/orders'
        component={() => <Orders
          user={user}
          orders={orders}
        />}
        />
        <PrivateRoute
        user={user}
        registeredUser={registeredUser}
        path='/items'
        component={() => <ItemsView
          user={user}
          items={items}
          registeredUser={registeredUser}
        />}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
  orders: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  registeredUser: PropTypes.bool.isRequired
};

export default Routes;
