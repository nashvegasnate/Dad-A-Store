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
  [Route("api/USERS")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    UserRepository _repo;


    public UsersController(UserRepository repo)
    {
      _repo = repo;
    }

    [HttpGet]
    public IActionResult GetAllUsers()
    {
      return Ok(_repo.GetAllUsers());
    }

    [HttpGet("{ID}")]
    public IActionResult GetUserByID(Guid ID)
    {
      var user = _repo.GetUserByID(ID);

      if (user == null)
      {
        return NotFound($"No user with the ID of {ID} was found");
      }

      return Ok(user);
    }

    //[HttpPost]
    //public IActionResult AddUser(User newUser)
    //{
    //  if (string.IsNullOrEmpty(newUser.UserFirst) ||
    //      string.IsNullOrEmpty(newUser.UserLast) ||
    //      string.IsNullOrEmpty(newUser.UserAddress1) ||
    //      string.IsNullOrEmpty(newUser.UserAddress2) ||
    //      string.IsNullOrEmpty(newUser.UserCity) ||
    //      string.IsNullOrEmpty(newUser.UserState) ||
    //      newUser.UserZipCode.Equals(0) ||
    //      newUser.PaymentID.Equals(string.Empty))
    //  {
    //    return BadRequest("User information fields are required");
    //  }

    //    _repo.Add(newUser);

    //    return Created($"/api/USERS/{newUser.ID}", newUser);
    //  }

    [HttpDelete("{ID}")]
    public IActionResult DeleteUser(Guid ID)
    {
      _repo.Remove(ID);

      return Ok();
    }


     
  }
 }
