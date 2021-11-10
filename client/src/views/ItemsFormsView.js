import React from 'react';
import PropTypes from 'prop-types';
import ItemsForm from '../components/ItemsForm';
// import Routes from '../helpers/Routes';

function Items({ user, setItems }) {
  return (
    <div>
      <ItemsForm
      user={user}
      setItems={setItems}
      />
    </div>
  );
}

Items.propTypes = {
  user: PropTypes.any,
  setItems: PropTypes.func.isRequired
};

export default Items;
