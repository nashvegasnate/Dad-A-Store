import React from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';

function DepartmentCard({
  departmentID,
  departmentName,
  departmentDescription,
  user
}) {
  return (
  <div>
      <Card className='department-cards'>
          <CardBody>
              <CardTitle tag="h3">Department: {departmentName}</CardTitle>
              <CardText>Department Description: {departmentDescription}</CardText>
              <CardText>Department ID: {departmentID}</CardText>
              <CardText>User: {user.uid}</CardText>
          </CardBody>
      </Card>
  </div>
  );
}

DepartmentCard.propTypes = {
  departmentID: PropTypes.any.isRequired,
  departmentName: PropTypes.any.isRequired,
  departmentDescription: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired
};

export default DepartmentCard;
