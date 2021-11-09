import React from 'react';
import PropTypes from 'prop-types';
import CategoryCard from '../components/CategoryCard';

function Categories({ user, categories }) {
  return (
        <div>
          <h3>Categories fro {user.userName}</h3>
          {
        categories.map((categoryInfo) => (
          <CategoryCard
          key={categoryInfo.categoryID}
          categoryID={categoryInfo.categoryID}
          categoryName={categoryInfo.categoryName}
          categoryDescription={categoryInfo.categoryDescription}
          departmentID={categoryInfo.departmentID}
          user={user}
          />
        ))
      }
        </div>
  );
}

Categories.propTypes = {
  user: PropTypes.any,
  categories: PropTypes.array.isRequired
};

export default Categories;
