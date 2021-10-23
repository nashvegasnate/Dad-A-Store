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
  [Route("api/users")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    UserRepository _repo;

    public UsersController(UserRepository repo)
    {
      _repo = repo;
    }

    [HttpGet]
    public List<User> GetAllUSERS()
    {
      return _repo.GetAllUsers();
    }

    // GetByUserID
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

    [HttpGet("GetUserByPAYMENTID/{paymentID}")]
    public List<User> GetUserByPAYMENTID(string paymentID)
    {
      return _repo.GetUserByPaymentID(paymentID);
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
      _repo.RemoveUser(ID);

      return Ok();
    }

    [HttpPut("{ID}")]
    public IActionResult UpdateUser(Guid ID, User user)
    {
      var userToUpdate = _repo.GetUserByID(ID);

      if (userToUpdate == null)
      {
        return NotFound($"Could not find bird with the ID {ID} for updating.");

      }
      var updateUser = _repo.UpdateUser(ID, user);
      return Ok(updateUser);
    }

     
  }
 }
