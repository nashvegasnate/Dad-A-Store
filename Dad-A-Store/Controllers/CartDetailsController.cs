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
  [Route("api/cartdetails")]
  [ApiController]
  public class CartDetailsController : ControllerBase
  {

    CartDetailRepository _repo;
    public CartDetailsController(CartDetailRepository repo)
    {
      _repo = repo;
    }

    [HttpGet]
    public List<CartDetail> GetAllCartDetails()
    {
      return _repo.GetAll();
    }

    [HttpGet("/getByCartID/{cartID}")]
    public List<CartDetail> GetByCartDetails(Guid cartID)
    {
      return _repo.GetByCartID(cartID);
    }
  }
}
