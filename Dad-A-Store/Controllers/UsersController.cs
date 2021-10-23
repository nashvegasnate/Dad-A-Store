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

    [HttpGet("CGetUserFirstFromList/{userFirst}")]
    public IEnumerable<User> CGetUserFirstFromList(string userFirst)
    {
      return _repo.GetUserByNameFromList(userFirst);
    }

    [HttpGet("CGetUserByNameFromDB/{userFirst}")]
    public User CGetUserByNameFromDB(string userFirst)
    {
      return _repo.GetUserByNameFromDB(userFirst);
    }

    // GetByUserID
    //[HttpGet("{ID}")]
    //public IActionResult GetUserByID(Guid ID)
    //{
    //  var user = _repo.GetUserByID(ID);

    //  if (user == null)
    //  {
    //    return NotFound($"No user with the ID of {ID} was found");
    //  }
    //  return Ok(user);
    //}

    [HttpGet("GetUserByPAYMENTID/{paymentID}")]
    public List<User> GetUserByPAYMENTID(string paymentID)
    {
      return _repo.GetUserByPaymentID(paymentID);
    }

    [HttpPost]
    public IActionResult AddUser(User newUser)
    {
      if (string.IsNullOrEmpty(newUser.UserFirst) ||
          string.IsNullOrEmpty(newUser.UserLast) ||
          string.IsNullOrEmpty(newUser.UserAddress1) ||
          string.IsNullOrEmpty(newUser.UserAddress2) ||
          string.IsNullOrEmpty(newUser.UserCity) ||
          string.IsNullOrEmpty(newUser.UserState) ||
          newUser.UserZipCode.Equals(0) ||
          newUser.PaymentID.Equals(string.Empty))
      {
        return BadRequest("User information fields and Payment ID are required");
      }
      _repo.Add(newUser);

      return Created($"/api/users/{newUser.UserID}", newUser);
    }

    [HttpDelete("{ID}")]
    public IActionResult DeleteUser(Guid ID)
    {
      _repo.RemoveUser(ID);

      return Ok();
    }

    [HttpPut("{ID}")]
    public IActionResult UpdateUser(Guid ID, User user)
    {
      var userToUpdate = _repo.GetUserByIDFromDB(ID);

      if (userToUpdate == null)
      {
        return NotFound($"Could not find user with that ID of {ID} for updating.");
      }

      var updateUser = _repo.UpdateUser(ID, user);
      return Ok(updateUser);
    }
     
  }
 }
