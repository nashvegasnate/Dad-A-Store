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

    [HttpPost]
    public Order CreateNewOrder(List<NewOrder> orderCart, Guid userID, Guid paymentID)
    {
     return _repo.CreateOrder(orderCart, userID, paymentID);
    }

  }
}
