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
  [Route("api/carts")]
  [ApiController]
  public class CartsController : ControllerBase
  {
    CartRepository _repo;

    public CartsController(CartRepository repo)
    {
      _repo = repo;
    }

    [HttpGet]
    public List<Cart> GetAllCarts()
    {
      return _repo.GetAll();
    }

    [HttpGet("openCarts")]
    public List<Cart> GetOpenCarts()
    {
      return _repo.GetOpenCarts();
    }

    [HttpGet("/userCart/{userID}")]
    public Cart GetUserOpenCart(Guid userID)
    {
      return _repo.UserOpenCart(userID);
    }

    [HttpPost("/newCart/{userID}")]
    public Cart newCart(Guid userID)
    {
      return _repo.CreateNewCart(userID);
    }

    [HttpPut("/addItemToCart/{userID}")]
    public Cart addItem(Guid userID, NewOrder cartItem)
    {
      return _repo.AddToCart(userID, cartItem);
    }

    [HttpPut("/removeItemFromCart/{userID}")]
    public Cart removeItem(Guid userID, Guid itemID)
    {
      return _repo.RemoveItem(userID, itemID);
    }


  }
}
