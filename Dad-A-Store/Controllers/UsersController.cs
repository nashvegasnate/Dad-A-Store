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
  [Route("api/Users")]
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
    }



     
  }
 }
