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
  [Route("api/orders")]
  [ApiController]
  public class OrdersController : ControllerBase
  {
    OrderRepository _repo;

    public OrdersController(OrderRepository repo)
    {
      _repo = repo;
    }

    [HttpGet]
    public List<Order> GetAllOrders()
    {
      return _repo.GetAll();
    }


    //[HttpPost]
    //public IActionResult AddCategory(Category newCategory)
    //{
    //  if (string.IsNullOrEmpty(newCategory.CategoryName) ||
    //      string.IsNullOrEmpty(newCategory.CategoryDescription) ||
    //      newCategory.DepartmentID.Equals(string.Empty))
    //  {
    //    return BadRequest("Sorry the Category: Name, Description, and Department ID are required.");
    //  }
    //  _repo.Add(newCategory);

    //  return Created($"api/categories/{newCategory.CategoryID}", newCategory);
    //}




  }
}
