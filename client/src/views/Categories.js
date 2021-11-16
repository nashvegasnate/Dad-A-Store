import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
// import { getCategoryByCategoryID } from '../helpers/data/categoriesData';
import CategoryCard from '../components/CategoryCard';
import CategoryForm from '../forms/CategoryForm';

export default function Categories({
  user, categories, setCategories
}) {
  const [showAddCategory, setAddCategory] = useState(false);

  const handleClick = () => {
    setAddCategory((prevState) => !prevState);
  };

  return (
    <div className="categoriesView">
    <div className="card-container">
    <br />

        <div>
        {!showAddCategory
          ? <Button className="addCategoryBtn" onClick={handleClick}>Add Category</Button>
          : <div>
            <Button className="closeForm" onClick={handleClick}>Close Form</Button>
            <CategoryForm
            setAddCategory={setAddCategory}
              setCategories={setCategories}
              user={user}
            />
        </div>
    }
    </div>
          {/* <h3>Categories for {user.userName}</h3> */}
          {
        categories.map((categoryInfo) => (
          <CategoryCard
          key={categoryInfo.categoryID + categoryInfo.departmentID}
          categoryID={categoryInfo.categoryID}
          categoryName={categoryInfo.categoryName}
          categoryDescription={categoryInfo.categoryDescription}
          departmentID={categoryInfo.departmentID}
          user={user}
          setCategories={setCategories}
          />
        ))
      }
    </div>
    </div>
  );
}

Categories.propTypes = {
  user: PropTypes.any,
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.any
};
