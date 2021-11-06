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
    CartRepository _repoForCart;

    public OrdersController(OrderRepository repo, CartRepository repoCart)
    {
      _repo = repo;
      _repoForCart = repoCart;
    }

    [HttpGet]
    public List<Order> GetAllOrders()
    {
      return _repo.GetAll();
    }

    [HttpGet("{orderID}")]
    public IActionResult GetOrderByOrderID(Guid orderID)
    {
      var order = _repo.GetByOrderID(orderID);

      if (order == null)
      {
        return NotFound($"No order with the OrderID {orderID} was found.");
      }

      return Ok(order);
    }

    [HttpGet("user/{userID}")]
    public List<Order> GetOrderByUserID(Guid userID)
    {
      return _repo.GetByUserID(userID);

    }

    [HttpPost("create/{userID}")]
    public Order AddOrder(Guid userID, List<NewOrder> listOfItems)
    {
      return _repo.CreateOrder(userID, listOfItems);
    }

    [HttpPost("createFromCart/{userID}")]
    public Order AddOrderFromCart(Guid userID)
    {
      var completedOrder = _repo.CreateOrderFromCart(userID);
      _repoForCart.CreateNewCart(userID);
      return completedOrder;
    }

    [HttpPut("update/{orderID}")]
    public Order UpdateOrder(Guid orderID, List<NewOrder> updatedList)
    {
      return _repo.Update(orderID, updatedList);
    }

    [HttpDelete("remove/{orderID}")]
    public void DeleteOrder(Guid orderID)
    {
      _repo.Remove(orderID);
    }

  }
}
