import React from 'react';
import PropTypes from 'prop-types';
import DepartmentCard from '../components/DepartmentCard';
// import Routes from '../helpers/Routes';

function Departments({ user, departments }) {
  return (
    <div>
      <h3> Departments for {user.userName} </h3>
      {
        departments.map((departmentInfo) => (
          <DepartmentCard
          key={departmentInfo.departmentID}
          departmentID={departmentInfo.departmentID}
          departmentName={departmentInfo.departmentName}
          departmentDescription={departmentInfo.departmentDescription}
          user={user}
          />
        ))
      }
    </div>
  );
}

Departments.propTypes = {
  user: PropTypes.any,
  departments: PropTypes.array.isRequired
};

export default Departments;
