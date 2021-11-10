import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import DepartmentCard from '../components/DepartmentCard';
import AddDepartmentForm from '../components/AddDepartmentForm';
import { getDepartments } from '../helpers/data/departmentsData';
// import Routes from '../helpers/Routes';

const DepartmentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  padding: 10px;
  margin: 10px;
  z-index: -1;
  `;

function Departments({ user }) {
  const [departments, setDepartments] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const handleClick = () => {
    setShowButton((prevState) => !prevState);
  };

  useEffect(() => {
    getDepartments(user.uid).then(setDepartments);
  }, []);

  return (
    <div className="departments-page">
      <section className="header mt-2">
      { !showButton
        ? <Button className="m-2 btn-lg" color="primary" onClick={handleClick}>Add Department</Button>
        : <div>
          <Button className="m-2 btn-lg" color="danger" onClick={handleClick}>Close</Button>
          <AddDepartmentForm className="justify-content-center mt-3" departments={departments} setDepartments={setDepartments} setShowButton={setShowButton} user={user} />
          </div>
}</section>
      <h3> Departments for {user.userName} </h3>
      <DepartmentContainer className="departments-container align-content-center" id="departments-container">
      {
        departments.map((departmentInfo) => (
          <DepartmentCard
          key={departmentInfo.departmentID}
          departmentID={departmentInfo.departmentID}
          departmentName={departmentInfo.departmentName}
          departmentDescription={departmentInfo.departmentDescription}
          user={user}
          setDepartments={setDepartments}
          />
        ))
      }
      </DepartmentContainer>
    </div>
  );
}

Departments.propTypes = {
  user: PropTypes.any,
  departments: PropTypes.array.isRequired,
  setDepartments: PropTypes.func.isRequired

};

export default Departments;
