import React from 'react';
import {
  Card, CardText, CardBody, CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';

function CategoryCard({
  categoryID,
  categoryName,
  categoryDescription,
  departmentID,
  user
}) {
  return (
        <div>
            <Card className='department-cards'>
          <CardBody>
              <CardTitle tag="h3">CategoryName: {categoryName}</CardTitle>
              <CardText>Category ID: {categoryID}</CardText>
              <CardText>Category Description: {categoryDescription}</CardText>
              <CardText>Department ID: {departmentID}</CardText>
              <CardText>User: {user.uid}</CardText>
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
