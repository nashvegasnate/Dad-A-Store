import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import { signInUser, signOutUser } from '../helpers/auth';

const NavBar = ({ user, registeredUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const authenticated = () => (
    <>
      <NavItem>
        <Link className="nav-link" to="/orders">Orders</Link>
      </NavItem>

      <NavItem>
        <Link className="nav-link" to="/items">Items</Link>
      </NavItem>

      <NavItem>
        <Link className="nav-link" to="/itemsForms">Items-Form</Link>
      </NavItem>

      <NavItem>
        <Link className="nav-link" to="/categories">Categories</Link>
      </NavItem>

      <NavItem>
        <Link className="nav-link" to="/departments">Departments</Link>
      </NavItem>

      <NavItem>
      <Link className="nav-link" to="/paymenttypes">Payments</Link>
      </NavItem>

      <NavItem>
        <Link className="nav-link" to="/cart">My Cart</Link>
      </NavItem>
    </>
  );

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Dad-A-Store</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
        <NavItem>
          <Link className="nav-link" to="/">Home</Link>
        </NavItem>
        { (user && registeredUser) && authenticated() }
        {
            user !== null
            && <NavItem>
              {
                user
                  ? <Button color='danger' onClick={signOutUser}> Sign Out </Button>
                  : <Button color='info' onClick={signInUser}> Sign In </Button>
              }
            </NavItem>
          }
        </Nav>
      <NavItem>
        <Link className="nav-link profile" to="/profile">Profile</Link>
      </NavItem>
        </Collapse>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any,
  registeredUser: PropTypes.bool
};

export default NavBar;
