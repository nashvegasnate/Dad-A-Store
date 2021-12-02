import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  FormGroup,
  Label
} from 'reactstrap';
import PropTypes from 'prop-types';
import { addDepartment, updateDepartment } from '../helpers/data/departmentsData';

export default function AddDepartmentForm({
  formTitle,
  setDepartments,
  departmentName,
  departmentDescription,
  setShowButton,
}) {
  const [department, setDepartment] = useState({
    departmentName: departmentName || '',
    departmentDescription: departmentDescription || '',
  });

  const handleInputChange = (e) => {
    setDepartment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (department.departmentID) {
      updateDepartment(department).then(setDepartments);
    } else {
      addDepartment(department).then(setDepartments);
      setShowButton(false);
    }

    setDepartment({
      departmentName: '',
      departmentDescription: '',
    });
  };

  return (
    <div className="department-form-container">
      <Form id="add-department-form" autoComplete="off"
      onSubmit={handleSubmit}
      >
        <h4 className="mt-4 text-center mb-2">{formTitle}</h4>
        <FormGroup>
          <Label>DEPARTMENT NAME</Label>
          <Input
            name="departmentName"
            id="departmentName"
            type="text"
            placeholder="Department Name"
            value={department.departmentName}
            onChange={handleInputChange}
            className="mt-2"
            />
        </FormGroup>
        <br></br>
        <Label>DEPARTMENT DESCRIPTION</Label>
        <FormGroup>
          <Input
            name="departmentDescription"
            id="departmentDescription"
            type="text"
            placeholder="Department Description"
            value={department.departmentDescription}
            onChange={handleInputChange}
            className="mt-2"
          />
        </FormGroup>
        <br></br>
        <Button
          color="danger"
          type="submit"
          onClick={handleSubmit}
          className="mt-2 ml-1"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

AddDepartmentForm.propTypes = {
  formTitle: PropTypes.string,
  setDepartments: PropTypes.func.isRequired,
  setShowButton: PropTypes.func,
  // user: PropTypes.any,
  departmentName: PropTypes.string,
  departmentDescription: PropTypes.string
};
