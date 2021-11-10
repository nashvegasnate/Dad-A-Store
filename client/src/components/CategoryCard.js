import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardText, CardBody, CardTitle
} from 'reactstrap';
import {deleteCategory } from '../helpers/data/categoriesData';
import CategoryForm from './CategoryForm';

function CategoryCard({
  user,
  categoryID,
  categoryName,
  categoryDescription,
  departmentID,
  setCategories
}) {
  const [editing, setEditing] = useState(false);

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
              <CardTitle tag="h3">CategoryName: {categoryName}</CardTitle>
              <CardText>Category ID: {categoryID}</CardText>
              <CardText>Category Description: {categoryDescription}</CardText>
              <CardText>Department ID: {departmentID}</CardText>
              <CardText>User: {user.uid}</CardText>
              <Button className="deleteBtn" onClick={() => handleClick('delete')}>Delete</Button>
        <Button className="editBtn" onClick={() => handleClick('edit')}>Edit</Button>
        {editing
          && <PaymentForm
            formTitle='Edit Payment Type'
            user={user}
            paymentID={paymentID}
            paymentType={paymentType}
            setPayments={setPayments}
          />
        }
          </CardBody>
      </Card>
        </div>
  );
}

CategoryCard.propTypes = {
  categoryID: PropTypes.any.isRequired,
  categoryName: PropTypes.any.isRequired,
  categoryDescription: PropTypes.any.isRequired,
  departmentID: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired
};

export default CategoryCard;
