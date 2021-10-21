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
    public IActionResult GetAllUsers()
    {
      return Ok(_repo.GetAllUsers());
    }
  }
 }
