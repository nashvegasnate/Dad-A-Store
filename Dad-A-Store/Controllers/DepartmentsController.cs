using Dad_A_Store.DataAccess;
using Dad_A_Store.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dad_A_Store.Controllers
{
  [Route("api/departments")]
  [ApiController]
  public class DepartmentsController : ControllerBase
  {
    DepartmentRepository _repo;

    public DepartmentsController(DepartmentRepository repo)
    {
      _repo = repo;
    }

    [HttpGet]
    public List<Department> GetAllDepartments()
    {
      return _repo.GetAllDepartments();
    }

    [HttpGet("GetDepartmentByNameFromList/{departmentName}")]
    public IEnumerable<Department> GetDepartmentByNameFromList(string departmentName)
    {
      return _repo.GetDepartmentByNameFromList(departmentName);
    }

    [HttpGet("GetDepartmentByNameFromDB/{departmentName}")]
    public Department GetDepartmentByNameFromDB(string departmentName)
    {
      return _repo.GetDepartmentByNameFromDB(departmentName);
    }

    [HttpGet("GetDepartmentByDepartmentID/{departmentID}")]
    public List<Department> GetDepartmentByDepartmentID(string departmentID)
    {
      return _repo.GetDepartmentByDepartmentID(departmentID);
    }

    [HttpPost]
    public IActionResult AddDepartment(Department newDepartment)
    {
      if (string.IsNullOrEmpty(newDepartment.DepartmentName) ||
          string.IsNullOrEmpty(newDepartment.DepartmentDescription) ||
          newDepartment.DepartmentID.Equals(string.Empty))
      {
        return BadRequest("Sorry, the Department: Name, Description, and Department ID are required.");
      }

      _repo.Add(newDepartment);
      return Created($"api/departments/{newDepartment.DepartmentID}", newDepartment);
    }

    [HttpDelete("{ID}")]
    public IActionResult DeleteDepartment(Guid ID)
    {
      _repo.RemoveDepartment(ID);
      return Ok();
    }

    [HttpPut("{ID}")]
    public IActionResult UpdateDepartment(Guid ID, Department department)
    {
      var departmentToUpdate = _repo.GetDepartmentByIDFromDB(ID);

      if (departmentToUpdate == null)
      {
        return NotFound($"Could not find the Department with the ID: {ID} for updating.");
      }

      var updatedDepartment = _repo.UpdateDepartment(ID, department);

      return Ok(updatedDepartment);
    }
  }
}
