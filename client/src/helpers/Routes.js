import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import ItemsView from '../views/ItemsView';
import ItemsFormView from '../views/ItemsFormsView';
import Categories from '../views/Categories';
import DepartmentsView from '../views/DepartmentsView';
import Cart from '../views/Cart';
import Payments from '../views/PaymentTypes';
import SingleItemView from '../views/SingleItemView';
import Checkout from '../views/Checkout';
import MyOrders from '../views/MyOrders';
import SingleOrder from '../views/SingleOrder';
import SingleCompleteOrder from '../views/SingleCompleteOrder';
import ProfileView from '../views/ProfileView';
import ShopView from '../views/ShopView';

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
  items,
  setItems,
  categories,
  setCategories,
  departments,
  setDepartments,
  payments,
  setPayments,
  registeredUser,
  userFromDB,
  setUserFromDB
}) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={() => <Home
          user={user}
          registeredUser={registeredUser}
          userFromDB={userFromDB}
        />} />
        <PrivateRoute
          user={user}
          registeredUser={registeredUser}
          userFromDB={userFromDB}
          path='/items'
          component={() => <ItemsView
            user={user}
            items={items}
            setItems={setItems}
            userFromDB={userFromDB}
          />}
        />
        <PrivateRoute
          user={user}
          registeredUser={registeredUser}
          path='/itemsForms'
          component={() => <ItemsFormView
            user={user}
            setItems={setItems}
            userFromDB={userFromDB}
          />}
        />
        <PrivateRoute
          user={user}
          registeredUser={registeredUser}
          path='/shop'
          component={() => <ShopView
            user={user}
            items={items}
            setItems={setItems}
            userFromDB={userFromDB}
          />}
        />
        <PrivateRoute
          user={user}
          registeredUser={registeredUser}
          path='/paymenttypes'
          component={() => <Payments
            user={user}
            userFromDB={userFromDB}
            payments={payments}
            setPayments={setPayments}
          />}
        />
        <PrivateRoute
          user={user}
          registeredUser={registeredUser}
          userFromDB={userFromDB}
          path='/categories'
          component={() => <Categories
            user={user}
            categories={categories}
            setCategories={setCategories}
          />}
        />
        <PrivateRoute
          user={user}
          registeredUser={registeredUser}
          userFromDB={userFromDB}
          path='/departments'
          component={() => <DepartmentsView
            user={user}
            departments={departments}
            setDepartments={setDepartments}
          />}
        />
        <PrivateRoute
          user={user}
          registeredUser={registeredUser}
          path='/cart'
          component={() => <Cart
            userFromDB={userFromDB}
          />}
        />
        <PrivateRoute
          user={user}
          registeredUser={registeredUser}
          path='/itemsSingleView/:itemParam'
          component={() => <SingleItemView
            user={user}
            items={items}
            setItems={setItems}
            userFromDB={userFromDB}
          />}
        />
        <PrivateRoute
          user={user}
          registeredUser={registeredUser}
          path='/checkout'
          component={() => <Checkout
            userFromDB={userFromDB}
          />}
        />
        <PrivateRoute
          user={user}
          registeredUser={registeredUser}
          path='/myorders'
          component={() => <MyOrders
            userFromDB={userFromDB}
          />}
        />
        <PrivateRoute
          user={user}
          registeredUser={registeredUser}
          path='/singleOrder/:orderID'
          component={() => <SingleOrder
            userFromDB={userFromDB}
          />}
        />
        <PrivateRoute
          user={user}
          registeredUser={registeredUser}
          path='/singleCompleteOrder/:completeOrderID'
          component={() => <SingleCompleteOrder
            userFromDB={userFromDB}
          />}
        />
        <PrivateRoute
          user={user}
          registeredUser={registeredUser}
          path='/profile'
          component={() => <ProfileView
            user={user}
            setUserFromDB={setUserFromDB}
            userFromDB={userFromDB}
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
  setItems: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired,
  departments: PropTypes.array.isRequired,
  setDepartments: PropTypes.func.isRequired,
  payments: PropTypes.array.isRequired,
  setPayments: PropTypes.func.isRequired,
  registeredUser: PropTypes.bool.isRequired,
  userFromDB: PropTypes.any,
  setUserFromDB: PropTypes.any.isRequired
};

export default Routes;
