import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  CardText, CardBody, CardTitle, Button
} from 'reactstrap';
import styled from 'styled-components';
import { getDepartmentByDepartmentID } from '../helpers/data/departmentsData';
import { deleteCategory } from '../helpers/data/categoriesData';
import CategoryForm from '../forms/CategoryForm';

const CatCard = styled.div`
  display: flex;
  flex-flow: row-wrap;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-self: auto;
  flex-basis: 20em;
  margin: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: lightGrey;
  box-shadow: 10px;
  border: 5px double #2F8F20;
`;

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
            <CatCard className='category-cards'>
          <CardBody>
              <CardTitle tag="h3">Category: {categoryName}</CardTitle>
              {/* <CardText>Category ID: {categoryID}</CardText> */}
              <CardTitle>Description: {categoryDescription}</CardTitle>
              { department && <CardText>Department: {department[0].departmentName}</CardText> }
              <Button className="btn-md mr-2 ml-2 mt-2" color="danger" onClick={() => handleClick('delete')}>Delete</Button>
              <Button className="btn-md mr-2 ml-2 mt-2" color="info" onClick={() => handleClick('edit')}>Edit</Button>
        {editing
          && <CategoryForm
            formTitle='Edit Category'
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
        </CatCard>
      </div>
  );
}

CategoryCard.propTypes = {
  user: PropTypes.any.isRequired,
  categoryID: PropTypes.any.isRequired,
  categoryName: PropTypes.any.isRequired,
  categoryDescription: PropTypes.any.isRequired,
  departmentID: PropTypes.any,
  departmentName: PropTypes.any,
  setCategories: PropTypes.func
};

export default CategoryCard;
