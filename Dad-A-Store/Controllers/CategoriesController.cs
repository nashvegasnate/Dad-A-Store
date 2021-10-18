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

  [Route("api/categories")]
  [ApiController]
  public class CategoriesController : ControllerBase
  {
    CategoryRepository _repo;

    public CategoriesController(CategoryRepository repo)
    {
      _repo = repo;
    }

    [HttpGet]
    public List<Category> CGetAllCategories()
    {
      return _repo.GetAllCategories();
    }

    [HttpGet("CGetCategoryByNameFromList/{categoryName}")]
    public IEnumerable<Category> CGetCategoryByNameFromList(string categoryName)
    {
      return _repo.GetCategoryByNameFromList(categoryName);
    }

    [HttpGet("CGetCategoryByNameFromDB/{categoryName}")]
    public Category CGetCategoryByNameFromDB(string categoryName)
    {
      return _repo.GetCategoryByNameFromDB(categoryName);
    }

    [HttpGet("CGetCategoriesByNameDepartmentID/{departmentID}")]
    public List<Category> CGetCategoriesByNameDepartmentID(string departmentID)
    {
      return _repo.GetCategoriesByNameDepartmentID(departmentID);
    }

    [HttpPost]
    public IActionResult AddCategory(Category newCategory)
    {
      if (string.IsNullOrEmpty(newCategory.CategoryName) ||
          string.IsNullOrEmpty(newCategory.CategoryDescription) ||
          newCategory.DepartmentID.Equals(string.Empty))
      {
        return BadRequest("Sorry the Category: Name, Description, and Department ID are required.");
      }
      _repo.Add(newCategory);

      return Created($"api/categories/{newCategory.CategoryID}", newCategory);
    }

    [HttpDelete("{ID}")]
    public IActionResult DeleteCategory(Guid ID)
    {
      _repo.RemoveCategory(ID);
      return Ok();
    }

    [HttpPut("{ID}")]
    public IActionResult UpdateCategory(Guid ID, Category category)
    {
      var categoryToUpdate = _repo.GetCategoryByIDFromDB(ID);

      if(categoryToUpdate == null)
      {
        return NotFound($"Could not find the Category with the ID: {ID} for updating.");
      }

      var updatedCategory = _repo.UpdateCategory(ID, category);

      return Ok(updatedCategory);
    }

  }
}
