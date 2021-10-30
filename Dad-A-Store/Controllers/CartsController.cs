using Dad_A_Store.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dad_A_Store.Controllers
{
  [Route("api/carts")]
  [ApiController]
  public class CartsController : ControllerBase
  {
    CartRepository _repo;

    public CartsController(CartRepository repo)
    {
      _repo = repo;
    }
  }
}
