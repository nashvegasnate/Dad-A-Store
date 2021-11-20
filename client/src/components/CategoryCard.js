import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardText, CardBody, CardTitle, Button
} from 'reactstrap';
import { getDepartmentByDepartmentID } from '../helpers/data/departmentsData';
import { deleteCategory } from '../helpers/data/categoriesData';
import CategoryForm from '../forms/CategoryForm';

function CategoryCard({
  user,
  categoryID,
  categoryName,
  categoryDescription,
  departmentID,
  departmentName,
  setCategories
}) {
  const [department, setDepartment] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getDepartmentByDepartmentID(departmentID).then((departmentObject) => setDepartment(departmentObject));
  }, []);

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteCategory(categoryID)
          .then(setCategories);
        break;
      case 'edit':
      //  setEditing((prevState) => !prevState);
        setEditing(!editing);
        break;
      default:
        console.warn('nothing selected');
    }
  };

  return (
        <div>
            <Card className='category-cards'>
          <CardBody>
              <CardTitle tag="h3">Category Name: {categoryName}</CardTitle>
              {/* <CardText>Category ID: {categoryID}</CardText> */}
              <CardTitle>Description: {categoryDescription}</CardTitle>
              { department && <CardText>Department: {department[0].departmentName}</CardText> }
              {/* <CardText>Department ID: {departmentID}</CardText> */}
              {/* <CardText>User: {user.uid}</CardText> */}
              <Button className="deleteBtn" onClick={() => handleClick('delete')}>Delete</Button>
              <Button className="editBtn" onClick={() => handleClick('edit')}>Edit</Button>
        {editing
          && <CategoryForm
            formTitle='Edit Payment Type'
            user={user}
            categoryID={categoryID}
            categoryName={categoryName}
            categoryDescription={categoryDescription}
            departmentID={departmentID}
            departmentName={departmentName}
            setCategories={setCategories}
          />
        }
        <br/>
          </CardBody>
        </Card>
      </div>
  );
}

CategoryCard.propTypes = {
  user: PropTypes.any.isRequired,
  categoryID: PropTypes.any.isRequired,
  categoryName: PropTypes.any.isRequired,
  categoryDescription: PropTypes.any.isRequired,
  departmentID: PropTypes.string.isRequired,
  departmentName: PropTypes.string.isRequired,
  setCategories: PropTypes.func
};

export default CategoryCard;
