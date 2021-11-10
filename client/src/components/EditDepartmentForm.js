import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { updateDepartment, addDepartment } from '../helpers/data/departmentsData';

export default function EditDepartmentForm({
  formTitle,
  setDepartments,
  departmentName,
  departmentDescription,
  departmentID
}) {
  const [department, setDepartment] = useState({
    departmentName: departmentName || '',
    departmentDescription: departmentDescription || '',
    departmentID: departmentID || null,
  });

  const history = useHistory();

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
      console.warn(department);
    } else {
      addDepartment(department).then((response) => {
        setDepartments(response);
        history.push('/departments');
      });

      setDepartment({
        departmentName: '',
        departmentDescription: '',
        departmentID: null,
      });
    }
  };

  return (
    <div className="edit-department-form">
      <Form id="EditDepartmentForm"
      autoComplete="off"
      onSubmit={handleSubmit}
      >
        <h2>{formTitle}</h2>
        <FormGroup>
          <Label for="departmentName">DEPARTMENT NAME</Label>
          <Input
            name="departmentName"
            id="departmentName"
            value={department.departmentName}
            type="text"
            placeholder="ENTER DEPARTMENT NAME"
            onChange={handleInputChange}
            />
        </FormGroup>
        <FormGroup>
          <Label for="departmentDescription">DEPARTMENT DESCRIPTION</Label>
          <Input
            name="departmentDescription"
            id="departmentDescription"
            value={department.departmentDescription}
            type="text"
            placeholder="ENTER DEPARTMENT DESCRIPTION"
            onChange={handleInputChange}
            />
        </FormGroup>

        <Button type="submit">SUBMIT</Button>
      </Form>
    </div>
  );
}

EditDepartmentForm.propTypes = {
  formTitle: PropTypes.string,
  setDepartments: PropTypes.func.isRequired,
  setShowButton: PropTypes.func,
  user: PropTypes.any,
  departmentName: PropTypes.string,
  departmentDescription: PropTypes.string,
  departmentID: PropTypes.string
};
